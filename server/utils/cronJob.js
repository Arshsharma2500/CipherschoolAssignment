const cron = require('node-cron');
const { evaluateSubmissions } = require('../controllers/submissionController');

cron.schedule('0 * * * *', () => {
    console.log('Running cron job to evaluate submissions');
    evaluateSubmissions();
});