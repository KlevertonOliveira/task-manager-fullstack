const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async(req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({success: true, data: tasks})
})

const createTask = asyncWrapper(async(req, res) => {
  await Task.create(req.body);
  res.status(201).json({success: true, msg: 'Task created successfully.'})
})

const getTask = asyncWrapper(async(req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findById(taskID);

  if(!task){
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }
  
  return res.status(200).json({ data: task }) 
})

const updateTask = asyncWrapper(async(req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true
  });

  if(!task){
    return next(createCustomError(`No task found with id: ${taskID}`, 404)); 
  }

  return res.status(200).json({ data: task })
})

const deleteTask = asyncWrapper(async(req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete(taskID);

  if(!task){
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }
  
  return res.status(200).json({ success: true, msg: 'Task deleted successfully.'})
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}