// hooks/useQuote.ts
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

const QUOTE_API = 'https://zenquotes.io/api/random';

interface ZenQuote {
  q: string; // Quote
  a: string; // Author
}

export const useQuote = () => {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(QUOTE_API);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: ZenQuote[] = await response.json();
      const newQuote = `${data[0]?.q} — ${data[0]?.a}`;
      setQuote(newQuote);
      await scheduleNotification(newQuote);
    } catch (err) {
      console.error('Failed to fetch quote:', err);
      setError('Unable to fetch quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleNotification = async (message: string) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Motivational Quote',
          body: message,
        },
        trigger: { seconds: 1 }, // Adjust trigger timing as needed
      });
    } catch (err) {
      console.warn('Notification scheduling failed:', err);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 300000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [fetchQuote]);

  return { quote, loading, error, refresh: fetchQuote };
};
