const nodemailer = require('nodemailer');

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send an email
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;  // Re-throw the error to handle it where the function is called
    }
};

module.exports = sendEmail;
