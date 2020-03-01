const admin = require("firebase-admin");
// const firebase = admin.initializeApp(functions.config().default);
var serviceAccount = require("../../.config/debate-circle-adc5e-firebase-adminsdk-cil0t-eeb800cf4e.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://debate-circle-adc5e.firebaseio.com"
});

exports.debate_database = firebase.database().ref("Debates");
exports.users_database = firebase.database().ref("Users");