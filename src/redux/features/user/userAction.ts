/* eslint-disable no-useless-catch */
import { showMessage } from 'react-native-flash-message';
import * as firebaseLib from 'firebase/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../../firebase';
import 'firebase/firestore';
import store from '../../store';
import { getCurrentUser, setIsLoading, setUserToken } from './userSlice';
import User, { Track } from '../../../models/UserModel';

export const getUserById = async (id: string) => {
  try {
    const user = await firebase.db?.collection('users').doc(id).get();
    return user?.data();
  } catch (error) {
    console.log('getUserById error', error);
    throw (error);
  }
};

export const updateUserById = async (id: string, body: any) => {
  try {
    await firebase.db?.collection('users').doc(id).update(body);
    const updatedUser = await getUserById(id);
    if (!updatedUser) throw ('No user found');
    updatedUser.id = id;
    return updatedUser;
  } catch (error) {
    throw (error);
  }
};

export const removeTrack = async (track: Track) => {
  try {
    const { currentUser } = store.getState().user;
    if (!currentUser) throw ('');
    const top = currentUser?.top?.filter((t) => t.id !== track.id);
    const updatedUser = await updateUserById(currentUser.id, { top });
    showMessage({
      message: `${track.title} supprimé`,
      type: 'success',
    });
    store.dispatch(getCurrentUser(updatedUser));
  } catch (error) {
    showMessage({
      message: 'Une erreur s\'est produite',
      type: 'danger',
    });
  }
};

export const orderTrackList = async (tracks: Array<Track>) => {
  const { currentUser } = store.getState().user;
  try {
    if (!currentUser) throw ('');
    const updatedUser = await updateUserById(currentUser.id, { top: tracks });
    showMessage({
      message: 'Playlist mis à jour',
      type: 'success',
    });
    store.dispatch(getCurrentUser(updatedUser));
  } catch (error) {
    showMessage({
      message: 'Une erreur s\'est produite',
      type: 'danger',
    });
    if (currentUser) {
      const user = getUserById(currentUser.id);
      store.dispatch(getCurrentUser(user));
    }
  }
};

export const addTrackToTop = async (track: Track) => {
  try {
    store.dispatch(setIsLoading(true));
    const { currentUser } = store.getState().user;
    if (currentUser) {
      const top = currentUser.top ? [...currentUser.top] : [];
      const topAlreadyExist = top.find((t: Track) => t.id === track.id);
      if (topAlreadyExist) {
        throw ({ message: 'Cette musique est déjà présente dans votre playlist' });
      }
      top.push({
        album: {
          cover: track.album.cover,
          id: track.album.id,
          title: track.album.id,
        },
        artist: {
          id: track.artist.id,
          name: track.artist.name,
          picture: track.artist.picture,
        },
        id: track.id,
        preview: track.preview,
        title: track.title,
      });

      const updatedUser = await updateUserById(currentUser.id, { top });
      showMessage({
        message: 'Titre ajouté',
        type: 'success',
      });
      store.dispatch(setIsLoading(false));
      store.dispatch(getCurrentUser(updatedUser));
    }
  } catch (error) {
    store.dispatch(setIsLoading(false));
    showMessage({
      message: error && error.message ? error.message : 'Une erreur s\'est produite',
      type: 'danger',
    });
  }
};

type ToggleFollowParams = {
  follow: boolean,
  target: User,
  currentUser: User
}

export const toggleFollow = createAsyncThunk(
  'user/toggleFollow',
  async (params: ToggleFollowParams): Promise<User> => {
    const { follow, target, currentUser } = params
    const userUpdated = { ...currentUser }
    await firebase
      .db?.collection('users')
      .doc(userUpdated.uid)
      .update({
        followings: follow
          ? firebaseLib.firestore.FieldValue.arrayUnion(target.uid)
          : firebaseLib.firestore.FieldValue.arrayRemove(target.uid),
      })
    await firebase
      .db?.collection('users')
      .doc(target.uid)
      .update({
        followers: follow
          ? firebaseLib.firestore.FieldValue.arrayUnion(userUpdated.uid)
          : firebaseLib.firestore.FieldValue.arrayRemove(userUpdated.uid),
      })

    if (follow) {
      userUpdated.followings = [...userUpdated.followings, target.uid]
    } else {
      userUpdated.followings = userUpdated.followings.filter(f => f !== target.uid)
    }

    return userUpdated
  },
)

export const sendUserToken = async (token: string) => {
  const { currentUser } = store.getState().user
  if (currentUser) {
    await firebase.db?.collection('users').doc(currentUser.uid).update({ token })
    store.dispatch(setUserToken(token))
  }
}
