const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    descriptors: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('test', testSchema);