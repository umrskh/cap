// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging

// Connect to MongoDB
//mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Package.json dependencies:
// npm install express cors dotenv mongoose morgan
