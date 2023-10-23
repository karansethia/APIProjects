console.log('Task Manager App');
const express = require('express');
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors({
  origin: '*'
}))
//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks',taskRoutes)

// app.get('/api/v1/tasks')        - get all tasks
// app.post('/api/v1/tasks')       - create new task
// app.get('/api/v1/tasks/:id')    - get a single task
// app.patch('/api/v1/tasks/:id')  - update a task
// app.delete('/api/v1/tasks/:id') - delete a task
app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 3300;
const startServer = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`port running on ${port}`))
  } catch (error) {
    console.log(error);
  }
}

startServer()