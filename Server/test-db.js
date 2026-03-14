require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
    const categories = await Product.distinct("category");
    console.log("Categories found in DB:", categories);
    
    const count = await Product.countDocuments();
    console.log("Total products:", count);
    
    const samples = await Product.find().limit(5);
    console.log("Sample products:", JSON.stringify(samples, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

test();
