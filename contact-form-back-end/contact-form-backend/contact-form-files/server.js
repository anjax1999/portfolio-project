const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const winston = require('winston');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger using Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
  ],
});

logger.info('Starting server...');

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: "https://anjax1999.github.io", // Twój adres GitHub Pages
  methods: "GET,POST",
};
app.use(cors(corsOptions));

// SMTP Transporter
function createTransporter() {
  logger.debug('Creating SMTP transporter');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Test endpoint
app.get('/', (req, res) => {
  logger.info('GET / endpoint accessed');
  res.send('Welcome to the Contact Form Backend!');
});

// Contact form endpoint
app.post('/api/contactme', async (req, res) => {
  const { firstName, email, type, comment } = req.body;
  logger.info('POST /api/contactme request received', { firstName, email, type });

  if (!firstName || !email || !comment) {
    logger.warn('Validation failed: missing required fields', { firstName, email, comment });
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission - ${type}`,
      text: `
        Name: ${firstName}
        Email: ${email}
        Message: ${comment}
      `,
    };

    logger.debug('Sending email', { mailOptions });

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully', { response: info.response });
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    logger.error('Error sending email', { error: error.message });
    res.status(500).json({ message: `Failed to send message: ${error.message}` });
  }
});

// Start server
app.listen(PORT, () => { 
  logger.info(`Server is running on http://localhost:${PORT}`);
});

