// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { FacebookAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcsOQWeXtspQA4DdwtJyNAM-PxGgZ4v7w',
  authDomain: 'isentropic-sun-305023.firebaseapp.com',
  projectId: 'isentropic-sun-305023',
  storageBucket: 'isentropic-sun-305023.appspot.com',
  messagingSenderId: '856124894553',
  appId: '1:856124894553:web:2dba84d7e3165221c03048',
  measurementId: 'G-9BJG98QYCV'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      console.log('Google Sign In: ', res);
      // TODO: Store to context or redux
      return res.user;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const googleSignIn = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (err) {
    console.log(err);
  }
};

export const facebookSignIn = async () => {
  try {
    const res = await signInWithPopup(auth, providerFB);
    const credential = FacebookAuthProvider.credentialFromResult(res);
    const accessToken = credential.accessToken;

    return [accessToken, res];
  } catch (err) {
    console.log(err);
  }
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, providerFB)
    .then((res) => {
      console.log('Facebook Sign In: ', res);
      // TODO: Store to context or redux
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(res);
      const accessToken = credential.accessToken;

      return [accessToken, res];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default db;
