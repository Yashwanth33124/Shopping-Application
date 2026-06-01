const mongoose = require("./node_modules/mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  description: String,
  role: String
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

const checkProducts = async () => {
    try {
        const uri = "mongodb+srv://cheruvuyashwanth99_db_user:Yashwanth%402004@cluster0.ztufaij.mongodb.net/voguecart?retryWrites=true&w=majority";
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        const count = await Product.countDocuments();
        console.log(`Product count: ${count}`);
        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

checkProducts();
