const { models } = require('mongoose');
const Submission = require('../models/submissions');
const Question = require('../models/question');
const User = require('../models/users'); // Assuming this is the correct path to your User model
const sendEmail = require('../utils/emailService');

//submitAnswer
const submitAnswers = async (req, res) => {
    const { testId, userId, selections } = req.body;
    try {
        const newSubmission = new Submission({ testId, userId, selections });
        await newSubmission.save();

        // Evaluate the submission immediately
        const questions = await Question.find({ testId });
        let totalMarks = 0;

        questions.forEach(question => {
            const selectedOption = selections.find(selection => 
                selection.questionId.toString() === question._id.toString()
            );

            if (selectedOption && selectedOption.option === question.correctOption) {
                totalMarks += question.marks;
            }
        });

        // Prepare and send the result email
        const user = await User.findById(userId);
        const subject = `Test Results for Test ID: ${testId}`;
        const htmlContent = `<p>Dear ${user.name},</p><p>You scored ${totalMarks} marks in the test.</p>`;
        sendEmail(user.email, subject, htmlContent);

        res.status(201).json({ message: 'Submission saved and results emailed successfully', totalMarks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = submitAnswers;