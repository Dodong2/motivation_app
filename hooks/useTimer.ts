import { useTimerConfig } from '@/context/TimerConfigContext';
import { playNotificationSound } from '@/utils/playSound';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

export const useTimer = () => {
  const { timeFocus, timeBreak } = useTimerConfig();

  const WORK_DURATION = timeFocus * 60;
  const BREAK_DURATION = timeBreak * 60;

  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const timerRef = useRef<number | null>(null);
  const notificationLoopRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
  }, [timeFocus, timeBreak, isBreak]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setTimerEnded(true);
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

  useEffect(() => {
    if (timerEnded) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({
        type: 'info',
        text1: isBreak ? 'Break done! Time to focus.' : 'Focus done! Time to break.',
      });
      // para 3 times mag-virbrate at mag-sound after ng focus & breaktime 
      let count = 0;
      notificationLoopRef.current = setInterval(async () => {
        if (count < 3) {
          await Promise.all([
            playNotificationSound(),
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          ])
          count++;
        } else {
          clearInterval(notificationLoopRef.current!);
          notificationLoopRef.current = null;
        }
      }, 1000); // every 1.5 seconds

      setIsBreak((prev) => !prev);
      setTimerEnded(false);
    }
  }, [timerEnded]);

  const startTimer = () => {
    setIsRunning(true);
    Toast.show({ type: 'success', text1: 'Timer started' });

    // Stop notification sound if it's still playing
    if (notificationLoopRef.current) {
      clearInterval(notificationLoopRef.current);
      notificationLoopRef.current = null;
    }
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

  return {
    secondsLeft,
    isRunning,
    isBreak,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
