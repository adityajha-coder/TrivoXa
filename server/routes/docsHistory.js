const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DocsHistory = require('../models/DocsHistory');

// docs search history for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const history = await DocsHistory.find({ userId: req.user.id }).sort({ timestamp: -1 }).limit(15);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch docs history.' });
    }
});

// Save a docs search entry
router.post('/', auth, async (req, res) => {
    try {
        const { query, source, url, timestamp } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required.' });
        }

        const item = new DocsHistory({
            userId: req.user.id,
            query,
            source: source || '',
            url: url || '',
            timestamp: timestamp || Date.now()
        });

        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save docs history.' });
    }
});

//Delete a single history item
router.delete('/:id', auth, async (req, res) => {
    try {
        await DocsHistory.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'History item deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete history item.' });
    }
});

//Clear all docs history for a user
router.delete('/', auth, async (req, res) => {
    try {
        await DocsHistory.deleteMany({ userId: req.user.id });
        res.json({ message: 'All docs history cleared.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to clear history.' });
    }
});

module.exports = router;
