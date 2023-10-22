const connectionStr = 'mongodb+srv://karansethia24:kayzar24@tasks.mqjpg7v.mongodb.net/Test?retryWrites=true&w=majority'

const mongoose = require('mongoose');


const connectDB = url => {
  return mongoose.connect(connectionStr)
}

module.exports = connectDB