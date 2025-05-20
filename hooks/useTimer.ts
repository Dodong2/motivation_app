import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

const WORK_DURATION = 1 * 60;
const BREAK_DURATION = 1 * 60;

export const useTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false); // ✅ new flag
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setTimerEnded(true); // ✅ Set flag instead of showing Toast directly
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // ✅ Show toast and reset timer AFTER state is updated
  useEffect(() => {
    if (timerEnded) {
      Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
      Toast.show({
        type: 'info',
        text1: isBreak ? 'Break done! Time to focus.' : 'Focus done! Time to break.',
      });

      setIsBreak((prev) => !prev);
      setSecondsLeft(isBreak ? WORK_DURATION : BREAK_DURATION);
      savePomodoroHistory();
      setTimerEnded(false);
    }
  }, [timerEnded]);

  const startTimer = () => {
    setIsRunning(true);
    Toast.show({ type: 'success', text1: 'Timer started' });
  };

  const pauseTimer = () => {
    setIsRunning(false);
    Toast.show({ type: 'info', text1: 'Timer paused' });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
    Toast.show({ type: 'info', text1: 'Timer reset' });
  };

  const savePomodoroHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('pomodoroHistory');
      const history = stored ? JSON.parse(stored) : [];
      const updated = [...history, { timestamp: Date.now() }];
      await AsyncStorage.setItem('pomodoroHistory', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save pomodoro history:', err);
    }
  };

  return {
    secondsLeft,
    isRunning,
    isBreak,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
