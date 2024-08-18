const Question = require('../models/question');

//create-question
const createQuestion = async (req, res) => {
    const { question, options, testId, marks, correctOption } = req.body;
    try {
        const newQuestion = new Question({ question, options, testId, marks, correctOption });
        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//getQuestion By Test Id
const getQuestionsByTestId = async (req, res) => {
    try {
        const questions = await Question.find({ testId: req.params.testId });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports ={
    createQuestion,
    getQuestionsByTestId
} 

