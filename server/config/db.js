const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`  MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`  MongoDB Connection Error: ${error.message}`);
        console.error(`\n  Make sure MONGO_URI is set in your .env file.`);
        console.error(`  Example: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/trivoxa\n`);
        throw error;
    }
};

module.exports = connectDB;
