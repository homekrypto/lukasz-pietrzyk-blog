const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  "https://lxxywsyotabtdquemzuo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4eHl3c3lvdGFidGRxdWVtenVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg4NzEwMiwiZXhwIjoyMDY5NDYzMTAyfQ.q_eRxL5r7m_nSVQ2neR6tdz6E5yh80Z7mo3O5pHwvdc"
);

// Configure nodemailer (Hostinger SMTP)
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
    const { name, email, start, end, message } = req.body;
    if (!name || !email || !start || !end) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Store reservation in Supabase
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name,
          email,
          start,
          end,
          message: message || "",
          created: new Date().toISOString(),
          status: "pending",
        },
      ])
      .select();
    if (error) throw error;
    const reservationId = data[0]?.id;

    // Send email to admin for approval (Polish)
    await transporter.sendMail({
      from: "spotkanie@lukaszpietrzyk.pl",
      to: "info@lukaszpietrzyk.pl",
      subject: "Nowa prośba o rezerwację",
      text:
        `Nowa rezerwacja od ${name} (${email})\n` +
        `Początek: ${start}\n` +
        `Koniec: ${end}\n` +
        `Wiadomość: ${message || ""}\n` +
        `Akceptuj: https://twojadomena.pl/approve/${reservationId}`,
    });

    // Send confirmation email to user (Polish)
    await transporter.sendMail({
      from: "spotkanie@lukaszpietrzyk.pl",
      to: email,
      subject: "Potwierdzenie otrzymania rezerwacji",
      text:
        "Dziękujemy za przesłanie prośby o rezerwację. " +
        "Powiadomimy Cię, " +
        "gdy zostanie zaakceptowana " +
        "przez administratora.",
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin approval endpoint
app.post("/approve/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;
    // Update reservation status in Supabase
    const { error: updateError } = await supabase
      .from("reservations")
      .update({ status: "approved" })
      .eq("id", reservationId);
    if (updateError) throw updateError;

    // Get reservation data
    const { data, error } = await supabase
      .from("reservations")
      .select()
      .eq("id", reservationId);
    if (error) throw error;
    const reservation = data[0];

    // Send approval email to user (Polish)
    if (reservation && reservation.email) {
      await transporter.sendMail({
        from: "spotkanie@lukaszpietrzyk.pl",
        to: reservation.email,
        subject: "Rezerwacja zaakceptowana",
        text:
          `Twoja rezerwacja została zaakceptowana!\n` +
          `Początek: ${reservation.start}\n` +
          `Koniec: ${reservation.end}`,
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Busy dates endpoint
app.get("/busyDates", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("busyDates")
      .select()
      .eq("id", "googleCalendar");
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ busyDates: [] });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
