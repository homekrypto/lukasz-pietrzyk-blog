import React from "react";
import { useBusyDates } from "../hooks/useBusyDates";

export function BusyDatesList() {
  const { busyDates, loading, error } = useBusyDates();

  if (loading) return <div>Loading busy dates...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!busyDates.length) return <div>No busy dates found.</div>;

  return (
    <div>
      <h2>Busy Dates</h2>
      <ul>
        {busyDates.map((date, i) => (
          <li key={i}>
            <strong>{date.summary || "Busy"}</strong>:<br />
            {date.start} – {date.end}
          </li>
        ))}
      </ul>
    </div>
  );
}
