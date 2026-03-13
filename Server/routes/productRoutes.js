const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductsByCategory,
  getSingleProduct
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProducts);
//get products by category
router.get("/category/:category",getProductsByCategory)
// GET single product by id
router.get("/:id", getSingleProduct);

module.exports = router;