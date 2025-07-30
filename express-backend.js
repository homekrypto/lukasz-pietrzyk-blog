const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Configure nodemailer for Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'spotkanie@lukaszpietrzyk.pl',
    pass: 'Szpitalna32$'
  }
});

app.post('/spotkanie', async (req, res) => {
  try {
    const { name, email, message, start, end } = req.body;
    if (!name || !email || !start || !end) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Send email to admin
    await transporter.sendMail({
      from: 'spotkanie@lukaszpietrzyk.pl',
      to: 'info@lukaszpietrzyk.pl',
      subject: 'Nowa prośba o rezerwację',
      text: `Nowa rezerwacja od ${name} (${email})\nPoczątek: ${start}\nKoniec: ${end}\nWiadomość: ${message || ''}`
    });
    // Send confirmation email to user
    await transporter.sendMail({
      from: 'spotkanie@lukaszpietrzyk.pl',
      to: email,
      subject: 'Potwierdzenie otrzymania rezerwacji',
      text: 'Dziękujemy za przesłanie prośby o rezerwację. Powiadomimy Cię, gdy zostanie zaakceptowana przez administratora.'
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express backend running on port ${PORT}`);
});
