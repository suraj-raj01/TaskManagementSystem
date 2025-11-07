const express = require('express');
const route = express.Router();
const { registerUser, loginUser, getUsers, getUserWithTasks, deleteUser} = require('../controllers/user');

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/get', getUsers);
route.get('/:id', getUserWithTasks);
route.delete('/:id', deleteUser);

module.exports = route;