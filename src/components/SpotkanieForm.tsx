import React, { useState } from "react";
import { createReservation } from "../api";

export function SpotkanieForm() {
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
    <form onSubmit={handleSubmit}>
      <h2>Rezerwacja spotkania</h2>
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
  );
}
