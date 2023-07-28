const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.DATABASE;

let database; // Variable to store the MongoDB database instance

async function connectDB() {
  const client = new MongoClient(url);
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("MongoDB is connected");
    database = client.db("Backend-Assignment"); // specify the database name here
  } catch (err) {
    console.log("Failed to connect to MongoDB:", err);
    throw err;
  }
}

// Function to return the MongoDB database instance
function getDatabase() {
  return database;
}

module.exports = { connectDB, getDatabase };
