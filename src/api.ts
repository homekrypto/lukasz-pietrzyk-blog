// API client for fetching busy dates from Firestore
export async function fetchBusyDates() {
  const response = await fetch('https://us-central1-lukaszpietrzyk-72409.cloudfunctions.net/busyDates');
  if (!response.ok) throw new Error('Failed to fetch busy dates');
  return await response.json();
}

export async function createReservation(data: {
  name: string;
  email: string;
  start: string;
  end: string;
  message?: string;
}) {
  const response = await fetch('https://us-central1-lukaszpietrzyk-72409.cloudfunctions.net/spotkanie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
