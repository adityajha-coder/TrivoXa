require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB is handled by the entry points

// Middleware — CORS restricted to known origins
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:5501',
    'http://localhost:5501',
    'http://127.0.0.1:8080',
    'https://trivoxa.vercel.app'
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (curl, Postman, server-to-server, file://)
        if (!origin || origin === 'null') return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (origin.endsWith('.vercel.app')) return callback(null, true);
        // During dev, allow any localhost/127 origin to make it easier
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return callback(null, true);
        return callback(new Error('CORS: Origin not allowed: ' + origin), false);
    },
    credentials: true
}));
app.use(bodyParser.json({ limit: '5mb' }));

// Rate Limiting — Global: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' }
});
app.use(globalLimiter);

// Strict rate limit for auth endpoints (prevent brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login/register attempts. Please try again in 15 minutes.' }
});

// Strict rate limit for AI chat (protect Groq API key)
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'AI request limit reached. Please try again in 15 minutes.' }
});

// Mount Routes (with targeted rate limiters)
const authRoutes = require('./routes/auth');
const snippetRoutes = require('./routes/snippets');
const aiHistoryRoutes = require('./routes/aiHistory');
const docsHistoryRoutes = require('./routes/docsHistory');
const groqRoutes = require('./routes/groq');

app.use('/api/auth', authLimiter, authRoutes);
app.use('/auth', authLimiter, authRoutes);

app.use('/api/snippets', snippetRoutes);
app.use('/snippets', snippetRoutes);

app.use('/api/ai-history', aiHistoryRoutes);
app.use('/ai-history', aiHistoryRoutes);

app.use('/api/docs-history', docsHistoryRoutes);
app.use('/docs-history', docsHistoryRoutes);

app.use('/api/groq', aiLimiter, groqRoutes);
app.use('/groq', aiLimiter, groqRoutes);

// Health Check
app.get(['/', '/api'], (req, res) => {
    res.json({
        status: 'ok',
        message: 'TrivoXa API Server is running',
        endpoints: [
            'POST /api/auth/register',
            'POST /api/auth/login',
            'GET  /api/auth/me',
            'POST /api/groq/chat',
            'GET  /api/snippets',
            'POST /api/snippets',
            'DELETE /api/snippets/:id',
            'GET  /api/ai-history',
            'POST /api/ai-history',
            'DELETE /api/ai-history/:id',
            'DELETE /api/ai-history',
            'GET  /api/docs-history',
            'POST /api/docs-history',
            'DELETE /api/docs-history/:id',
            'DELETE /api/docs-history',
        ]
    });
});

app.get(['/health', '/api/health'], (req, res) => {
    res.json({ status: 'ok', mongo: 'connected' });
});

// Start server only in local environment
if (process.env.NODE_ENV !== 'production') {
    const connectDB = require('./config/db');
    connectDB();

    const server = app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════════════╗
║       TrivoXa API Server Started                    ║
╚════════════════════════════════════════════════════╝

  Server:    http://localhost:${PORT}
  Health:    http://localhost:${PORT}/health
  AI Chat:   POST http://localhost:${PORT}/api/groq/chat
  Auth:      POST http://localhost:${PORT}/api/auth/login

  Keep this terminal open while using the app.
        `);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`\nPort ${PORT} is already in use!`);
            console.error(`  Windows: netstat -ano | findstr :${PORT}`);
            console.error(`  Then: taskkill /PID <PID> /F\n`);
        } else {
            console.error('Server error:', err);
        }
        process.exit(1);
    });

    process.on('SIGINT', () => {
        console.log('\nShutting down TrivoXa API Server...');
        server.close(() => {
            console.log('Server stopped');
            process.exit(0);
        });
    });
}

// Export the Express app for Vercel serverless functions
module.exports = app;
