const express = require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

// Configure nodemailer (replace with your SMTP credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your@email.com',
    pass: 'yourpassword'
  }
});

// Reservation endpoint
app.post('/spotkanie', async (req, res) => {
  try {
    const { name, email, start, end, message } = req.body;
    if (!name || !email || !start || !end) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Store reservation in Firestore
    const reservationRef = await admin.firestore().collection("reservations").add({
      name,
      email,
      start,
      end,
      message: message || "",
      created: new Date().toISOString(),
      status: "pending"
    });

    // Send email to admin for approval (Polish)
    await transporter.sendMail({
      from: 'your@email.com',
      to: 'info@lukaszpietrzyk.pl',
      subject: 'Nowa prośba o rezerwację',
      text: `Nowa rezerwacja od ${name} (${email})\nPoczątek: ${start}\nKoniec: ${end}\nWiadomość: ${message || ''}\nAkceptuj: https://twojadomena.pl/approve/${reservationRef.id}`
    });

    // Send confirmation email to user (Polish)
    await transporter.sendMail({
      from: 'your@email.com',
      to: email,
      subject: 'Potwierdzenie otrzymania rezerwacji',
      text: `Dziękujemy za przesłanie prośby o rezerwację. Powiadomimy Cię, gdy zostanie zaakceptowana przez administratora.`
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin approval endpoint
app.post('/approve/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservationRef = admin.firestore().collection('reservations').doc(reservationId);
    await reservationRef.update({ status: 'approved' });

    // Send approval email to user (Polish)
    const reservation = await reservationRef.get();
    const data = reservation.data();
    if (data && data.email) {
      await transporter.sendMail({
        from: 'your@email.com',
        to: data.email,
        subject: 'Rezerwacja zaakceptowana',
        text: `Twoja rezerwacja została zaakceptowana!\nPoczątek: ${data.start}\nKoniec: ${data.end}`
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Busy dates endpoint
app.get('/busyDates', async (req, res) => {
  try {
    const doc = await admin.firestore().collection('busyDates').doc('googleCalendar').get();
    if (!doc.exists) {
      return res.status(404).json({ busyDates: [] });
    }
    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const { onRequest } = require('firebase-functions/v2/https');

// Export /spotkanie endpoint as a Gen2 Firebase Function
exports.spotkanie = onRequest(app);
// Export /busyDates endpoint as a Gen2 Firebase Function
exports.busyDates = onRequest(app);
