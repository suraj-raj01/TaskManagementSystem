const express = require('express');
const route = express.Router();

const { createTask, getTasks, updateTask, deleteTask, getTaskById, assignTask } = require('../controllers/task');

route.post('/create', createTask);
route.get('/get', getTasks);
route.get('/get/:id', getTaskById);
route.post('/assigntask',assignTask)
route.put('/update/:id', updateTask);
route.delete('/delete/:id', deleteTask);

module.exports = route;