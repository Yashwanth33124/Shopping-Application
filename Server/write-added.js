require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ description: /signature style code/i }).sort({ createdAt: -1 }).limit(5);
        let output = "Here are some of the inserted items from MongoDB:\n";
        products.forEach((p, index) => {
            output += `\nItem ${index + 1}:\n`;
            output += `Name: ${p.name}\n`;
            output += `Role: ${p.role}\n`;
            output += `Image URL: ${p.image}\n`;
            output += `Description: ${p.description}\n`;
            output += `Price: $${p.price}\n`;
        });
        fs.writeFileSync("output.json", JSON.stringify(products, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
