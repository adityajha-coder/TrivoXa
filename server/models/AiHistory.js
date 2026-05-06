const mongoose = require('mongoose');

const aiHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    module: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: () => Date.now()
    }
}, { timestamps: true });

module.exports = mongoose.model('AiHistory', aiHistorySchema);
