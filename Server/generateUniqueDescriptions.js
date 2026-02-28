require("dotenv").config();
const connectToDb = require("./database/db");
const Product = require("./models/product");

connectToDb();

const menTitles = [
  "Men Premium Jacket",
  "Men Urban Casual Shirt",
  "Men Modern Fit Collection",
  "Men Signature Streetwear",
  "Men Classic Fashion Wear",
  "Men Trendy Outfit",
  "Men Stylish Layered Look"
];

const womenTitles = [
  "Women Elegant Fashion Wear",
  "Women Modern Chic Collection",
  "Women Stylish Casual Outfit",
  "Women Premium Designer Wear",
  "Women Urban Trend Collection"
];

const childTitles = [
  "Kids Comfortable Daily Wear",
  "Kids Playful Casual Outfit",
  "Kids Soft Cotton Collection",
  "Kids Stylish School Wear"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

const updateDescriptions = async () => {
  try {
    const products = await Product.find();

    console.log(`Updating ${products.length} products...`);

    // Separate by category
    const men = shuffle(products.filter(p => p.category === "men"));
    const women = shuffle(products.filter(p => p.category === "woman"));
    const child = shuffle(products.filter(p => p.category === "child"));
    const beauty = shuffle(products.filter(p => p.category === "Beauty"));

    for (let product of products) {

      let description = "";
      product.role = "normal"; // default

      // MEN
      if (product.category === "men") {
        description = getRandom(menTitles);
        if (men.slice(0, 30).includes(product)) {
          product.role = "prime";
        }
      }

      // WOMEN
      if (product.category === "woman") {
        description = getRandom(womenTitles);
        if (women.slice(0, 20).includes(product)) {
          product.role = "prime";
        }
      }

      // CHILD
      if (product.category === "child") {
        description = getRandom(childTitles);
        if (child.slice(0, 5).includes(product)) {
          product.role = "prime";
        }
      }

      // BEAUTY
      if (product.category === "Beauty") {

        const name = product.name.toLowerCase();

        if (name.includes("lp")) {
          description = "Luxury Lipstick - Long Lasting Color & Smooth Finish";
        } else if (name.includes("bag")) {
          description = "Elegant Beauty Bag - Stylish, Compact & Travel Friendly";
        } else if (name.includes("perfume")) {
          description = "Premium Perfume - Long Lasting Fragrance & Fresh Aroma";
        } else if (name.includes("makeup")) {
          description = "Professional Makeup Kit - Smooth Application & Radiant Look";
        } else {
          description = "Premium Beauty Product - Advanced Skincare & Cosmetic Solution";
        }

        if (beauty.slice(0, 10).includes(product)) {
          product.role = "prime";
        }
      }

      product.description = description;
      await product.save();

      console.log(`${product._id} updated | role: ${product.role}`);
    }

    console.log("Descriptions and roles updated successfully ✅");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

updateDescriptions();