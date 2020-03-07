const HttpError = require('http-errors');
const Firebase = require("../Services/firebase");
const DebateResource = require("../Resources/DebateResource");
const Moment = require("moment");

module.exports = (categoryId) => new Promise((resolve, reject) => {
    if (categoryId === undefined) { 
        getAll().then(x => resolve(x))
                .catch(e => reject(e))
    } 
    else { 
        getAllForCategory(parseInt(categoryId)).then(x => resolve(x))
                                     .catch(e => reject(e))
    }
});

getAll = () => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.get().then(snap => {
        let models = [];
        snap.forEach(x => models.push(DebateResource(x.id, x.data())));
        const joinable  = models.filter(x => x.expiryDate === null);
        const judicable = models.filter(x => x.expiryDate !== null)
                                .filter(x => Moment(x.expiryDate) <= Moment())
        
        return resolve({ joinable: joinable, judicable: judicable });
    })
    .catch(_ => reject(HttpError[502]('Firebase failure')));
});

getAllForCategory = (categoryId) => new Promise((resolve, reject) => {
    const db = Firebase.debate_database;
    db.where('categories', 'array-contains', categoryId).get().then(snap => {
        let models = [];
        snap.forEach(x => models.push(DebateResource(x.id, x.data())));
        const joinable = models.filter(x => x.expiryDate === undefined);
        const judicable = models.filter(x => x.expiryDate !== undefined)
                                .filter(x => Moment(x.expiryDate) <= Moment())

        return resolve({ joinable: joinable, judicable: judicable });
    })
    .catch(e => reject(HttpError[502]('Firebase failure')));
});