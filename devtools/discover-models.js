#!/usr/bin/env node

/**
 * Groq Model Discovery Tool
 * Finds which models are available for your API key
 */

const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

// List of models to test (ordered by likely availability)
const modelsToTest = [
    'mixtral-8x7b',
    'mixtral-8x7b-32768',
    'llama-3.1-70b-versatile',
    'llama-3.1-8b-instant',
    'llama3-70b-8192',
    'llama3-8b-8192',
    'llama2-70b-4096',
    'gemma-7b-it',
    'llama-vision-preview',
    'gpt-4o',
    'gpt-4-turbo',
    'gpt-4',
    'gpt-3.5-turbo'
];

console.log(`
╔════════════════════════════════════════════════════╗
║  Groq Model Discovery Tool                         ║
║  Finding available models for your API key...      ║
╚════════════════════════════════════════════════════╝
`);

(async () => {
    const availableModels = [];
    const unavailableModels = [];

    for (const model of modelsToTest) {
        process.stdout.write(`Testing ${model}... `);

        try {
            const response = await axios.post(
                'https://api.groq.com/openai/v1/chat/completions',
                {
                    model: model,
                    messages: [
                        {
                            role: 'user',
                            content: 'Test'
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 10
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GROQ_API_KEY}`
                    },
                    timeout: 10000
                }
            );

            console.log('✓ AVAILABLE');
            availableModels.push(model);

        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.error?.message || error.message;

            if (status === 404 || message?.includes('does not exist')) {
                console.log('✗ Not found');
            } else if (status === 400 && message?.includes('decommissioned')) {
                console.log('✗ Deprecated');
            } else if (status === 401) {
                console.log('✗ Unauthorized (bad key)');
            } else if (status === 429) {
                console.log('✗ Rate limited (try again later)');
            } else {
                console.log(`✗ ${status || 'Error'}`);
            }

            unavailableModels.push({ model, status, message: message?.substring(0, 50) });
        }
    }

    console.log(`
╔════════════════════════════════════════════════════╗
║  Results                                           ║
╚════════════════════════════════════════════════════╝
`);

    if (availableModels.length > 0) {
        console.log('✓ Available Models:');
        availableModels.forEach(m => console.log(`  • ${m}`));
        console.log(`
Use one of these in your files. Example:
  API.callGroqChat(messages, '${availableModels[0]}', 0.7)
`);
    } else {
        console.log('✗ No models found available for your API key!');
        console.log(`
Possible reasons:
  1. API key is invalid or expired
  2. Free trial has ended or quota exceeded
  3. Account restrictions
  4. Regional limitations

Next steps:
  1. Check https://console.groq.com to verify account status
  2. Create a new API key if needed
  3. Check if free trial is active
`);
    }

    if (unavailableModels.length > 0 && unavailableModels.length <= 3) {
        console.log(`
Tested (not available):`);
        unavailableModels.forEach(({model}) => console.log(`  • ${model}`));
    }

    process.exit(availableModels.length > 0 ? 0 : 1);
})();
