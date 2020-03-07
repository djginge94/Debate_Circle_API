const controller = require('../Controllers/controller');
const auth = require('../../api/Services/auth');
const Firebase = require("../Services/firebase");

module.exports = (app) => {
    app.use(auth);

    app.route('/test')
        .get((req, res) => { });

    app.route('/debate')
        .post(controller.create_debate)
        .get(controller.get_all_debates)

    app.route('/debate/:id')
        .get(controller.get_debate)
        .delete(controller.delete_debate)
}