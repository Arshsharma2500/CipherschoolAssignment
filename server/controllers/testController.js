const Test = require('../models/test');

//createTest
const createTest = async (req, res) => {
    const { title, descriptors, questions } = req.body;
    try {
        const test = new Test({ title, descriptors, questions });
        await test.save();
        res.status(201).json({ message: 'Test created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//getTest_By_Id
const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('questions');
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createTest,
    getTestById
}

