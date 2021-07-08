import firebase from '../../../firebase'
import User from '../../../models/UserModel'
import store from '../../store'
import { getCurrentUser, updateUserPicture } from '../user/userSlice';
import { authenticate, logout as authLogout } from './authenticationSlice'

export const userAlreadyExists = async (email: string) => {
  const results = await firebase
    .db?.collection('users')
    .where('email', '==', email)
    .get();

  if (results?.size === 0) {
    return false;
  }

  return true;
};

const profilePictureBlob: any = (profilePicture: string) => new Promise((resolve, reject) => {
  // Took from https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    resolve(xhr.response);
  };
  xhr.onerror = (e) => {
    reject(new TypeError('Network request failed'));
  };
  xhr.responseType = 'blob';
  xhr.open('GET', profilePicture, true);
  xhr.send(null);
});

export const register = async (user: User) => {
  const userExists = await userAlreadyExists(user.email)

  if (userExists) {
    throw 'Un utilisateur avec cette adresse email existe déjà'
  }

  try {
    const authUser = await firebase
      .auth?.createUserWithEmailAndPassword(user.email, user.password)

    const uniqueStr = Math.random()
      .toString(36)
      .substring(7);
    const blob = await profilePictureBlob(user.profilePicture)
    const uploadPhotoTask = await firebase.storage?.ref(`profile-pictures/${uniqueStr}.png`)
      .put(blob)
    blob.close();

    const photoUrl = await uploadPhotoTask?.ref.getDownloadURL()

    await firebase
      .db?.doc(`users/${authUser?.user?.uid}`)
      .set({
        uid: authUser?.user?.uid,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        description: user.description,
        profilePicture: photoUrl,
        followings: [],
        followers: [],
      })

    return true
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const autoLogin = async (user: any) => {
  const userFromFb = await firebase
    .db?.collection('users')
    .where('email', '==', user.email)
    .get();

  if (userFromFb?.size === 1) {
    const userData = userFromFb.docs[0].data();
    userData.id = userFromFb?.docs[0].id;
    store.dispatch(authenticate(userData));
    store.dispatch(getCurrentUser(userData));
  }
};

export const login = (user: any) => new Promise((resolve, reject) => {
  try {
    firebase.auth?.signInWithEmailAndPassword(user.email, user.password)
      .then((loggedUser) => {
        if (loggedUser) {
          resolve(false)
          autoLogin(user)
        } else {
          reject('Mauvais email / mot de passe')
        }
      })
  } catch (e) {
    reject('Une erreur est intervenue. Veuillez réessayer');
  }
});

export const updateProfilePicture = (user: User, uri: string) => {
  try {
    const uniqueStr = Math.random()
      .toString(36)
      .substring(7);
    profilePictureBlob(uri)
      .then((blob: any) => {
        firebase.storage?.ref(`profile-pictures/${uniqueStr}.png`)
          .put(blob)
          .then((uploadPhotoTask) => {
            blob.close();
            uploadPhotoTask?.ref.getDownloadURL()
              .then((photoUrl) => {
                firebase
                  .db?.collection('users')
                  .doc(user.uid)
                  .update({
                    profilePicture: photoUrl,
                  })
                store.dispatch(updateUserPicture(photoUrl))
              })
          })
      })
  } catch (e) {
    console.error(e)
  }
}

export const logout = async () => {
  await firebase.auth?.signOut();
  store.dispatch(authLogout());
};
