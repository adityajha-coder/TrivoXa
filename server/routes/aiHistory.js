const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AiHistory = require("../models/AiHistory");

//chat history for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const history = await AiHistory.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI history." });
  }
});

// Save a chat message
router.post("/", auth, async (req, res) => {
  try {
    const { module: moduleType, prompt, response, timestamp } = req.body;
    if (!moduleType || !prompt || !response) {
      return res
        .status(400)
        .json({ error: "Module, prompt, and response are required." });
    }

    const item = new AiHistory({
      userId: req.user.id,
      module: moduleType,
      prompt,
      response,
      timestamp: timestamp || Date.now(),
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to save AI history." });
  }
});

// Delete a single history item
router.delete("/:id", auth, async (req, res) => {
  try {
    await AiHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({ message: "History item deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete history item." });
  }
});

//Clear all history for a user
router.delete("/", auth, async (req, res) => {
  try {
    await AiHistory.deleteMany({ userId: req.user.id });
    res.json({ message: "All AI history cleared." });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear history." });
  }
});

module.exports = router;
