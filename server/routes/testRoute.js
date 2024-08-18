const express = require('express');
const { createTest, getTestById } = require('../controllers/testController');
const router = express.Router();

router.post('/create', createTest);
router.get('/:id', getTestById);


module.exports = router;
