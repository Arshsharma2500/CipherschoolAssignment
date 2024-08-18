const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'test' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    selections: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
            option: { type: String, required: true },
            saveAt: { type: Date, default: Date.now }
        }
    ],
    endedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('submissions', submissionSchema);