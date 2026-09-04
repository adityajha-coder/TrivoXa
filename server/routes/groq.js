const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const aiProviders = require("../providers");

// Proxy to AI providers (auth required — protects API keys)
router.post("/chat", auth, async (req, res) => {
  try {
    const {
      messages,
      model,
      temperature = 0.7,
      max_tokens = 2048,
      provider = "groq",
    } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    console.log(`[AI Chat] Request from user ${req.user?.id || 'unknown'} — provider: ${provider}, model: ${model || 'default'}`);

    const result = await aiProviders.chat(messages, {
      model,
      temperature,
      max_tokens,
      provider,
    });

    console.log(`[AI Chat] Success via ${result._provider}`);
    res.json(result);
  } catch (error) {
    console.error("[AI Chat] Error:", error.message);
    const statusCode = error.status || 500;
    const errorMessage = error.message;

    if (statusCode === 401) {
      return res.status(401).json({
        error: "Unauthorized: API key is invalid or expired",
        message: errorMessage,
        provider: error.provider,
      });
    }
    if (statusCode === 429) {
      return res.status(429).json({
        error: "Rate limited: Too many requests",
        message: "Wait a moment and try again",
        provider: error.provider,
      });
    }

    res.status(statusCode).json({
      error: "AI provider error",
      message: errorMessage,
      provider: error.provider,
      // Include all provider errors if available (for debugging)
      ...(error.errors && { providerErrors: error.errors }),
    });
  }
});

// Get available providers
router.get("/providers", auth, (req, res) => {
  res.json({ providers: aiProviders.getAvailableProviders() });
});

module.exports = router;
