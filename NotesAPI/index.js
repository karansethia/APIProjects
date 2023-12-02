const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors({
  origin: '*'
}));

app.use(express.json());

//todo routes
// -> api/v1/login 
// -> api/v1/register
// -> api/v1/refresh
// -> api/v1/notes 
// -> api/v1/email 

const PORT = processe.env.PORT || 3100

const startServer = (port) => {
  app.listen(port);
}

startServer(PORT)