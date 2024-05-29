const express = require('express');

const authRouter = express.Router();

const {loginAuth, signup} = require('../controller/auth');


authRouter.route('/').post(loginAuth);

authRouter.route('/signup').post(signup);

module.exports = authRouter;