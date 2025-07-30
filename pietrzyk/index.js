const express = require("express");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
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
    // Store reservation in Firestore
    const reservationRef = await admin.firestore().collection("reservations").add({
      name,
      email,
      start,
      end,
      message: message || "",
      created: new Date().toISOString(),
      status: "pending",
    });

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
        `${reservationRef.id}`,
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
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Admin approval endpoint
app.post("/approve/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservationRef = admin.firestore().collection("reservations").doc(reservationId);
    await reservationRef.update({status: "approved"});

    // Send approval email to user (Polish)
    const reservation = await reservationRef.get();
    const data = reservation.data();
    if (data && data.email) {
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

// Busy dates endpoint
app.get("/busyDates", async (req, res) => {
  try {
    const doc = await admin.firestore().collection("busyDates").doc("googleCalendar").get();
    if (!doc.exists) {
      return res.status(404).json({busyDates: []});
    }
    // Send busy dates response
    const busyDatesData = doc.data();
    // Send busy dates response (split into multiple lines)
    res.json(busyDatesData);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Export endpoints as Gen2 Firebase Functions
const {onRequest} = require("firebase-functions/v2/https");
exports.spotkanie = onRequest(app);
exports.busyDates = onRequest(app);
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
// Removed unused variable 'logger' to fix lint error

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
git init
git remote add origin https://github.com/homekrypto/pietrzyk-backend
git add .
git commit -m "Initial backend commit"
