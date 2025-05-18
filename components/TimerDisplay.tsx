// components/TimerDisplay.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TimerDisplayProps = {
  secondsLeft: number;
  isBreak: boolean;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ secondsLeft, isBreak }) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isBreak ? 'Break Time' : 'Focus Time'}</Text>
      <Text style={styles.timerText}>{`${formatTime(minutes)}:${formatTime(seconds)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    color: '#888',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
});
