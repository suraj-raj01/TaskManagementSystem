const express = require('express');
const route = express.Router();

const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task');

route.post('/create', createTask);
route.get('/get', getTasks);
route.put('/update/:id', updateTask);
route.delete('/delete/:id', deleteTask);

module.exports = route;