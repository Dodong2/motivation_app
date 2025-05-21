import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type TimerControlsProps = {
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, start, pause, reset }) => {
  return (
    <View style={styles.controls}>
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? pause : start} />
      <View style={styles.spacer} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
  spacer: {
    width: 10,
  },
});
