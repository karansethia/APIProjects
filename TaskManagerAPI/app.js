console.log('Task Manager App');
const express = require('express');
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors({
  origin: '*'
}))
//middleware
app.use(express.json())

//routes
app.get('/hello',(req,res)=>{
  res.send('task manager app')
})

app.use('/api/v1/tasks',taskRoutes)

// app.get('/api/v1/tasks')        - get all tasks
// app.post('/api/v1/tasks')       - create new task
// app.get('/api/v1/tasks/:id')    - get a single task
// app.patch('/api/v1/tasks/:id')  - update a task
// app.delete('/api/v1/tasks/:id') - delete a task

const port = 3300;
const startServer = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`port running on ${port}`))
  } catch (error) {
    console.log(error);
  }
}

startServer()