const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE = 'https://api.groq.com/openai/v1';
const DEFAULT_MODEL = 'groq/compound-mini';


async function chat(messages, options = {}) {
    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        max_tokens = 2048,
    } = options;

    if (!GROQ_API_KEY) {
        throw Object.assign(new Error('Groq API key not configured'), { provider: 'groq', retryable: false });
    }

    try {
        const response = await axios.post(
            `${GROQ_BASE}/chat/completions`,
            { model, messages, temperature, max_tokens },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                },
                timeout: 60000,
            }
        );

        return {
            ...response.data,
            _provider: 'groq',
        };
    } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.error?.message || error.message;
        const code = error.response?.data?.error?.code;

        const err = new Error(message);
        err.provider = 'groq';
        err.status = status || 500;
        err.retryable = !status || status >= 500 || status === 429 || code === 'model_not_found';
        throw err;
    }
}

module.exports = { chat, name: 'groq', DEFAULT_MODEL };
