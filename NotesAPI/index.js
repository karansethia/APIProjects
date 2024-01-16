const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./db/connect');
const noteRoutes = require('./routes/note-routes')
const app = express();
require('dotenv').config();


app.use(cors({
  origin: '*' //todo replace with deployment link
}));

app.use(express.json());

//todo routes
// -> api/v1/login 
// -> api/v1/register
// -> api/v1/refresh
// -> api/v1/notes 
// -> api/v1/email 
// -> api/v1/note/:noteId => get and post req for sending and updating or creating note


app.use('/api/v1', noteRoutes)
const PORT = process.env.PORT || 3100

const startServer = async() => {
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT);
  }catch(error){
    console.log("Could not connect");
  }
}

startServer();