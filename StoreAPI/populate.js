require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const data = require('./products.json');

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(data);
    console.log('succesfuly populated');
    process.exit(0)  //exiting the process at 0 means everythung went well
  } catch (error) {
    console.log(error);
    process.exit(1); // exiting the process at 1 means something went wrong
  }
}

start()