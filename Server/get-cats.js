require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const cats = await Product.distinct("category");
    console.log("Distinct Categories:", cats);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
test();
