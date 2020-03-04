const firebase = require("../Services/firebase");

module.exports = (key) => new Promise((resolve, reject) => {
    firebase.debate_database.child(key).once('value')
        .then((val) => {
            let obj = val.val()
            obj.id = key;
            resolve(obj);
            return
        })
        .catch(error => reject(error));
});