const firebase = require("../Services/firebase");
const DebateResource = require("../Resources/DebateResource");

exports.create_debate = ((req, res) => {
    let body = JSON.parse(JSON.stringify(req.body))
    firebase.debate_database.push(body)
        .then(ref => DebateResource.create(ref.key))
        .then(obj => res.status(201).send(obj))
        .catch(error => res.status(500).send(error));
});

exports.get_debate = ((req, res) => {
    let id = req.params.id;
    DebateResource.create(id)
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(500).send(error));
});

exports.delete_debate = ((req, res) => {
    let id = req.params.id;
    firebase.debate_database.child(id).remove()
        .then(_ => res.status(200).send())
        .catch(error => res.status(500).send(error));
});