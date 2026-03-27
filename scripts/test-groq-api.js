#!/usr/bin/env node

/**
 * Groq API Key Validator & Test
 * Tests your API key to make sure it works
 * 
 * Run: node test-groq-api.js
 */

const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

console.log(`
╔════════════════════════════════════════════════════╗
║  Groq API Key Validator                            ║
╚════════════════════════════════════════════════════╝
`);

// Validate key format
console.log('📋 Checking API Key Format...');
if (!GROQ_API_KEY) {
    console.error('❌ API key is empty!');
    process.exit(1);
}

if (!GROQ_API_KEY.startsWith('gsk_')) {
    console.error('❌ API key format is invalid. Should start with "gsk_"');
    process.exit(1);
}

if (GROQ_API_KEY.length < 20) {
    console.error('❌ API key is too short');
    process.exit(1);
}

console.log('✓ API key format looks good');
console.log(`  Key: ${GROQ_API_KEY.substring(0, 10)}...${GROQ_API_KEY.substring(GROQ_API_KEY.length - 5)}`);

// Test the API
console.log('\n🧪 Testing Groq API Connection...');

(async () => {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'user',
                        content: 'Say "Hello, Groq API is working!"'
                    }
                ],
                temperature: 0.7,
                max_tokens: 100
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                timeout: 30000
            }
        );

        console.log('✓ Connection successful!');
        console.log('\n📊 API Response:');
        console.log(`  Model: ${response.data.model}`);
        console.log(`  Message: ${response.data.choices[0]?.message?.content}`);
        console.log(`  Tokens Used: ${response.data.usage?.total_tokens}`);

        console.log(`
╔════════════════════════════════════════════════════╗
║  ✓ Everything is working!                          ║
╚════════════════════════════════════════════════════╝

Your Groq API key is valid and working correctly.
You can now use the Groq Proxy for your website.

Next steps:
  1. Start proxy: node groq-proxy.js
  2. Start website: npm start
  3. Open: http://localhost:8080
  4. Test AI Chat feature
        `);

        process.exit(0);

    } catch (error) {
        console.error('❌ API Test Failed!');
        
        const status = error.response?.status;
        const errorMsg = error.response?.data?.error?.message || error.message;

        if (status === 401) {
            console.error('\n🔑 Issue: Unauthorized (401)');
            console.error('   Your API key is invalid or expired.');
            console.error('   Get a new one from: https://console.groq.com/keys');
        } else if (status === 429) {
            console.error('\n⏱️  Issue: Rate Limited (429)');
            console.error('   You\'ve made too many requests.');
            console.error('   Wait a few minutes and try again.');
        } else if (status === 500) {
            console.error('\n🔧 Issue: Server Error (500)');
            console.error('   Groq API is having issues.');
            console.error('   Check: https://status.groq.com');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('\n🌐 Issue: Cannot Connect');
            console.error('   Check your internet connection.');
            console.error('   Groq API might be blocked by firewall/VPN.');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('\n⏳ Issue: Connection Timeout');
            console.error('   Groq API is not responding.');
            console.error('   Try again in a moment.');
        } else {
            console.error(`\n⚠️  Error: ${errorMsg}`);
            console.error(`   Status: ${status || 'Unknown'}`);
        }

        console.error(`
═══════════════════════════════════════════════════

Debugging:
  1. Verify API key: https://console.groq.com
  2. Check account status
  3. Check internet connection
  4. Try different VPN/proxy

Error details:
  Status: ${status || 'N/A'}
  Message: ${errorMsg}
        `);

        process.exit(1);
    }
})();
