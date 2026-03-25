const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");

// Create Product (Admin logic)
exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // 1️⃣ Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "VOGUE_CART" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // 2️⃣ Create product in MongoDB
    const product = await Product.create({
      title: req.body.title || req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: result.secure_url,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Get all products with filtering + search + sorting + pagination
exports.getAllProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    console.log(`[GET /api/products] category: ${category}, search: ${search}`);

    let filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      // Clean query and handle 'shirts' -> 'shirt' common plural
      let searchStr = search.trim();
      const keywords = searchStr.split(/\s+/).filter(k => k.length > 0);
      
      const orConditions = [];
      keywords.forEach(word => {
        // Basic plural handling for common e-commerce terms
        const normalized = word.toLowerCase().endsWith('s') && word.length > 4 
          ? word.slice(0, -1) 
          : word;

        orConditions.push(
          { name: { $regex: normalized, $options: "i" } },
          { name: { $regex: word, $options: "i" } },
          { description: { $regex: normalized, $options: "i" } },
          { category: { $regex: normalized, $options: "i" } }
        );
      });
      filter.$or = orConditions;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Get products for the current page
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    // Get total count for the current filter
    const totalProducts = await Product.countDocuments(filter);

    // 🏆 Get Counts per Category for the filters (H&M style)
    // We remove the category filter from this aggregation to see counts for all matching items
    const countFilter = { ...filter };
    delete countFilter.category; 

    const counts = await Product.aggregate([
      { $match: countFilter },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
      totalProducts,
      categoryCounts: counts, // Return count for each category
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get products by category (legacy/simple)
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        message: `Products of ${category} fetched successfully`,
        data: products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No products found by category ${category}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get products (alias for getAllProducts for frontend compatibility)
exports.getProducts = exports.getAllProducts;

// Get Single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};