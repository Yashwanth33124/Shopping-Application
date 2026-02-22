const mongoose = require('mongoose')


const connectToDb = async() => {
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MonogoDb is Successfully Connected");
       
    }catch(e){
        console.log("MongoDb Connection Error",e)
        process.exit(1)
    }
}


module.exports = connectToDb;