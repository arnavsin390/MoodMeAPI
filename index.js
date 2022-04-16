const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//Turning Express into constant "app"
const app = express();
app.use(bodyParser.json());

//Middleware for GET pagination
app.get("/", paginate(), async (req, res) => {
    res.json(res.paginate);
  });
app.use(paginate);

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

//Server-side Pagination Function
function paginate() {
    return async (req, res, next) => {
      
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const results = {};
  
      try {
        results.results = await User.find()
          .sort({ _id: 1 })          
          .skip(skipIndex)
          .limit(limit)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
    };
  }








