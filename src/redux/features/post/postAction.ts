import { firestore } from 'firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../../models/PostModel';
import firebase from '../../../firebase';
import { uploadFile } from '../../../helpers/fileHelper';
import { CLOUD_FUNCTIONS_URI } from '../../../config';
import { AuthenticationInitialState } from '../authentication/authenticationSlice';
import { PostInitialState } from './postSlice';
import User from '../../../models/UserModel';
import { handleError } from '../../../helpers/genericHelper';

export const createPost = async (userId: string, content:string, image?: string, music?: any) => {
  try {
    let imageUrl;

    if (image) {
      imageUrl = await uploadFile(image, 'posts/')
    }

    const post: Post = {
      // @ts-ignore
      user: firebase.db?.doc(`users/${userId}`) as firestore.DocumentReference<firestore.DocumentData>,
      userId,
      publishDate: firestore.Timestamp.now(),
      content,
      image: imageUrl ?? '',
      comments: [],
      reactions: [],
      // music,
    }

    const response = await firebase
      .db?.collection('posts')
      .add(post);

    return response;
  } catch (e) {
    handleError(e);
  }
}

export const createPostComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, comment }: {postId: string, comment: string}, { getState }): Promise<Post[]> => {
    try {
      const { authentication } = getState() as { authentication: AuthenticationInitialState };
      const { postReducer } = getState() as { postReducer: PostInitialState };
      const postRef = firebase.db?.collection('posts').doc(postId);

      // Add comment to the post.
      await postRef!.update({
        comments: await firestore.FieldValue.arrayUnion({
          user: firebase.db?.doc(`users/${authentication.currentUser!.uid}`),
          publishDate: firestore.Timestamp.now(),
          content: comment,
        }),
      })

      // Update the local post comments.
      const updatedPosts = postReducer.posts.map((post) => ({ ...post }));
      const postIndex = updatedPosts.findIndex((post) => post.id === postId)

      updatedPosts[postIndex].comments = [
        ...updatedPosts[postIndex].comments,
        {
          user: authentication.currentUser as User,
          publishDate: firestore.Timestamp.now().seconds,
          content: comment,
        },
      ];

      return updatedPosts;
    } catch (e) {
      handleError(e);
    }

    return [];
  },
)

export const handlePostReaction = createAsyncThunk(
  'posts/handlePostReaction',
  async ({ postId, reaction }: {postId: string, reaction: string}, { getState }): Promise<Post[]> => {
    const { authentication } = getState() as { authentication: AuthenticationInitialState };
    const { postReducer } = getState() as { postReducer: PostInitialState };
    const { posts } = postReducer;
    const updatedPosts = postReducer.posts.map((post) => ({ ...post }));
    const userId = authentication.currentUser!.uid;

    try {
      const postRef = firebase.db?.collection('posts').doc(postId);

      const postIndex = postReducer.posts.findIndex((p) => p.id === postId);
      if (postIndex === undefined) throw new Error('Post non inexistant.');

      const existingUserReaction = posts[postIndex].reactions.findIndex((reaction) => (
        reaction.userId === userId));

      if (existingUserReaction !== -1) {
        await postRef!.update({
          reactions: firestore.FieldValue.arrayRemove(
            posts[postIndex].reactions[existingUserReaction],
          ),
        })

        updatedPosts[postIndex].reactions = updatedPosts[postIndex]
          .reactions
          .filter((reaction) => reaction.userId !== userId);
      }

      await postRef!.update({
        reactions: firestore.FieldValue.arrayUnion({ userId, reaction }),
      })

      updatedPosts[postIndex].reactions = [
        ...updatedPosts[postIndex].reactions,
        { userId, reaction },
      ]
    } catch (e) {
      handleError(e);
    }

    return updatedPosts;
  },
)

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (nothing, { getState }): Promise<Post[]> => {
    try {
      const { authentication } = getState() as { authentication: AuthenticationInitialState };
      const userId = authentication.currentUser!.uid;

      const request = await fetch(`${CLOUD_FUNCTIONS_URI}/getPosts?userId=${userId}`);
      const response = await request.json();

      if ('error' === response.status) {
        throw new Error(response.message)
      }

      return response.data;
    } catch (e) {
      handleError(e);
    }

    return [];
  },
)
