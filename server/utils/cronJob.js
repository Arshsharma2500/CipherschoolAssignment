const cron = require('node-cron');
const axios = require('axios');

cron.schedule('0 * * * *', async () => {
    console.log('Running cron job to evaluate submissions and send results');
    try {
        await axios.post(`${process.env.BASE_URL}/api/send-results`);
        console.log('Emails sent successfully');
    } catch (error) {
        console.log('Error sending emails:', error);
    }
});
