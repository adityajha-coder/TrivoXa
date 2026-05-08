const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`  MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`  MongoDB Connection Error: ${error.message}`);
        console.error(`\n  Make sure MONGO_URI is set in your .env file.`);
        console.error(`  Example: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/vertex\n`);
        // Do not process.exit(1) on Vercel as it crashes the entire serverless container and returns an HTML 500 page.
        // Instead, we just let it fail. Subsequent API calls to DB will fail gracefully with JSON errors.
    }
};

module.exports = connectDB;
