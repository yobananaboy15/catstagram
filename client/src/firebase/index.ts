import firebase from 'firebase/app'
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvFOvEuKSNb4ASPHJ2AHGRc6vA2YzUsW8",
  authDomain: "nekostagram-a279a.firebaseapp.com",
  projectId: "nekostagram-a279a",
  storageBucket: "nekostagram-a279a.appspot.com",
  messagingSenderId: "1065128261991",
  appId: "1:1065128261991:web:c9449afc6aec8cca5357c2",
  measurementId: "G-2QVB7S91CS"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage, firebase as default}