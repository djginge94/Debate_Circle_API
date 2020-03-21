const Firebase = require("../Services/firebase");
const HttpError = require("http-errors");
const DebateResource = require("../Resources/DebateResource");
const Moment = require("moment");

module.exports = (debateId, user) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.doc(debateId).get()
        .then(snap => {
            if (snap.data() === undefined) {
                reject(HttpError[404](`Not Found`)); return;
            }

            if (snap.data().publishedBy.userId !== user["user_id"]) {
                reject(HttpError[403](`This is not your debate`)); return;
            }
            if (snap.data().acceptedBy === undefined) {
                reject(HttpError[400](`There is no challenger`)); return;
            }
            let FieldValue = require('firebase-admin').firestore.FieldValue;
            // eslint-disable-next-line consistent-return
            return db.doc(debateId).update({
                acceptedBy: FieldValue.delete()
            });
        })
        .then(_ => db.doc(debateId).get())
        .then(ref => resolve(DebateResource(ref.id, ref.data())))
        .catch(e => reject(HttpError[500](e)))
});