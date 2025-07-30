// Google Calendar and Firestore integration for scheduled function
const {google} = require('googleapis');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Google Calendar API setup
const calendar = google.calendar('v3');

async function syncBusyDates() {
  // Replace with your Google service account credentials and calendarId
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  const authClient = await auth.getClient();
  const calendarId = 'primary'; // or your specific calendar ID

  // Fetch busy events from Google Calendar
  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const events = await calendar.events.list({
    calendarId,
    timeMin: now.toISOString(),
    timeMax: nextMonth.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    auth: authClient,
  });

  // Store busy dates in Firestore
  const busyDates = events.data.items.map(event => ({
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
    summary: event.summary,
  }));
  await db.collection('busyDates').doc('googleCalendar').set({
    updated: new Date().toISOString(),
    busyDates,
  });
  return busyDates;
}

module.exports = { syncBusyDates };
