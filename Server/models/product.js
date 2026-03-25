const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  },
  stock: {
    type: Number,
    default: 0,
  },

  // ✅ ADD THIS
  role: {
    type: String,
    enum: ["normal", "prime"],
    default: "normal",
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);