console.log('Task Manager App')

const express = require('express');

const app = express();

//routes
app.get('/hello',(req,res)=>{
  res.send('task manager app')
})

app.get('/api/v1/tasks')
app.post('/api/v1/tasks')
app.get('/api/v1/tasks/:id')
app.patch('/api/v1/tasks/:id')
app.delete('/api/v1/tasks/:id')

const port = 3300;
app.listen(port, console.log(`port running on ${port}`))