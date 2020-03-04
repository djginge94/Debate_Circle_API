const HttpError = require('http-errors');
const Firebase = require("../Services/firebase");

module.exports = (key, user) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.child(key).once('value')
        .then(snap => {
            let debate = snap.val()
            if (user["user_id"] !== debate.publishedBy["userId"]) {
                reject(HttpError[403]("Can't delete objects you didn't create"));
                return;
            }
            return db.child(key).remove();
        })
        .then(_ => { resolve(); return })
        .catch(error => {
            reject(HttpError[502]('Firebase failure'));
            return;
        })
});