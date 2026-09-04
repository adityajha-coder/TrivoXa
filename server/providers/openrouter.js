const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'openrouter/free';


async function chat(messages, options = {}) {
    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        max_tokens = 2048,
    } = options;

    if (!OPENROUTER_API_KEY) {
        throw Object.assign(new Error('OpenRouter API key not configured'), { provider: 'openrouter', retryable: false });
    }

    try {
        const response = await axios.post(
            `${OPENROUTER_BASE}/chat/completions`,
            { model, messages, temperature, max_tokens },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://trivoxa.vercel.app',
                    'X-Title': 'TrivoXa',
                },
                timeout: 60000,
            }
        );

        return {
            ...response.data,
            _provider: 'openrouter',
        };
    } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.error?.message || error.message;

        const err = new Error(message);
        err.provider = 'openrouter';
        err.status = status || 500;
        err.retryable = !status || status >= 500 || status === 429 || status === 404;
        throw err;
    }
}

module.exports = { chat, name: 'openrouter', DEFAULT_MODEL };
