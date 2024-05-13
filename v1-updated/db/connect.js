const mongoose = require('mongoose');

require('dotenv').config({path: './.env'});



const connectDB = (url) => {
    return mongoose.connect(url);
}


module.exports = connectDB;