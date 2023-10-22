const Task = require('../models/task')

const getAllTasks = (req,res) => {
  res.send('get all tasks')
}
const createTask = async (req,res) => {
  const task = await Task.create(req.body);
  res.status(201).json({task})
}
const getSingleTask = (req,res) => {
  res.send({id: req.params.id})
}
const updateSingleTask = (req,res) => {
  res.send({id: req.params.id})
}
const deleteSingleTask = (req,res) => {
  res.send({id: req.params.id})
}

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask
}