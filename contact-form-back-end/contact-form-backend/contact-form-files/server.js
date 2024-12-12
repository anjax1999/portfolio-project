const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config(); // Ładowanie zmiennych środowiskowych z .env

const app = express();
const PORT = process.env.PORT || 3000; // Port z pliku .env lub domyślnie 5000

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Konfiguracja CORS
const corsOptions = {
  origin: "https://anjax1999.github.io", // Twój adres GitHub Pages
  methods: "GET,POST",
};
app.use(cors(corsOptions));

// Ustawienie katalogu statycznego
app.use(express.static('contact-form-files')); // Obsługa plików statycznych z folderu contact-form-files

// Konfiguracja OAuth2

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Umożliwia generowanie refresh_token
    scope: ['https://www.googleapis.com/auth/gmail.send'], // Zakresy uprawnień
});

console.log("Odwiedź ten link, aby wygenerować refresh token:", url);

// Funkcja tworząca transporter Nodemailer
async function createTransporter() {
  try {
    console.log("Tworzenie dostawcy poczty...");
    const accessToken = await oauth2Client.getAccessToken();
    console.log("Access Token:", accessToken);

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER, // Twój e-mail z pliku .env
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error("Błąd podczas tworzenia dostawcy poczty:", error);
    throw error;
  }
}

// Endpoint GET dla '/' (opcjonalny, dla testów)
app.get('/', (req, res) => {
  res.send('Welcome to the Contact Form Backend!');
});

// Endpoint do obsługi formularza
app.post('/api/contactme', async (req, res) => {
  const { firstName, email, type, comment } = req.body;

  if (!firstName || !email || !comment) {
      return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
      console.log("Próba wysyłania e-maila...");
      const transporter = await createTransporter();

      const mailOptions = {
          from: email,
          to: process.env.EMAIL_USER, // E-mail odbiorcy
          subject: `Contact Form Submission - ${type}`,
          text: `
              Name: ${firstName}
              Email: ${email}
              Message: ${comment}
          `,
      };

      console.log("Opcje e-maila:", mailOptions);

      await transporter.sendMail(mailOptions);

      console.log("E-mail wysłany pomyślnie.");
      res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
      console.error("Błąd podczas wysyłania e-maila:", error);
      res.status(500).json({ message: 'Failed to send message.' });
  }
});

// Endpoint do testowania wysyłania e-maili
app.get('/test-email', async (req, res) => {
  try {
    const transporter = await createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Twój adres e-mail z pliku .env
      to: process.env.EMAIL_USER, // Adres testowy z pliku .env
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
