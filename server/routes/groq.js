const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Proxy to Groq API (auth required — protects API key)
router.post("/chat", auth, async (req, res) => {
  try {
    const {
      messages,
      model = "groq/compound-mini",
      temperature = 0.7,
      max_tokens = 2048,
    } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    console.log(`[Groq Proxy] Processing request for model: ${model}`);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        messages,
        temperature,
        max_tokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        timeout: 60000,
      },
    );

    console.log(`[Groq Proxy] Success for model: ${model}`);
    res.json(response.data);
  } catch (error) {
    console.error("[Groq Proxy] Error:", error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error?.message || error.message;

    if (statusCode === 401) {
      return res
        .status(401)
        .json({
          error: "Unauthorized: API key is invalid or expired",
          message: errorMessage,
        });
    }
    if (statusCode === 429) {
      return res
        .status(429)
        .json({
          error: "Rate limited: Too many requests",
          message: "Wait a moment and try again",
        });
    }

    res
      .status(statusCode)
      .json({ error: "Groq API error", message: errorMessage });
  }
});

module.exports = router;
