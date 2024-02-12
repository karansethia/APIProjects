const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./db/connect');
const noteRoutes = require('./routes/note-routes');
const authRoutes = require('./routes/auth')
const refreshRoutes = require('./routes/refresh');
const verifyJwt = require('./middleware/verify-jwt');
const app = express();
require('dotenv').config();


app.use(cors({
  origin: '*' //todo replace with deployment link
}));

//* Parsing Json
app.use(express.json());

//* Parsing incoming cookies
app.use(cookieParser());

//todo routes
// -> api/v1/login 
// -> api/v1/register
// -> api/v1/refresh
// -> api/v1/notes 
// -> api/v1/email 
// -> api/v1/note/:noteId => get and post req for sending and updating or creating note

app.use('/api/v1',authRoutes)
app.use('/api/v1',refreshRoutes);
app.use(verifyJwt)  
app.use('/api/v1', noteRoutes);
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