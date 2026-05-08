const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Snippet = require('../models/Snippet');

// Get all snippets for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const snippets = await Snippet.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch snippets.' });
    }
});

// Save a new snippet
router.post('/', auth, async (req, res) => {
    try {
        const { title, code, lang } = req.body;
        if (!title || !code) {
            return res.status(400).json({ error: 'Title and code are required.' });
        }

        const snippet = new Snippet({
            userId: req.user.id,
            title,
            code,
            lang: lang || 'html'
        });

        await snippet.save();
        res.status(201).json(snippet);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save snippet.' });
    }
});

// Delete a snippet
router.delete('/:id', auth, async (req, res) => {
    try {
        const snippet = await Snippet.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!snippet) return res.status(404).json({ error: 'Snippet not found.' });
        res.json({ message: 'Snippet deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete snippet.' });
    }
});

module.exports = router;
