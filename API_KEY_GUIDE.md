# 🔑 Groq API Key Guide

## Your API Key
```
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
```

This key is:
- ✅ Already configured in `groq-proxy.js`
- ✅ Already in `js/utils/api.js`
- ✅ Ready to use

---

## 🧪 Verify Your API Key Works

### Option 1: PowerShell
```powershell
.\test-api.ps1
```

### Option 2: Batch
```cmd
test-api.bat
```

### Option 3: npm
```powershell
npm run test:api
```

All will test if your API key is valid and working.

---

## ✅ What a Valid Key Looks Like

Format: `gsk_xxxxxxxxxxxxxxxx...`

Your key:
- ✓ Starts with `gsk_`
- ✓ Is approximately 50+ characters long
- ✓ Contains random alphanumeric characters

---

## 🔄 Where Your API Key Is Used

### 1. **Groq Proxy Server** (`groq-proxy.js`)
```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';
```

### 2. **Frontend Configuration** (`js/utils/api.js`)
```javascript
GROQ_API_KEY: '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',
```

### 3. **Environment Variable** (Optional, Higher Priority)
```powershell
$env:GROQ_API_KEY = 'your_key_here'
node groq-proxy.js
```

---

## 🔐 How the Key Works

```
Your Website (Frontend)
       ↓
Groq Proxy (groq-proxy.js)
  - Uses your API key
  - Adds Authorization header
       ↓
Groq API (api.groq.com)
  - Validates your key
  - Processes your request
       ↓
Response returns to your website
```

---

## 💡 Pro Tips

### Use Environment Variable (More Secure)
Instead of hardcoding, use environment variable:

```powershell
# Set for current session
$env:GROQ_API_KEY = 'gsk_...'
node groq-proxy.js
```

Or create `.env` file:
```
GROQ_API_KEY=gsk_...
```

Then load it in your script.

### Rotate Your Key Periodically
- Go to https://console.groq.com/keys
- Delete old key
- Create new one
- Update your code

---

## ⚠️ API Key Errors

### "Unauthorized" (401)
**Cause**: API key is invalid or expired  
**Fix**: 
1. Go to https://console.groq.com/keys
2. Check if key is still active
3. Generate a new one if needed
4. Update `groq-proxy.js` with new key

### "Rate Limited" (429)
**Cause**: Too many requests in short time  
**Fix**: Wait a few minutes before trying again
- Free tier: 30 requests/minute
- Check usage at https://console.groq.com

### "Payment Required" (402)
**Cause**: Account quota exhausted  
**Fix**: 
1. Go to https://console.groq.com
2. Check your usage
3. Upgrade plan if needed

---

## 📊 Free Tier Limits

| Limit | Value |
|-------|-------|
| Requests/minute | 30 |
| Tokens/day | Up to 1 million |
| Models | All available |
| Cost | Free |

---

## 🔄 Updating Your API Key

If you get a new API key from Groq:

### In groq-proxy.js
```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_YOUR_NEW_KEY_HERE';
```

### In js/utils/api.js
```javascript
GROQ_API_KEY: 'gsk_YOUR_NEW_KEY_HERE',
```

### Via Environment Variable
```powershell
$env:GROQ_API_KEY = 'gsk_YOUR_NEW_KEY_HERE'
node groq-proxy.js
```

---

## 🆘 Troubleshooting

### "Invalid Groq API key" Error
1. Verify key format starts with `gsk_`
2. Copy-paste entire key (watch for spaces)
3. Check key is not expired at console.groq.com
4. Generate new key if needed

### "Cannot connect to API"
1. Check internet connection
2. Verify proxy server is running
3. Check firewall/VPN settings
4. Try different VPN/proxy

### "Too many requests"
1. Wait 1-2 minutes
2. Check your request frequency
3. Don't spam requests
4. Free tier has 30 req/min limit

---

## ✨ Verify Setup

```powershell
# Test if API key is valid
npm run test:api

# Start proxy with your key
npm run proxy

# In another terminal, test it
npm start

# Open browser
http://localhost:8080

# Go to AI Chat and test
```

---

## 📚 Resources

- **Get API Key**: https://console.groq.com/keys
- **Check Usage**: https://console.groq.com
- **API Status**: https://status.groq.com
- **API Docs**: https://console.groq.com/docs

---

## 🎯 Your Setup is Ready!

Your API key is already configured and ready to use. Just:

1. Verify it works: `npm run test:api`
2. Start proxy: `npm run proxy`
3. Start website: `npm start`
4. Test in browser

**You're all set!** 🚀
