import React, { useState } from "react";
import { createReservation, fetchBusyDates } from "../api";

export default function SpotkanieFullPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    start: "",
    end: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busyDates, setBusyDates] = useState<any[]>([]);
  const [busyLoading, setBusyLoading] = useState(true);

  React.useEffect(() => {
    async function loadBusyDates() {
      setBusyLoading(true);
      try {
        const data = await fetchBusyDates();
        setBusyDates(data.busyDates || []);
      } catch (err) {
        setBusyDates([]);
      } finally {
        setBusyLoading(false);
      }
    }
    loadBusyDates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = await createReservation(form);
      if (!data.success) throw new Error(data.error || "Reservation failed");
      setSuccess(true);
      setForm({ name: "", email: "", start: "", end: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1>Rezerwacja spotkania</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Imię i nazwisko" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" />
        <input name="start" value={form.start} onChange={handleChange} placeholder="Data i godzina rozpoczęcia" required type="datetime-local" />
        <input name="end" value={form.end} onChange={handleChange} placeholder="Data i godzina zakończenia" required type="datetime-local" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Wiadomość (opcjonalnie)" />
        <button type="submit" disabled={loading}>Wyślij</button>
        {loading && <div>Wysyłanie...</div>}
        {error && <div style={{color: 'red'}}>Błąd: {error}</div>}
        {success && <div style={{color: 'green'}}>Rezerwacja wysłana!</div>}
      </form>
      <hr style={{margin: '2em 0'}} />
      <h2>Terminy zajęte</h2>
      {busyLoading ? (
        <div>Ładowanie zajętych terminów...</div>
      ) : busyDates.length === 0 ? (
        <div>Brak zajętych terminów.</div>
      ) : (
        <ul>
          {busyDates.map((date, i) => (
            <li key={i}>
              <strong>{date.summary || "Zajęte"}</strong>:<br />
              {date.start} – {date.end}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
