const app = require('./app');

require('dotenv').config('./.env');

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});