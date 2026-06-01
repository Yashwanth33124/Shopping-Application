const mongoose = require("./node_modules/mongoose");

const listAll = async () => {
    try {
        const uri = "mongodb+srv://cheruvuyashwanth99_db_user:Yashwanth%402004@cluster0.ztufaij.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(uri);
        console.log("Connected to MongoDB cluster");
        
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log("Databases in this cluster:");
        for (let db of dbs.databases) {
            console.log(`- ${db.name}`);
        }
        
        // Check collections in the default/current db
        console.log(`\nChecking collections in current DB: ${mongoose.connection.db.databaseName}`);
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (let col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} documents`);
        }

        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

listAll();
