const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./Router/router");
const nodemailer = require("nodemailer");
// const twilioRouter = require("./Router/twilio-sms");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

// MongoDB connection string from environment variables
const connectionString = process.env.DATABASE;
const PORT = process.env.PORT || 4000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB Connected Successfully to Login SERVER");
    // Start the server only after successful connection
    app.listen(PORT, () => {
      console.log(`Project is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed! Error: ${err}`);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("<h1>Login Server Running ^_^</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
