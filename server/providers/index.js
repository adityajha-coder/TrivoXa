const groq = require('./groq');
const openrouter = require('./openrouter');
const gemini = require('./gemini');

// Provider registry — order defines fallback chain
const providers = { groq, openrouter, gemini };
const FALLBACK_ORDER = ['groq', 'openrouter', 'gemini'];

// Default models per provider 
const DEFAULT_MODELS = {
    groq: groq.DEFAULT_MODEL,
    openrouter: openrouter.DEFAULT_MODEL,
    gemini: gemini.DEFAULT_MODEL,
};

/**
 * Route a chat request to the preferred provider with automatic fallback.
 *
 * @param {Array} messages - OpenAI-style messages [{role, content}]
 * @param {Object} options - { model, temperature, max_tokens, provider }
 * @returns {Object} OpenAI-compatible response with _provider field
 */
async function chat(messages, options = {}) {
    const { provider: preferred = 'groq', ...chatOptions } = options;

    // Build fallback chain: preferred provider first, then the rest
    const chain = [preferred, ...FALLBACK_ORDER.filter(p => p !== preferred)];
    const errors = [];

    for (const providerName of chain) {
        const providerModule = providers[providerName];
        if (!providerModule) continue;

        try {
            // When falling back, use the fallback provider's default model
            const providerOptions = providerName === preferred
                ? chatOptions
                : { ...chatOptions, model: DEFAULT_MODELS[providerName] };

            console.log(`[AI Provider] Trying ${providerName} (model: ${providerOptions.model || 'default'})...`);

            const result = await providerModule.chat(messages, providerOptions);

            if (errors.length > 0) {
                console.log(`[AI Provider] ✓ Fallback to ${providerName} succeeded after ${errors.length} failure(s)`);
            } else {
                console.log(`[AI Provider] ✓ ${providerName} responded successfully`);
            }

            return result;
        } catch (err) {
            console.error(`[AI Provider] ✗ ${providerName} failed: ${err.message}`);
            errors.push({ provider: providerName, error: err.message, status: err.status });

            if (err.retryable === false) {
                throw err;
            }
        }
    }

    // All providers failed
    const lastError = errors[errors.length - 1];
    const err = new Error(
        `All AI providers failed. Last error (${lastError.provider}): ${lastError.error}`
    );
    err.status = lastError.status || 500;
    err.errors = errors;
    throw err;
}


function getAvailableProviders() {
    return FALLBACK_ORDER.map(name => ({
        name,
        configured: !!process.env[`${name.toUpperCase()}_API_KEY`] || (name === 'groq' && !!process.env.GROQ_API_KEY),
        defaultModel: DEFAULT_MODELS[name],
    }));
}

module.exports = { chat, getAvailableProviders, providers, FALLBACK_ORDER };
