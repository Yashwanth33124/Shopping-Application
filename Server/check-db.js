require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const p = await Product.findOne();
        console.log("TEST_IMAGE:", p ? p.image : "No product found");
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
