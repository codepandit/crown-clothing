import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA9Wxc-i1X1WZGwZXWIyDxQrXXrCUa_n48",
  authDomain: "crown-db-bda12.firebaseapp.com",
  databaseURL: "https://crown-db-bda12.firebaseio.com",
  projectId: "crown-db-bda12",
  storageBucket: "crown-db-bda12.appspot.com",
  messagingSenderId: "257411379198",
  appId: "1:257411379198:web:72d8702b7c2f77a4a65aaf",
  measurementId: "G-ELS9HHVPYC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log(`Error creating user ${error.message}`);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;