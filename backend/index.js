const server = require("express")();
const Twit = require("twit");
const socketIO = require("socket.io");
require("dotenv").config();
server.set("view engine", "pug");
const firebase = require("firebase-admin");
const moment = require("moment");
const { push } = require("./database/index");

var T = new Twit({
  consumer_key: "XfX4SQxhErAugHMueBKdEXW04",
  consumer_secret: "jGOUxYzp5zgOzKh7Yd93iiyqM506VEdv9XvxE6wJpqDPDX9oZG",
  access_token: "2717149177-O30Wh5X4xHdtNw9Ln6pVRw8lWkDtTqUN5yqz3rE",
  access_token_secret: "qtrI1RLXP79s46YYyVKaBbV9hTNbQ8RNSH3livn3G0UCL"
  // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  // strictSSL: true // optional - requires SSL certificates to be valid.
});

var firebaseConfig = {
  apiKey: "AIzaSyCE6-PAF2G9pCoapYm5ANPovtbiIjl2Mgo",
  authDomain: "swp-final-exam-49609.firebaseapp.com",
  databaseURL: "https://swp-final-exam-49609.firebaseio.com",
  projectId: "swp-final-exam-49609",
  storageBucket: "swp-final-exam-49609.appspot.com",
  messagingSenderId: "70623787007",
  appId: "1:70623787007:web:72446ab1245061cb"
};
firebase.initializeApp(firebaseConfig);

const port = process.env.PORT || "4000";

const app = server.listen(port, () => {
  console.log("Server is listening at " + port);
});

const io = socketIO.listen(app);
io.on("connection", client => {
  console.log("user connected");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// app.get('/', (req, res) => {
//     var params = {screen_name: 'nodejs'};
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error) {
//             res.send(tweets);
//         }
//     });
// })

server.get("/", (req, res) => {
  res.send("hello world");
});

let data = {
  time: moment()
    .startOf("minute")
    .toISOString(),
  count: 0
};

const stream = T.stream("statuses/filter", { track: "tradewar" });
stream.on("tweet", async tweet => {
  console.log(tweet);
  if (
    moment()
      .startOf("minute")
      .toISOString() !== data.time
  ) {
    console.log(data);
    push(data);
    io.sockets.emit("new-message", data);
    data.time = moment()
      .startOf("minute")
      .toISOString();
    data.count = 0;
  } else {
    data.count = data.count + 1;
  }
});
