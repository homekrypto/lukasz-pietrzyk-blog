// Simple Node.js Express endpoint to add events to Google Calendar
const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO: Place your service account credentials JSON in this folder and set the path below
const SERVICE_ACCOUNT_FILE = './service-account.json';
const CALENDAR_ID = 'YOUR_CALENDAR_ID@group.calendar.google.com'; // Replace with your Google Calendar ID

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

app.post('/add-event', async (req, res) => {
  try {
    const { summary, description, start, end, email } = req.body;
    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone: 'Europe/Warsaw' },
      end: { dateTime: end, timeZone: 'Europe/Warsaw' },
      attendees: email ? [{ email }] : [],
    };
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });
    res.status(200).json({ success: true, eventId: response.data.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Google Calendar API server running on port ${PORT}`);
});
