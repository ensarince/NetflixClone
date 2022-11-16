import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTSvTp2XxhFckaSn8-Je72iZiufsvVV8k",
    authDomain: "netflix-clone-468f2.firebaseapp.com",
    projectId: "netflix-clone-468f2",
    storageBucket: "netflix-clone-468f2.appspot.com",
    messagingSenderId: "222805728826",
    appId: "1:222805728826:web:e7dfb5415a62ab829edf03",
    measurementId: "G-SNXFC02NK1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth();

  //we can make a lot of explicit exports
  export { auth, db }
