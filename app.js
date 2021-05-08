
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
const port = 8080;
require('dotenv').config(); //Bắt buộc sau express()

const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

// app.use(cors())

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())



//ROUTING
app.use('/test', testRoutes);
app.use('/auth', authRoutes)
app.use('/user', userRoutes)


let server = app.listen(port, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Server is running", host, port)
});


