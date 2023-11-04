console.log('Store API---------------------------------------');
const express = require('express');
const productRoutes = require('./routes/products');

const middlewareNotFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler');
const cors = require('cors');
const connectDB = require('./db/connect');
require('express-async-errors');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.get('/',(req,res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})
app.use('/api/v1',productRoutes)


app.use(middlewareNotFound);
app.use(errorHandler);

const port = process.env.PORT || 3000

const startServer = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port ,console.log(`App started at ${port}`))
  } catch (error) {
    console.log('could not start server',error);
  }
}

startServer()

