import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { autoLogin } from '../redux/features/authentication/authenticationHelper';
import { logout } from '../redux/features/authentication/authenticationSlice';
import store from '../redux/store';
// TODO INIT WHEN OK import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDiNZhmfTzdSB_Y3bAySHuxJDM9cZ1C9ek',
  authDomain: 'calypso-ab5fc.firebaseapp.com',
  projectId: 'calypso-ab5fc',
  storageBucket: 'calypso-ab5fc.appspot.com',
  messagingSenderId: '31310576983',
  appId: '1:31310576983:web:ecfa83ba97473453935212',
  measurementId: 'G-M7273MZKN9',
};

class FirebaseCore {
  app: firebase.app.App | undefined;

  auth: firebase.auth.Auth | undefined;

  db: firebase.firestore.Firestore | undefined;

  storage: firebase.storage.Storage | undefined;

  constructor() {
    if (!firebase.apps.length) {
      this._initFirebase();
      this._addFirebaseListeners();
    }
  }

  _initFirebase() {
    firebase.initializeApp(firebaseConfig);
    this.app = firebase.app();
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  _addFirebaseListeners() {
    /** *************** */
    /** AUTH LISTENER */
    /** *************** */
    this.auth?.onAuthStateChanged(async user => {
      const { currentUser } = store.getState().authentication;
      if (user && !currentUser) {
        autoLogin(user);
      } else if (!user) {
        store.dispatch(logout());
      }
    });
  }
}

const firebaseCoreInstance = new FirebaseCore();
Object.freeze(firebaseCoreInstance);

export default firebaseCoreInstance;
