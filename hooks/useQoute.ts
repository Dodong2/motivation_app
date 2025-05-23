// hooks/useQuote.ts
import { playNotificationSound } from '@/utils/playSound';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

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
      showToast(newQuote)
    } catch (err) {
      console.error('Failed to fetch quote:', err);
      setError('Unable to fetch quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = (message: string) => {
    Toast.show({
      type: 'info',
      text1: 'Motivational Quote ✨',
      text2: message,
      visibilityTime: 6000, // 6 seconds
      autoHide: true,
    });
    playNotificationSound()
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 180000); // Every 3 minutes, for 5mins 300000
    return () => clearInterval(interval);
  }, [fetchQuote]);

  return { quote, loading, error, refresh: fetchQuote };
};
