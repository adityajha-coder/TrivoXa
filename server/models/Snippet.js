const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        enum: ['text', 'api', 'command', 'tool', 'blueprint'],
        default: 'text'
    },
    lang: {
        type: String,
        default: 'html'
    },
    folder: {
        type: String,
        default: 'Uncategorized',
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPinned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', snippetSchema);
