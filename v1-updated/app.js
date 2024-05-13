const express = require('express');

const app = express();

const taskRouter = require('./routes/tasks');

app.use('/api/v1/tasks', taskRouter);


module.exports = app;