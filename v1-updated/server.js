require('dotenv').config({path: './.env'});

const app = require('./app')

const connectDB = require('./db/connect');


const url = process.env.MONGO_CONNECTION_STRING.replace('<password>', process.env.MONGO_PASS);
const PORT = process.env.PORT || 5000;


const start = async()=>{
    try {
        const connect = await connectDB(url);
        if(connect){
            console.log('Db connected successfully');
        }
        //Starting server upon connection to database
        app.listen(PORT,()=>{
            console.log(`Server started on ${PORT}`);  
        })
    } catch(err){
        console.log(err);
    }
}

start();
