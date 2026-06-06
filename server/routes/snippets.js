const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Snippet = require("../models/Snippet");

// Get all snippets for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch snippets." });
  }
});

// Save a new snippet
router.post("/", auth, async (req, res) => {
  try {
    const { title, code, lang, folder, tags, isPinned, itemType } = req.body;
    if (!title || !code) {
      return res.status(400).json({ error: "Title and code are required." });
    }

    const snippet = new Snippet({
      userId: req.user.id,
      title,
      code,
      itemType: itemType || "text",
      lang: lang || "html",
      folder: folder || "Uncategorized",
      tags: Array.isArray(tags) ? tags : [],
      isPinned: isPinned || false,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to save snippet." });
  }
});

// Update a snippet
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, code, lang, folder, tags, isPinned, itemType } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (code) updateData.code = code;
    if (itemType) updateData.itemType = itemType;
    if (lang) updateData.lang = lang;
    if (folder !== undefined) updateData.folder = folder || "Uncategorized";
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : [];
    if (isPinned !== undefined) updateData.isPinned = isPinned;

    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updateData },
      { new: true },
    );
    if (!snippet) return res.status(404).json({ error: "Snippet not found." });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to update snippet." });
  }
});

// Toggle pin status
router.patch("/:id/pin", auth, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!snippet) return res.status(404).json({ error: "Snippet not found." });

    snippet.isPinned = !snippet.isPinned;
    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle pin." });
  }
});

// Delete a snippet
router.delete("/:id", auth, async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!snippet) return res.status(404).json({ error: "Snippet not found." });
    res.json({ message: "Snippet deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete snippet." });
  }
});

module.exports = router;
