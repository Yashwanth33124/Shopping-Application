require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const search = "shirts";
        let filter = {};
        if (search) {
            const searchTerms = search.split(/\s+/).map(term => {
                const cleanTerm = term.replace(/s$/i, '');
                return {
                $or: [
                    { title: { $regex: cleanTerm, $options: "i" } },
                    { name: { $regex: cleanTerm, $options: "i" } },
                    { description: { $regex: cleanTerm, $options: "i" } },
                    { category: { $regex: cleanTerm, $options: "i" } }
                ]
                };
            });
            filter.$and = searchTerms;
        }
        
        const products = await Product.find(filter).limit(20);
        console.log(`Found ${products.length} products for query "${search}"`);
        products.forEach(p => console.log(`- ${p.name}`));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
run();
