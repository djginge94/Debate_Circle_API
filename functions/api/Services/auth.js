const admin = require("firebase-admin");

module.exports = (req, res, next) => {
    console.log(req);
    
    const idToken = "Not a Token";
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            return next();
        })
        .catch(error => { res.status(401).send(error); return res.end();})
}