import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDgp0qt9slnQtO8PAXvuNgBTvIFXDGUtn0",
    authDomain: "react-app-course-afb45.firebaseapp.com",
    projectId: "react-app-course-afb45",
    storageBucket: "react-app-course-afb45.appspot.com",
    messagingSenderId: "805093564401",
    appId: "1:805093564401:web:e33f0fb764bcffe6dd2e50"
};

const firebaseConfigTesting = {
    apiKey: "AIzaSyCJKB402XPan5H_WwBwdnclRuBnNL2ntw0",
    authDomain: "react-course-app-test.firebaseapp.com",
    projectId: "react-course-app-test",
    storageBucket: "react-course-app-test.appspot.com",
    messagingSenderId: "1096328327968",
    appId: "1:1096328327968:web:781f829981741f3b061d45"
};

if (process.env.NODE_ENV === 'test') {
    // testing
    initializeApp(firebaseConfigTesting);
} else {
    // dev/prod
    // Initialize Firebase
    initializeApp(firebaseConfig);
}


const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}