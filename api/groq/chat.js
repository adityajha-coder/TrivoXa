const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, model = 'llama-3.1-8b-instant', temperature = 0.7, max_tokens = 2048 } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model,
            messages,
            temperature,
            max_tokens
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            timeout: 60000
        });

        res.status(200).json(response.data);

    } catch (error) {
        console.error('Vercel Proxy Error:', error.response?.data || error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        res.status(statusCode).json({ 
            error: 'Groq API error',
            message: errorMessage
        });
    }
};
