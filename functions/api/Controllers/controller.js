
exports.create_debate = ((req, res) => {
    console.log("@DEBUG: Create");
    let body = JSON.parse(JSON.stringify(req.body))
    const create_usecase = require('../UseCases/create_debate');
    create_usecase(body, req.user)
        .then(obj => res.status(201).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
});

exports.get_all_debates = ((req, res) => {
    console.log("@DEBUG: Get All");
    let category = req.query.category;
    const get_all_usecase = require('../UseCases/get_all_debates');
    get_all_usecase(category)
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
})

exports.get_debate = ((req, res) => {
    console.log("@DEBUG: Get by Id");
    let key = req.params.id;
    const get_details_usecase = require('../UseCases/get_debate_details');
    get_details_usecase(key)
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(500).send(error));
});

exports.delete_debate = ((req, res) => {
    console.log("@DEBUG: Delete by Id");
    let id = req.params.id;
    const delete_usecase = require('../UseCases/delete_debate');
    delete_usecase(id, req.user)
        .then(_ => res.sendStatus(200))
        .catch(error => {
            console.log(error);
            res.status(error.statusCode).send(error.message)
        });
});

exports.get_joinable_debates = ((req, res) => {
    console.log("@DEBUG: Joinable");
    const joinable_usecase = require('../UseCases/get_joinable_debates');
    
    joinable_usecase()
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
});

exports.get_judicable_debates = ((req, res) => {
    console.log("@DEBUG: Judicable");
    const judicable_usecase = require('../UseCases/get_judicable_debates');

    judicable_usecase()
        .then(obj => res.status(200).send(obj))
        .catch(error => res.status(error.statusCode).send(error.message));
});