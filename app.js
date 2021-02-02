
const express = require('express'); 
const bodyParser = require('body-parser');

const app = express(); 
const port = 8080; 
require('dotenv').config(); //Bắt buộc sau express()

const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');



app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))





//ROUTING
app.use('/test', testRoutes);
app.use('/auth', authRoutes)


let server = app.listen(port, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Server is running", host, port)
});


