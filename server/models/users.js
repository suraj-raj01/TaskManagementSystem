const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate: link all tasks created by this user
userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'userId'
});

const User = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = User;
