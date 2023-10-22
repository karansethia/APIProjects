const getAllTasks = (req,res) => {
  res.send('get all tasks')
}
const createTask = (req,res) => {
  res.json(req.body)
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