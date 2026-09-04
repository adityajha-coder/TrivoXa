const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const DEFAULT_MODEL = 'gemini-3.6-flash';


async function chat(messages, options = {}) {
    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        max_tokens = 2048,
    } = options;

    if (!GEMINI_API_KEY) {
        throw Object.assign(new Error('Gemini API key not configured'), { provider: 'gemini', retryable: false });
    }

    const { systemInstruction, contents } = transformMessages(messages);

    try {
        const response = await axios.post(
            `${GEMINI_BASE}/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents,
                systemInstruction,
                generationConfig: {
                    temperature,
                    maxOutputTokens: max_tokens,
                },
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 60000,
            }
        );

        return transformResponse(response.data, model);
    } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.error?.message || error.message;

        const err = new Error(message);
        err.provider = 'gemini';
        err.status = status || 500;
        err.retryable = !status || status >= 500 || status === 429 || status === 404;
        throw err;
    }
}


function transformMessages(messages) {
    let systemInstruction = undefined;
    const contents = [];

    for (const msg of messages) {
        if (msg.role === 'system') {
            systemInstruction = { parts: [{ text: msg.content }] };
        } else {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            });
        }
    }

    if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: 'Hello' }] });
    }

    return { systemInstruction, contents };
}


function transformResponse(geminiData, model) {
    const candidate = geminiData.candidates?.[0];
    const text = candidate?.content?.parts?.map(p => p.text).join('') || '';

    return {
        id: `gemini-${Date.now()}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model,
        choices: [{
            index: 0,
            message: { role: 'assistant', content: text },
            finish_reason: candidate?.finishReason?.toLowerCase() === 'stop' ? 'stop' : 'length',
        }],
        usage: {
            prompt_tokens: geminiData.usageMetadata?.promptTokenCount || 0,
            completion_tokens: geminiData.usageMetadata?.candidatesTokenCount || 0,
            total_tokens: geminiData.usageMetadata?.totalTokenCount || 0,
        },
        _provider: 'gemini',
    };
}

module.exports = { chat, name: 'gemini', DEFAULT_MODEL };
