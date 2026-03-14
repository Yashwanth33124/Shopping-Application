const express = require("express");
const multer = require("multer");
const { createProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

// Multer setup (temporary storage)
const upload = multer({
  dest: "uploads/",
});

// Routes
router.post("/create-product", upload.single("image"), createProduct);
router.get("/", getProducts);

module.exports = router;