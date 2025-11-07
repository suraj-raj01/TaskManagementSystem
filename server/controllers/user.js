const UserModel = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) =>{
    try {
        const { name, email, password, userType } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, userType });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}

const loginUser = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successfully completed ✅', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in ❌', error });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};


const getUserWithTasks = async (req, res) => {
    try {
        const { id } = req.params;
        // 🔥 Find user and populate their tasks
        const user = await UserModel.findById(id).populate('tasks');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};


module.exports = { registerUser, loginUser, getUsers, getUserWithTasks, deleteUser };