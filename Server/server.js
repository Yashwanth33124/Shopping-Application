require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./database/db");


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const razorpayRoutes = require("./routes/razorpay-routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/razorpay", razorpayRoutes);



const startServer = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Missing JWT_SECRET_KEY in Server/.env");
  }

  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
