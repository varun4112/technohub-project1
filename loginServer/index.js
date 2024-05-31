const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./Router/router");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// MongoDB connection string from environment variables
const connectionString = process.env.DATABASE;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Project is running on port ${PORT}`);
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB Connected Successfully to Login SERVER");
  })
  .catch((err) => {
    console.log(`MongoDB connection failed! Error: ${err}`);
  });

app.get("/", (req, res) => {
  res.send("<h1>Login Server Running ^_^ </h1>");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
