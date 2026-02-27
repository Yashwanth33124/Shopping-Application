require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectToDb();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Middlewares
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});