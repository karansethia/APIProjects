const Task = require('../models/task')

const getAllTasks = async(req,res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
const createTask = async (req,res) => {
  try {   
    const task = await Task.create(req.body);
    res.status(201).json({task})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
const getSingleTask = async(req,res) => {
  try {
    const singleTask = await Task.findById(req.params.id);
    res.status(200).json({singleTask});
    if(!singleTask){
      return res.status(404).json({message: "Task not found"})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
const updateSingleTask = async(req,res) => {
  try{
   const singleTask = await Task.findByIdAndUpdate(req.params.id,req.body);
  res.status(200).json({singleTask})
  }catch(error){
    res.status(500).json({message: "Could Not update"})
  }
  
}
const deleteSingleTask = async(req,res) => {
  try {
    const singleTask = await Task.findByIdAndRemove(req.params.id);
    if(!singleTask){
      return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json({message: "Deleted"});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask
}