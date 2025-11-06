const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1); // Optional: exit process if connection fails
});

module.exports = mongoose;
