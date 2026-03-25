require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const products = await Product.find({ name: /^shirt\d+\/men$/i });
        
        console.log(`Found ${products.length} products to update.`);
        
        let count = 0;
        for (const p of products) {
            p.category = "Men Shirts";
            await p.save();
            count++;
        }
        
        console.log(`Successfully updated ${count} products to category "Men Shirts".`);
        
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
