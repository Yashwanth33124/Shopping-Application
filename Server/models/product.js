const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },


  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    index: true,
  },
  stock: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    enum: ["normal", "prime"],
    default: "normal",
  }

}, { timestamps: true });

// Create text indexes for faster searching
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);