const firebase = require("firebase/app");
require("firebase/database");

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

// const write = key => {
//   firebase
//     .database()
//     .ref("/count")
//     .transaction(function(post) {
//       if (post) {
//         if (!post[key]) {
//           post[key] = 1;
//         } else {
//           post[key]++;
//         }
//       } else {
//         post = {
//           [key]: 1
//         };
//       }
//       return post;
//     });
// };

const push = value => {
  firebase
    .database()
    .ref("/database")
    .push(value);
};

module.exports = {
  push
};
