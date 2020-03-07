const HttpError = require('http-errors');
const Firebase = require("../Services/firebase");

module.exports = (key, user) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.doc(key).get()
        .then(snap => {
            if (user["user_id"] !== snap.data().publishedBy["userId"]) {
                reject(HttpError[403]("Can't delete objects you didn't create"));
                return;
            }
            return db.doc(key).delete();
        })
        .then(_ => {resolve(); return})
        .catch(_ => { reject(HttpError[502]('Firebase failure')); return; })
});