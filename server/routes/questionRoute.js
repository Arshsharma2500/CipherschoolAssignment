const express = require('express');
const { createQuestion, getQuestionsByTestId } = require('../controllers/questionController');
const router = express.Router();

router.post('/create', createQuestion);
router.get('/test/:testId', getQuestionsByTestId);

module.exports = router;
