const Product = require("../models/product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
    if(allProducts.length > 0){
      res.status(200).json({
        success: true,
        message: "List of Products fetched Successfully",
        data: allProducts
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No Products found in collection"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"Some thing went wrong Please try again"
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category });
    if(products.length > 0){
      res.status(200).json({
        success: true,
        message: `Products of ${category} fetched successfully`,
        data: products
      })
    }
    else{
      res.status(404).json({
        success : false,
        message: `No products found in category ${category}`
      })
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Something went wrong try again later" 
    });
  }
};

// Get single product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
     if(!product){
      res.status(404).json({
        success : false,
        message: `Product not found with the id ${req.params.id}`
      })
     } else{
      res.status(200).json({
        success: true,
        message: "Product found successfully",
        data: product
      })
     }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};