const Schedule = require('node-schedule');
const Firebase = require("../Services/firebase");

// exports.scheduleDebateExpiry = (debateId, date) => {
//     const task = Schedule.scheduleJob('5 * * * * *', ((id) => {
//         const db = Firebase.debate_database;
//         db.doc(id).get()
//             .then(s => {
//                 const publishedById = s.data().publishedBy.userId;
//                 const acceptedById = s.data().acceptedBy.userId;

//                 db.doc(id).update({
//                     votes: [
//                         { userId: publishedById, count: 0 },
//                         { userId: acceptedById, count: 0 }
//                     ]
//                 })
//                 return
//             })
//             .catch(e => console.log(e))
//     }).bind(null, debateId));
// }