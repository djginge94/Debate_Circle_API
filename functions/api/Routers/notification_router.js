const router = require('express').Router();
const controller = require('../Controllers/notification_controller');

router.patch("/", controller.update_expired);

module.exports = router