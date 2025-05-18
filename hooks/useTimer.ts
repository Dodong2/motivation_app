// hooks/useTimer.ts
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { useNotification } from './useNotification';

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

export const useTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            const nextPhase = isBreak ? 'Work' : 'Break';
            notify(`Time for ${nextPhase}`);
            setIsBreak(!isBreak);
            setSecondsLeft(isBreak ? WORK_DURATION : BREAK_DURATION);
            setIsRunning(false);
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

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
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