require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ description: /signature style code/i }).sort({ createdAt: -1 }).limit(5);
        console.log("Here are some of the inserted items from MongoDB:");
        products.forEach((p, index) => {
            console.log(`\nItem ${index + 1}:`);
            console.log(`Name: ${p.name}`);
            console.log(`Role: ${p.role}`);
            console.log(`Image URL: ${p.image}`);
            console.log(`Description: ${p.description}`);
            console.log(`Price: $${p.price}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
