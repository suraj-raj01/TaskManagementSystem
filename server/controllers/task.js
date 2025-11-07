const TaskModel = require('../models/task');

const createTask = async (req, res) => {
    try {
        const { title, description, userId, dueDate, status, priority } = req.body;
        const newTask = new TaskModel({ title, description, userId, dueDate, status, priority });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully ✅', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('userId');
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id).populate('userId');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'Task updated successfully ✅', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }   
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskById };