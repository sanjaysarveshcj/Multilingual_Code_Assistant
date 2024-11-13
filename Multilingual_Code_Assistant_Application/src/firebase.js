import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6PGz951YIA60cbxZk0xHatfuMSnl1lWs",
  authDomain: "multilingualcodeassistant.firebaseapp.com",
  projectId: "multilingualcodeassistant",
  storageBucket: "multilingualcodeassistant.appspot.com",
  messagingSenderId: "900216893361",
  appId: "1:900216893361:web:3bf492212643fb50c75790",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
