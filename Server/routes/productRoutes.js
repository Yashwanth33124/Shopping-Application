const express = require("express");
const multer = require("multer");
const { createProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

const {
  getAllProducts,
  getProductsByCategory,
  getSingleProduct
} = require("../controllers/productController");

// Routes
router.post("/create-product", upload.single("image"), createProduct);
router.get("/", getProducts);

module.exports = router;