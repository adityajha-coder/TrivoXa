import { describe, it, expect, vi, beforeEach } from 'vitest';

const aiProviders = require('../server/providers');
const groq = require('../server/providers/groq');
const openrouter = require('../server/providers/openrouter');
const gemini = require('../server/providers/gemini');

describe('AI Providers Suite', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('Provider Configuration & Discovery', () => {
        it('should list all available providers and default models', () => {
            const list = aiProviders.getAvailableProviders();
            expect(list).toBeInstanceOf(Array);
            expect(list.length).toBe(3);

            const names = list.map(p => p.name);
            expect(names).toContain('groq');
            expect(names).toContain('openrouter');
            expect(names).toContain('gemini');

            list.forEach(p => {
                expect(p).toHaveProperty('name');
                expect(p).toHaveProperty('configured');
                expect(p).toHaveProperty('defaultModel');
            });
        });
    });

    describe('Provider Router & Automatic Fallback', () => {
        it('should call preferred provider (Groq) successfully on happy path', async () => {
            const mockResponse = {
                id: 'chatcmpl-test-123',
                choices: [{ message: { role: 'assistant', content: 'Groq response' } }],
                _provider: 'groq',
                model: 'groq/compound-mini'
            };

            vi.spyOn(groq, 'chat').mockResolvedValueOnce(mockResponse);

            const result = await aiProviders.chat([
                { role: 'user', content: 'Hello' }
            ], { provider: 'groq' });

            expect(result._provider).toBe('groq');
            expect(result.choices[0].message.content).toBe('Groq response');
            expect(groq.chat).toHaveBeenCalledTimes(1);
        });

        it('should automatically fall back to OpenRouter if Groq fails with retryable error', async () => {
            const groqError = Object.assign(new Error('Rate limit reached'), {
                status: 429,
                retryable: true,
                provider: 'groq'
            });

            const openRouterResponse = {
                id: 'or-123',
                choices: [{ message: { role: 'assistant', content: 'OpenRouter fallback response' } }],
                _provider: 'openrouter',
                model: 'openrouter/free'
            };

            vi.spyOn(groq, 'chat').mockRejectedValueOnce(groqError);
            vi.spyOn(openrouter, 'chat').mockResolvedValueOnce(openRouterResponse);

            const result = await aiProviders.chat([
                { role: 'user', content: 'Hello' }
            ], { provider: 'groq' });

            expect(result._provider).toBe('openrouter');
            expect(result.choices[0].message.content).toBe('OpenRouter fallback response');
            expect(groq.chat).toHaveBeenCalledTimes(1);
            expect(openrouter.chat).toHaveBeenCalledTimes(1);
        });

        it('should cascade to Gemini if both Groq and OpenRouter fail', async () => {
            const groqError = Object.assign(new Error('Model not found'), {
                status: 404,
                retryable: true,
                provider: 'groq'
            });

            const openRouterError = Object.assign(new Error('Gateway timeout'), {
                status: 504,
                retryable: true,
                provider: 'openrouter'
            });

            const geminiResponse = {
                id: 'gemini-123',
                choices: [{ message: { role: 'assistant', content: 'Gemini 3.6 cascade response' } }],
                _provider: 'gemini',
                model: 'gemini-3.6-flash'
            };

            vi.spyOn(groq, 'chat').mockRejectedValueOnce(groqError);
            vi.spyOn(openrouter, 'chat').mockRejectedValueOnce(openRouterError);
            vi.spyOn(gemini, 'chat').mockResolvedValueOnce(geminiResponse);

            const result = await aiProviders.chat([
                { role: 'user', content: 'Explain microservices' }
            ], { provider: 'groq' });

            expect(result._provider).toBe('gemini');
            expect(result.choices[0].message.content).toBe('Gemini 3.6 cascade response');
            expect(groq.chat).toHaveBeenCalledTimes(1);
            expect(openrouter.chat).toHaveBeenCalledTimes(1);
            expect(gemini.chat).toHaveBeenCalledTimes(1);
        });

        it('should throw immediately and NOT fallback if error is marked non-retryable', async () => {
            const badRequestError = Object.assign(new Error('Bad user input'), {
                status: 400,
                retryable: false,
                provider: 'groq'
            });

            vi.spyOn(groq, 'chat').mockRejectedValueOnce(badRequestError);
            const openrouterSpy = vi.spyOn(openrouter, 'chat');

            await expect(
                aiProviders.chat([{ role: 'user', content: '' }], { provider: 'groq' })
            ).rejects.toThrow('Bad user input');

            expect(openrouterSpy).not.toHaveBeenCalled();
        });

        it('should aggregate errors and throw if ALL providers in fallback chain fail', async () => {
            vi.spyOn(groq, 'chat').mockRejectedValueOnce(Object.assign(new Error('Groq down'), { retryable: true, status: 500 }));
            vi.spyOn(openrouter, 'chat').mockRejectedValueOnce(Object.assign(new Error('OpenRouter down'), { retryable: true, status: 502 }));
            vi.spyOn(gemini, 'chat').mockRejectedValueOnce(Object.assign(new Error('Gemini down'), { retryable: true, status: 503 }));

            await expect(
                aiProviders.chat([{ role: 'user', content: 'Test' }])
            ).rejects.toThrow(/All AI providers failed/);
        });
    });
});
