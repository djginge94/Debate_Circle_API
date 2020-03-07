const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors')();
const bodyParser = require('body-parser');
const auth = require('./api/Services/auth');
const DebateRouter = require('./api/Routers/debate_router');
const UserRouter = require('./api/Routers/user_router');

app.use(bodyParser.json());
app.use(cors);
app.use(auth);

app.use('/debate', DebateRouter);
app.use('/user', UserRouter);

app.use("*", (req,res) => { res.status(404).send('Not Found'); });

exports.api = functions.https.onRequest(app);