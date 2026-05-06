const mongoose = require('mongoose');

const docsHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    query: {
        type: String,
        required: true
    },
    source: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Number,
        default: () => Date.now()
    }
}, { timestamps: true });

module.exports = mongoose.model('DocsHistory', docsHistorySchema);
