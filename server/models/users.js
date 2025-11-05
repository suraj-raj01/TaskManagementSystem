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
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 🔗 Virtual populate: Link all tasks created by this user
userSchema.virtual('tasks', {
    ref: 'task',            // The model to use
    localField: '_id',      // Field on User
    foreignField: 'userId'  // Field on Task
});

const User = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = User;
