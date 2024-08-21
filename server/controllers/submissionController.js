const Submission = require('../models/submissions');
const Question = require('../models/question'); // Assuming this is your question model

// Submit answers
const submitAnswers = async (req, res) => {
    const { testId, userId, selections } = req.body;

    try {
        // Save the submission
        const newSubmission = new Submission({ testId, userId, selections });
        await newSubmission.save();

        // Fetch questions associated with the testId
        const questions = await Question.find({ testId });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this test.' });
        }

        // Evaluate the submission
        let totalMarks = 0;

        questions.forEach(question => {
            const selectedOption = selections[question._id];
            if (selectedOption && selectedOption === question.correctOption) {
                totalMarks += question.marks;
            }
        });

        // Send back the total marks scored
        res.status(201).json({ message: 'Submission saved successfully', totalMarks });

    } catch (err) {
        console.error("Error saving submission:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get submissions
const getSubmissions = async (req, res) => {
    try {
        const { testId, userId } = req.params;
        const submissions = await Submission.find({ testId, userId });
        
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this user and test.' });
        }

        res.status(200).json(submissions);
    } catch (err) {
        console.error("Error retrieving submissions:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    submitAnswers,
    getSubmissions
};
