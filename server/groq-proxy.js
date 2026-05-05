/**
 * Groq API Proxy Server
 * Proxies Groq requests to avoid CORS issues
 * 
 * Usage:
 *   npm run proxy
 *   Server runs on http://localhost:3001
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

try {
    const required = ['express', 'cors', 'axios', 'body-parser'];
    for (const pkg of required) {
        try {
            require.resolve(pkg);
        } catch (err) {
            console.error(`\n❌ ERROR: Required package "${pkg}" is not installed!`);
            console.error('\nFix:\n  Run: npm install\n');
            process.exit(1);
        }
    }
} catch (err) {
    console.error('Failed to check dependencies:', err.message);
    process.exit(1);
}

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Load API key from .env
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY || !GROQ_API_KEY.startsWith('gsk_')) {
    console.warn('⚠️  Warning: Invalid or missing GROQ_API_KEY in environment variables');
}

// Root endpoint (helps verify server is running)
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Groq Proxy Server is running',
        endpoint: 'POST /api/groq/chat'
    });
});

// Proxy endpoint for chat completions
app.post('/api/groq/chat', async (req, res) => {
    try {
        const { messages, model = 'llama-3.1-8b-instant', temperature = 0.7, max_tokens = 2048 } = req.body;

        // Validate input
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        if (!model) {
            return res.status(400).json({ error: 'Model is required' });
        }

        console.log(`[Groq Proxy] Processing request for model: ${model}`);

        // Call Groq API
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            timeout: 60000
        });

        console.log(`[Groq Proxy] ✓ Success for model: ${model}`);
        res.json(response.data);

    } catch (error) {
        console.error('[Groq Proxy] Error:', error.response?.data || error.message);

        // Return detailed error info
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        if (statusCode === 401) {
            return res.status(401).json({
                error: 'Unauthorized: API key is invalid or expired',
                message: errorMessage
            });
        }

        if (statusCode === 429) {
            return res.status(429).json({
                error: 'Rate limited: Too many requests',
                message: 'Wait a moment and try again'
            });
        }

        res.status(statusCode).json({
            error: 'Groq API error',
            message: errorMessage,
            details: error.response?.data
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Groq Proxy is running',
        apiKeyConfigured: GROQ_API_KEY ? 'Yes' : 'No'
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║       Groq API Proxy Server Started ✓             ║
╚════════════════════════════════════════════════════╝

📍 Server: http://localhost:${PORT}
🔗 Health Check: http://localhost:${PORT}/
📡 Endpoint: POST http://localhost:${PORT}/api/groq/chat
🔑 API Key: ${GROQ_API_KEY ? '✓ Configured' : '✗ Missing (set GROQ_API_KEY env var)'}

🧪 Test the proxy:
   curl http://localhost:${PORT}/

📝 In your browser or app:
   POST http://localhost:${PORT}/api/groq/chat
   {
     "messages": [{"role": "user", "content": "Hello!"}],
     "model": "llama-3.1-8b-instant"
   }

💡 Keep this terminal open while using the app.
    `);
});

// Handle errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
        console.error(`\nSolutions:\n`);
        console.error(`  1. Kill the process using port ${PORT}:`);
        console.error(`     Windows: netstat -ano | findstr :${PORT}`);
        console.error(`     Then: taskkill /PID <PID> /F\n`);
        console.error(`  2. Or use a different port:`);
        console.error(`     set PORT=3002`);
        console.error(`     node groq-proxy.js\n`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});

process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down Groq Proxy Server...');
    server.close(() => {
        console.log('✓ Server stopped');
        process.exit(0);
    });
});
