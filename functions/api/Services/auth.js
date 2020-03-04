const admin = require("firebase-admin");

module.exports = (req, res, next) => {
    const idToken = req.header('Authorization');
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return next();
        })
        .catch(error => { res.status(401).send(error); return res.end();})
}