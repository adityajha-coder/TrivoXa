const app = require('../server/index');
const connectDB = require('../server/config/db');
const mongoose = require('mongoose');

// Vercel Serverless Function Entrypoint
module.exports = async (req, res) => {
    try {
        // Ensure DB is connected before processing request
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        
        // Pass request to Express
        return app(req, res);
    } catch (error) {
        console.error('Vercel Entrypoint DB Error:', error);
        // Guarantee JSON is returned even on critical failure
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
};
