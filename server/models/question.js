const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'test' },
    marks: { type: Number, required: true },
    correctOption: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('question', questionSchema);