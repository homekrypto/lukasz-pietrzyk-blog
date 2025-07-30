import React from "react";
import { SpotkanieForm } from "../components/SpotkanieForm";
import { BusyDatesList } from "../components/BusyDatesList";

export default function SpotkaniePage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1>Rezerwacja spotkania</h1>
      <SpotkanieForm />
      <hr style={{margin: '2em 0'}} />
      <BusyDatesList />
    </div>
  );
}
