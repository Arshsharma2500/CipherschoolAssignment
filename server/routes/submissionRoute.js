const express = require('express');
const { submitAnswers, getSubmissions } = require('../controllers/submissionController');
const router = express.Router();

router.post('/submit', submitAnswers);
router.get('/test/:testId/user/:userId', getSubmissions);

module.exports = router;
