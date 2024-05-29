const express = require('express');

const router = require('./routes/tasks');

const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(express.static('./public'));


app.use('/api/v1/tasks', router);

app.use('/', authRouter);

module.exports = app;
