const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
