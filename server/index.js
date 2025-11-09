const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./lib/myDb');
const bodyparser = require('body-parser');
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST"],
  },
});
const ChatMessage = require('./models/chatMessage');

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Server is up and running!✅');
});
// REST route to get messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 }).limit(100);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected ✅");

  socket.on("sendMessage", async (data) => {
    try {
      const { user, message } = data;
      const chatMessage = new ChatMessage({ user, message });
      await chatMessage.save();
      io.emit("message", chatMessage); // Broadcast to all clients
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}✅`);
});