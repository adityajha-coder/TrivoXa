/**
 * Vertex MEN Stack — Main Server Entry Point
 * Connects to MongoDB, configures Express middleware, and mounts all API routes.
 * 
 * Usage:
 *   npm run proxy
 *   Server runs on http://localhost:3001
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// Mount Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/snippets', require('./routes/snippets'));
app.use('/api/ai-history', require('./routes/aiHistory'));
app.use('/api/docs-history', require('./routes/docsHistory'));
app.use('/api/groq', require('./routes/groq'));

// Root / Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Vertex API Server is running',
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
        ]
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', mongo: 'connected' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║       Vertex API Server Started                    ║
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

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});

process.on('SIGINT', () => {
    console.log('\nShutting down Vertex API Server...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});
