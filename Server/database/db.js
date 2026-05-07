const mongoose = require("mongoose");

const connectToDb = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in Server/.env");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectToDb;
