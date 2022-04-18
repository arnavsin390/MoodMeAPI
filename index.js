const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')


//Turning Express into constant "app"
const app = express();
app.use(bodyParser.json());


//Importing .env and storing connection string in 'mongoString'
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

//Import and use routes file
const routes = require('./routes/routes');
app.use('/api', routes)

//Connecting to database server with Mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

//Checking if database connects
database.on('error', (error) => {
    console.log(error)
})
database.once('connected',() => {
    console.log('Database Connected');
})


//Listening on Port 3000 and accept data in JSON format
app.use(express.json());
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

//Middleware for Swagger GUI
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))
require('./routes/routes.js')
console.log("Swagger GUI Middleware");








