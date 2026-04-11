require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./database/db");


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const razorpayRoutes = require("./routes/razorpay-routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectToDb();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/razorpay", razorpayRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});