var router = require('express').Router();
const controller = require('../Controllers/debate_controller');

router.post('/', controller.create_debate)
router.get('/', controller.get_all_debates)

router.get('/joinable', controller.get_joinable_debates)
router.get('/judicable', controller.get_judicable_debates)

router.get('/:id', controller.get_debate)
router.delete('/:id', controller.delete_debate)

module.exports = router