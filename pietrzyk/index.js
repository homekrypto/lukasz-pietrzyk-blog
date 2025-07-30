const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

// In-memory reservation store
const reservations = {};

// Configure nodemailer (replace with your SMTP credentials)
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "spotkanie@lukaszpietrzyk.pl",
    pass: "Szpitalna32$",
  },
});

// Reservation endpoint
app.post("/spotkanie", async (req, res) => {
  try {
    const {name, email, start, end, message} = req.body;
    if (!name || !email || !start || !end) {
      return res.status(400).json({error: "Missing required fields"});
    }
    // Generate a simple reservation ID
    const reservationId = Math.random().toString(36).substr(2, 9);
    reservations[reservationId] = {
      name,
      email,
      start,
      end,
      message: message || "",
      created: new Date().toISOString(),
      status: "pending",
    };

    // Send email to admin for approval (Polish)
    await transporter.sendMail({
      from: "your@email.com",
      to: "info@lukaszpietrzyk.pl",
      subject: "Nowa prośba o rezerwację",
      text:
        `Nowa rezerwacja od ${name} (${email})\n` +
        `Początek: ${start}\n` +
        `Koniec: ${end}\n` +
        `Wiadomość: ${message || ""}\n` +
        `Akceptuj: https://twojadomena.pl/approve/` +
        `${reservationId}`,
    });

    // Send confirmation email to user (Polish)
    await transporter.sendMail({
      from: "your@email.com",
      to: email,
      subject: "Potwierdzenie otrzymania rezerwacji",
      text:
        "Dziękujemy za przesłanie prośby o rezerwację. " +
        "Powiadomimy Cię, " +
        "gdy zostanie zaakceptowana " +
        "przez administratora.",
    });

    // Send success response
    res.json({
      success: true,
      reservationId,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Admin approval endpoint
app.post("/approve/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;
    const data = reservations[reservationId];
    if (!data) {
      return res.status(404).json({error: "Reservation not found"});
    }
    data.status = "approved";

    // Send approval email to user (Polish)
    if (data.email) {
      await transporter.sendMail({
        from: "your@email.com",
        to: data.email,
        subject: "Rezerwacja zaakceptowana",
        text:
          `Twoja rezerwacja została zaakceptowana!\n` +
          `Początek: ${data.start}\n` +
          `Koniec: ${data.end}`,
      });
    }
    // Send success response
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Busy dates endpoint (returns all approved reservations)
app.get("/busyDates", (req, res) => {
  try {
    const busyDates = Object.values(reservations)
      .filter(r => r.status === "approved")
      .map(r => ({start: r.start, end: r.end}));
    res.json({busyDates});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Export Express app for Vercel
module.exports = app;
