const express = require("express");
const multer = require("multer");
const { 
  createProduct, 
  getProducts,
  getProductsByCategory,
  getSingleProduct
} = require("../controllers/productController");

const router = express.Router();

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/create-product", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getSingleProduct);

module.exports = router;