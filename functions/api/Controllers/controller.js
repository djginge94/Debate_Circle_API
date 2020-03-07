
exports.create_debate = ((req, res) => {
    let body = JSON.parse(JSON.stringify(req.body))
    const create_usecase = require('../UseCases/create_debate');
    create_usecase(body, req.user)
        .then(obj => res.status(201).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
});

exports.get_all_debates = ((req, res) => {
    let category = req.query.category;
    const get_all_usecase = require('../UseCases/get_all_debates');
    get_all_usecase(category)
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
})

exports.get_debate = ((req, res) => {
    let key = req.params.id;
    const get_details_usecase = require('../UseCases/get_debate_details');
    get_details_usecase(key)
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(500).send(error));
});

exports.delete_debate = ((req, res) => {
    let id = req.params.id;
    const delete_usecase = require('../UseCases/delete_debate');
    delete_usecase(id, req.user)
        .then(_ => res.sendStatus(200))
        .catch(error => {
            console.log(error);
            res.status(error.statusCode).send(error.message)
        });
});