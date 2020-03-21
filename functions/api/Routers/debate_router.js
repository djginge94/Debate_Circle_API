var router = require('express').Router()
const controller = require('../Controllers/debate_controller')

router.post('/', controller.create_debate)
router.get('/', controller.get_all_debates)

router.get('/joinable', controller.get_joinable_debates)
router.get('/judicable', controller.get_judicable_debates)

router.get('/:id', controller.get_debate)
router.delete('/:id', controller.delete_debate)
router.post('/:id', controller.post_message)

router.patch('/:id/join', controller.join_debate)
router.patch('/:id/accept', controller.accept_challenge)
router.patch('/:id/reject', controller.reject_challenge)

router.post('/:id/vote/:userId', controller.vote)

module.exports = router