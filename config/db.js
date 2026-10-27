const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongo_password = process.env.MONGODB_PASSWORD;
        const mongo_url = process.env.MONGODB_URL.replace("<password>", mongo_password);
        
        await mongoose.connect(mongo_url);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log(error);
        
        console.log(`An error occured while connecting to database`, error);
    }
};

module.exports = connectDB;