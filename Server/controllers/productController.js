const Product = require("../models/product")

// Get Products with Filtering + Search + Sorting + Pagination
exports.getAllProducts = async (req, res) => {
  try {
<<<<<<< HEAD

    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10
    } = req.query
=======

    // 1️⃣ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // 2️⃣ Create product in MongoDB
    const product = await Product.create({
      name: req.body.name || req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      role: req.body.role || "normal",   
      image: result.secure_url,
    });
>>>>>>> recovery

    // Dynamic Filter Object
    let filter = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" }
    }

    if (minPrice || maxPrice) {
      filter.price = {}

      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    // Sorting Logic
    let sortOption = {}

    if (sort === "price_asc") sortOption.price = 1
    if (sort === "price_desc") sortOption.price = -1
    if (sort === "newest") sortOption.createdAt = -1

    // Pagination Logic
    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    const skip = (pageNumber - 1) * limitNumber

    // Final Query
    const products = await Product
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)

    const totalProducts = await Product.countDocuments(filter)

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
      totalProducts,
      data: products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
};

// Get all products or by category
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    // Use case-insensitive regex for category
    const filter = category ? { category: { $regex: new RegExp(`^${category}$`, "i") } } : {};
    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};