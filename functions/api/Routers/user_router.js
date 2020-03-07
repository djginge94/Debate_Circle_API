const router = require('express').Router();
const controller = require('../Controllers/user_controller');

router.get("/me", (req, res) => {
    res.send({
        name: req.user.name,
        image: req.user.picture,
        email: req.user.email,
        uid: req.user.user_id
    })
});

module.exports = router