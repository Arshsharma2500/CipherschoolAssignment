const { models } = require('mongoose');
const Submission = require('../models/submissions');

//submitAnswer
const submitAnswers = async (req, res) => {
    const { testId, userId, selections } = req.body;
    try {
        const newSubmission = new Submission({ testId, userId, selections });
        await newSubmission.save();
        res.status(201).json({ message: 'Submission saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//getSubmissions 
const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ testId: req.params.testId, userId: req.params.userId });
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    submitAnswers,
    getSubmissions
}
