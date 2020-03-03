const admin = require("firebase-admin");

module.exports = (req, res, next) => {
    const idToken = req.header('Authentocation');
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            return next();
        })
        .catch(error => { res.status(401).send(error); return res.end();})
}