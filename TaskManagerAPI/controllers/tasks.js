const Task = require('../models/task');
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async(req,res) => {
  const tasks = await Task.find({})
    res.status(200).json({tasks})
})


const createTask = asyncWrapper(async (req,res) => {
  const task = await Task.create(req.body);
  res.status(201).json({task})
})


const getSingleTask = asyncWrapper(async(req,res,next) => {
  const singleTask = await Task.findById(req.params.id);
    if(!singleTask){
      // return res.status(404).json({message: "Task not found"})
      const error = new Error("Not Found");
      error.status = 404;
      return next(error)
    }
    res.status(200).json({singleTask});
})


const updateSingleTask = asyncWrapper(async(req,res) => {
  const singleTask = await Task
    .findByIdAndUpdate(req.params.id,req.body,{
      new: true,  //will return the updated data instead of the old one
      runValidators: true, //run validators defined in mongoose model
      // overwrite: true  //* if you want to replace instead of partial update
    });
  res.status(200).json({singleTask})
})


const deleteSingleTask = asyncWrapper(async(req,res) => {
  const singleTask = await Task.findByIdAndRemove(req.params.id);
    if(!singleTask){
      return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json({message: "Deleted"});
})

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask
}