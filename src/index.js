const express = require("express");
const route = require("./Routes/routes");
const { connectDB } = require("./db"); // Import the connectDB function
require("dotenv").config();
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(multer().any());

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    // Set up routes and start the server only after the MongoDB connection is established
    app.use("/", route);

    app.listen(process.env.PORT, function () {
      console.log(`Express app running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });
