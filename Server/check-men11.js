require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const p = await Product.findOne({ name: "men11" });
        fs.writeFileSync("men11.json", JSON.stringify(p, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
