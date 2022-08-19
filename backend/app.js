const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

require('dotenv').config();

// middleware
app.use(express.static('./frontend'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler)

// Server and Connection to DB - Setup
const port = process.env.PORT || 3000;

const start = async() => {
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  }
  catch(error){
    console.log(error);
  }
}

start();