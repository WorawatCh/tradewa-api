import firebase from "firebase/app";
import "firebase/database";

const apis = {
  apiKey: "AIzaSyC0F7iepEh0dgX5RDAEqmJVbuoCo5sQ36o",
  authDomain: "tradewar-api.firebaseapp.com",
  databaseURL: "https://tradewar-api.firebaseio.com",
  projectId: "tradewar-api",
  storageBucket: "tradewar-api.appspot.com",
  messagingSenderId: "579479621397",
  appId: "1:579479621397:web:438e7de14d1ae041"
};

firebase.initializeApp(apis);

export default firebase;
