const Firebase = require("../Services/firebase");
const HttpError = require('http-errors');
const DebateResource = require("../Resources/DebateResource");

module.exports = (key) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.doc(key).get()
        .then(snap => { resolve(DebateResource(snap.id, snap.data())); return; })
        .catch(_ => { reject(HttpError[502]('Firebase failure')); return; })
});