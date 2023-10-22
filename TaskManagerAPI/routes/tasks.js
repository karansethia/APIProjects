const express = require('express');
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask
} = require('../controllers/tasks')

const router = express.Router();

router.get('/',getAllTasks);
router.post('/',createTask);
router.get('/:id',getSingleTask);
router.patch('/:id',updateSingleTask);
router.delete('/:id',deleteSingleTask);

module.exports = router