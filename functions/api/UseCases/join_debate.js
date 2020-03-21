const Firebase = require("../Services/firebase");
const HttpError = require('http-errors');
const DebateResource = require("../Resources/DebateResource");

module.exports = (debateId, user) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.doc(debateId).get()
        .then(snap => { 

            if (snap.data() === undefined) {
                reject(HttpError[404](`Not Found`)); return;
            }
            if (snap.data().publishedBy.userId === user["user_id"]) {
                reject(HttpError[400](`Can't join your own debate`)); return;
            }
            if (snap.data().acceptedBy !== undefined) {
                reject(HttpError[409]('Someone already accepted')); return;
            }
            const acceptedUser = { 
                acceptedBy: {
                    userId: user["user_id"],
                    username: user["name"],
                    image: user["picture"]
                }
            }
            // eslint-disable-next-line consistent-return
            return db.doc(debateId).update(acceptedUser);
         })
        .then((_) => db.doc(debateId).get())
        .then(ref => resolve(DebateResource(ref.id, ref.data())))
        .catch(e => reject(HttpError[500](e)))
});