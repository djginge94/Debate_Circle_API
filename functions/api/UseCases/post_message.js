const Firebase = require("../Services/firebase");
const HttpError = require('http-errors');
const DebateResource = require("../Resources/DebateResource");
const Moment = require("moment");

module.exports = (debateId, user, body) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
          
    if (body.message === undefined) {
        reject(HttpError[400](`No message supplied`)); return;
    }
    
    db.doc(debateId).get()
        .then(snap => {

            if (snap.data() === undefined) { reject(HttpError[404](`Not Found`)); return; }
            
            const myDebate = snap.data().publishedBy.userId === user["user_id"];
            const joinedDebate = snap.data().acceptedBy.userId === user["user_id"];
            if (!myDebate && !joinedDebate) {
                reject(HttpError[403](`Can't post to a debate you're not apart of`)); return;
            }

            if (snap.data().expiryDate < Moment()) {
                reject(HttpError[400](`The debate has finished`)); return;
            }
            // eslint-disable-next-line consistent-return
            return db.doc(debateId).set(
                { messages: [{
                    message: body.message,
                    createdDate: Moment(),
                    userId: user["user_id"]
                }] },
                { merge: true }
            )
         })
        .then((_) => db.doc(debateId).get())
        .then(ref => resolve(DebateResource(ref.id, ref.data())))
        .catch(e => reject(HttpError[500](e)))
});