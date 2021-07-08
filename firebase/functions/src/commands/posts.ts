import {Post} from '../models/posts';
import {Comment} from '../models/comments';
import {User} from '../models/users';
import {firestore} from 'firebase-admin/lib/firestore';

const getPosts = async (admin: any, response: any, userId: string) => {
  try {
    const user = await admin.firestore().collection('users').doc(userId).get();

    if (!user.exists) {
      throw new Error(`No user found with id : ${userId}`);
    }

    const followingsIds = user.data().followings;
    followingsIds.push(userId);

    if (followingsIds.length <= 0) {
      return response.json({
        status: 'success',
        data: [],
      });
    }

    const querySnapshot = await admin.firestore()
      .collection('posts')
      .where('userId', 'in', followingsIds)
      .orderBy('publishDate', 'desc')
      .get();

    const posts: Post[] = [];
    const postsOwnersPromises: Promise<User>[] = [];
    const commentsUsersPromises: Promise<User>[] = [];

    querySnapshot.forEach((doc: any) => {
      const itemData = doc.data();
      const publishDate = itemData.publishDate.seconds;
      postsOwnersPromises.push(itemData.user.get().then((user: any) => user.data()));

      if (itemData.comments) {
        commentsUsersPromises.push(
          itemData.comments.map((comment: any) => (
            comment.user.get().then((user: any) => user.data())))
        );
      }

      posts.push({
        ...itemData as Post,
        id: doc.id,
        publishDate,
      });
    });

    const postUsers = await Promise.all(postsOwnersPromises);
    posts.forEach((post, index) => {
      post.user = postUsers[index];
    });

    const commentsUsers: any = await Promise.all(
      commentsUsersPromises.map(async (postComments: any): Promise<User[]> => (
        await Promise.all(postComments)
      ))
    );

    //  Format comment data.
    posts.forEach((post, postIndex) => {
      if ('comments' in post) {
        post.comments.forEach((comment: Comment, commentIndex): void => {
          posts[postIndex].comments[commentIndex].user = commentsUsers[postIndex][commentIndex];
          const publishDate = posts[postIndex].comments[commentIndex].publishDate as firestore.Timestamp;
          posts[postIndex].comments[commentIndex].publishDate = publishDate.seconds;
        } );
      }
    });

    return response.json({
      status: 'success',
      data: posts,
    });
  } catch (e) {
    response.json({
      status: 'error',
      data: [],
      message: e,
    });
  }
};

module.exports = async (admin: any, response: Response, userId: string) => getPosts(admin, response, userId);
