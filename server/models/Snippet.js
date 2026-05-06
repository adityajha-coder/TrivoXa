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
    lang: {
        type: String,
        default: 'html'
    }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', snippetSchema);
