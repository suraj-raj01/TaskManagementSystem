const express = require('express');
const route = express.Router();
const { registerUser, loginUser, getUsers, getUserWithTasks} = require('../controllers/user');

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/get', getUsers);
route.get('/get/:id', getUserWithTasks);

module.exports = route;