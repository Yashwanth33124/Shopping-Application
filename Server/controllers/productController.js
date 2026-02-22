const cloudinary = require("../config/cloudinary");
const Product = require("../models/product");
const fs = require("fs");

exports.createProduct = async (req, res) => {
  try {
    // 1️⃣ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // 2️⃣ Create product in MongoDB
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: result.secure_url,
    });

    // 3️⃣ Delete local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};