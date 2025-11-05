const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./lib/myDb');
const bodyparser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is up and running!✅');
});

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}✅`);
});