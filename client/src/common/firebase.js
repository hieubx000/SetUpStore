import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUJj6Kr2u-C_iLw2ndotDTbIAhfG-JmE0",
  authDomain: "ecommerce-62fba.firebaseapp.com",
  projectId: "ecommerce-62fba",
  storageBucket: "ecommerce-62fba.appspot.com",
  messagingSenderId: "1013537701634",
  appId: "1:1013537701634:web:ee9a6f146bf986a32f8c1b"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
