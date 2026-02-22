const express = require("express");
const multer = require("multer");
const { createProduct } = require("../controllers/productController");

const router = express.Router();

// Multer setup (temporary storage)
const upload = multer({
  dest: "uploads/",
});

// Route
router.post("/create-product", upload.single("image"), createProduct);

module.exports = router;