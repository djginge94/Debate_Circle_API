const admin = require("firebase-admin");
const functions = require('firebase-functions');
admin.initializeApp(functions.config().default);

// var serviceAccount = require("../../.config/debate-circle-adc5e-firebase-adminsdk-cil0t-eeb800cf4e.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://debate-circle-adc5e.firebaseio.com"
// });

exports.admin = admin;
exports.debate_database = admin.database().ref("Debates");
exports.users_database = admin.database().ref("Users");