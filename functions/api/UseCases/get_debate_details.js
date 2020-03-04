const Firebase = require("../Services/firebase");
const DebateResource = require("../Resources/DebateResource");

module.exports = (key) => new Promise((resolve, reject) => {
    DebateResource(key)
        .then(obj => {
            resolve(obj);
            return;
        })
        .catch(_ => {
            reject(HttpError[502]('Firebase failure'));
            return;
        });
});