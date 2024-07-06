/* 
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('./models/contact.modekl');

// POST route to handle contact form submission
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate inputs (basic example)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Set up nodemailer transporter (example using Gmail SMTP)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'your-email@example.com', // Change to your contact email
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

module.exports = router;
 */