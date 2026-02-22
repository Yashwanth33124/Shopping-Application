require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectToDb();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Test Route (optional but useful)
app.get("/", (req, res) => {
  res.send("Ecommerce API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});