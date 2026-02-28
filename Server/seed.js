require("dotenv").config();
const fs = require("fs");
const path = require("path");

const connectToDb = require("./database/db");
const cloudinary = require("./config/cloudinary");
const Product = require("./models/product");

connectToDb();

const categories = ["men", "woman", "child", "Beauty"];

const seedProducts = async () => {
  try {
    for (let category of categories) {
      const folderPath = path.join(__dirname, "seedImages", category);

      if (!fs.existsSync(folderPath)) {
        console.log(`${category} folder not found`);
        continue;
      }

      const files = fs.readdirSync(folderPath);

      for (let file of files) {
        const filePath = path.join(folderPath, file);

        // ✅ Skip large files (>10MB)
        const stats = fs.statSync(filePath);
        if (stats.size > 10 * 1024 * 1024) {
          console.log(`${file} skipped (file too large)`);
          continue;
        }

        try {
          const result = await cloudinary.uploader.upload(filePath, {
            folder: `ecommerce/${category}`,
          });

          await Product.create({
            name: file.split(".")[0],
            description: `${category} product`,
            price: 999,
            category: category,
            stock: 10,
            image: result.secure_url,
          });

          console.log(`${file} uploaded`);
        } catch (uploadError) {
          console.log(`Error uploading ${file}:`, uploadError.message);
        }
      }
    }

    console.log("All products processed ✅");
    process.exit();
  } catch (error) {
    console.log("General Error:", error.message);
    process.exit(1);
  }
};

seedProducts();