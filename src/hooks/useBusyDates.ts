import { useEffect, useState } from "react";

export function useBusyDates() {
  const [busyDates, setBusyDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusyDates() {
      try {
        setLoading(true);
        const response = await fetch("/busyDates");
        if (!response.ok) throw new Error("Failed to fetch busy dates");
        const data = await response.json();
        setBusyDates(data.busyDates || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBusyDates();
  }, []);

  return { busyDates, loading, error };
}
