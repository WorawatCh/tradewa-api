const firebase = require("firebase/app");
require("firebase/database");

const apis = {
  apiKey: "AIzaSyCE6-PAF2G9pCoapYm5ANPovtbiIjl2Mgo",
  authDomain: "swp-final-exam-49609.firebaseapp.com",
  databaseURL: "https://swp-final-exam-49609.firebaseio.com",
  projectId: "swp-final-exam-49609",
  storageBucket: "swp-final-exam-49609.appspot.com",
  messagingSenderId: "70623787007",
  appId: "1:70623787007:web:72446ab1245061cb"
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
