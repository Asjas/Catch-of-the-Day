import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCeN_IZGyiuAg6VN2Ncme3OUSWVVj70e2g",
  authDomain: "catch-of-the-day-c2556.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-c2556.firebaseio.com",
  projectId: "catch-of-the-day-c2556",
  storageBucket: "catch-of-the-day-c2556.appspot.com",
  messagingSenderId: "471446782920",
  appId: "1:471446782920:web:e75119b03f8051144436fd",
  measurementId: "G-KGWY995LS6",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
