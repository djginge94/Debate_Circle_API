const controller = require('../Controllers/controller');
const auth = require('../../api/Services/auth');

module.exports = (app) => {
    app.use(auth);

    app.route('/test')
        .get((req, res) => {
            res.send("Hello, World!")
        });

    app.route('/debate')
        .post(controller.create_debate)

    app.route('/debate/:id')
        .get(controller.get_debate)
        .delete(controller.delete_debate)
}