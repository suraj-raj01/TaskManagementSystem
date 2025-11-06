const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
}, { timestamps: true });
const Task = mongoose.models.task ||  mongoose.model('task', taskSchema);
module.exports = Task;
