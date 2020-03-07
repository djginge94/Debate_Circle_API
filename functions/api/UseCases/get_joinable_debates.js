const HttpError = require('http-errors');
const Firebase = require("../Services/firebase");
const DebateResource = require("../Resources/DebateResource");

module.exports = () => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    
    db.where("expiryDate", "==", null).get().then(snap => {
        let models = [];
        snap.forEach(x => models.push(DebateResource(x.id, x.data())));
        return resolve(models);
    })
    .catch(e => {
        console.log(`@ERROR: ${e}`);
        return reject(HttpError[502]('Firebase failure'))});
});