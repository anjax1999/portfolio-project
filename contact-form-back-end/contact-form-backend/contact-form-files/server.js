const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Wczytaj plik JSON z danymi klienta OAuth2
const CREDENTIALS_PATH = path.join(__dirname, 'client-secret.json'); // Ścieżka do Twojego pliku JSON
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

// Konfiguracja OAuth2
const oauth2Client = new google.auth.OAuth2(
  credentials.web.client_id, // Client ID z pliku JSON
  credentials.web.client_secret, // Client Secret z pliku JSON
  credentials.web.redirect_uris[0] // Redirect URI z pliku JSON
);

// Ustaw token odświeżania (uzyskany wcześniej z OAuth Playground)
oauth2Client.setCredentials({
  refresh_token: '1//048kDW2FLW65pCgYIARAAGAQSNwF-L9IrKUkzScKn17mbcR1BomZdnU0lJaLD12kajUfyjCsofJIJhx5Di6yavoPonCDrM5o6oR4', // Wstaw tutaj swój Refresh Token
});

path
// Funkcja tworząca transporter Nodemailer
async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'anjax1999@gmail.com', // Twój adres e-mail
      clientId: credentials.installed.client_id,
      clientSecret: credentials.installed.client_secret,
      refreshToken: '1//048kDW2FLW65pCgYIARAAGAQSNwF-L9IrKUkzScKn17mbcR1BomZdnU0lJaLD12kajUfyjCsofJIJhx5Di6yavoPonCDrM5o6oR4', // Wstaw Refresh Token
      accessToken: accessToken.token,
    },
  });
}

// Endpoint GET dla '/' (opcjonalny, dla testów)
app.get('/', (req, res) => {
  res.send('Welcome to the Contact Form Backend!');
});

// Endpoint do obsługi formularza
app.post('/contactme', async (req, res) => {
  const { firstName, email, type, comment } = req.body;

  if (!firstName || !email || !comment) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: email,
      to: 'anjax1999@gmail.com', // Twój e-mail odbiorcy
      subject: `Contact Form Submission - ${type}`,
      text: `
        Name: ${firstName}
        Email: ${email}
        Message: ${comment}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

// Endpoint do testowania wysyłania e-maili
app.get('/test-email', async (req, res) => {
  try {
    const transporter = await createTransporter();

    await transporter.sendMail({
      from: 'anjax1999@gmail.com', // Twój adres e-mail
      to: 'anjax1999@gmail.com', // Adres testowy
      subject: 'Test email',
      text: 'This is a test email sent from the backend using OAuth2!',
    });

    res.status(200).send('Test email sent successfully!');
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send('Failed to send test email.');
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
