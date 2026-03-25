require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectToDb = require("./database/db");
const cloudinary = require("./config/cloudinary");
const Product = require("./models/product");

const adjectives = ["Stylish", "Classic", "Modern", "Relaxed", "Elegant", "Casual", "Trendy", "Professional"];
const fabrics = ["Cotton", "Linen", "Polyester Blend", "Silk", "Oxford", "Denim", "Chambray", "Flannel"];
const occasions = ["everyday wear", "office settings", "casual Friday", "weekend outings", "evening events", "outdoor adventures"];

const getUniqueDescription = (i) => {
    const adj = adjectives[i % adjectives.length];
    const fabric = fabrics[(i + 3) % fabrics.length];
    const occasion = occasions[(i + 5) % occasions.length];
    return `A ${adj.toLowerCase()} ${fabric.toLowerCase()} men's shirt perfect for ${occasion}. Experience unmatched comfort and style. Signature Style Code: MS-100${i}`;
};

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const category = "men";
        const folderPath = path.join(__dirname, "seedImages", "men");
        
        let files = fs.readdirSync(folderPath);
        
        // filter out non-image files if any, and large files. Let's just grab the first 100 valid ones.
        let validFiles = [];
        for (let file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            if (stats.size <= 10 * 1024 * 1024) {
                validFiles.push(file);
            }
            if (validFiles.length >= 100) break;
        }

        console.log(`Found ${validFiles.length} valid images to process.`);

        const productsToInsert = [];
        let primeCount = 0; 
        
        for (let i = 0; i < validFiles.length; i++) {
            const file = validFiles[i];
            const filePath = path.join(folderPath, file);

            try {
                process.stdout.write(`Uploading ${file} (${i+1}/${validFiles.length})... `);
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: `ecommerce/men`,
                });
                console.log("Done!");

                // 20 prime, 80 normal
                // Let's just make the first 20 prime
                const role = primeCount < 20 ? "prime" : "normal";
                if(role === "prime") primeCount++;
                
                productsToInsert.push({
                    name: `Men's ${adjectives[i % adjectives.length]} Shirt ${i+1}`,
                    description: getUniqueDescription(i),
                    price: Math.floor(Math.random() * 1500) + 500, // 500 to 1999
                    category: "Men",
                    stock: Math.floor(Math.random() * 100) + 10,
                    image: result.secure_url,
                    role: role
                });
            } catch (err) {
                console.log(`Error uploading ${file}: ${err.message}`);
            }
        }

        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
            console.log(`Successfully added ${productsToInsert.length} products to DB (Prime: ${primeCount}, Normal: ${productsToInsert.length - primeCount}).`);
        } else {
            console.log("No products to insert.");
        }
        
        process.exit(0);

    } catch (err) {
        console.error("General error:", err.message);
        process.exit(1);
    }
}

runSeed();
