import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useNotification = () => {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const notify = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'StudySprint',
        body: message,
      },
      trigger: null, // immediately
    });
  };

  return { notify };
};