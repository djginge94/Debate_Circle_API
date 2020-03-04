const HttpError = require('http-errors');
const Categories = require('../Common/Categories');
const Moment = require('moment');
const Firebase = require("../Services/firebase");
const DebateResource = require("../Resources/DebateResource");

module.exports = (body, user) => new Promise((resolve, reject) => {
    let debate = body;
    if (debate.title === null) {
        reject(HttpError[400]('Please provide a Title for your debate'));
        return;
    }
    if (debate.categories === undefined) {
        debate.categories = [Categories.OTHER];
    }
    debate.createdDate = Moment().toISOString();
    debate.publishedBy = {};
    debate.publishedBy.userId = user["user_id"];
    debate.publishedBy.username = user["name"];
    debate.publishedBy.image = user["picture"];

    const db = Firebase.debate_database;
    db.push(debate)
        .then(ref => DebateResource(ref.key))
        .then(obj => {
            resolve(obj); return;
        })
        .catch(_ => {
            reject(HttpError[502]('Firebase failure'));
            return;
        })
});