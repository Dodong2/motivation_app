import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TimerControlsProps = {
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, start, pause, reset }) => {
  return (
    <View style={styles.controls}>
      <Pressable
        onPress={isRunning ? pause : start}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: isRunning ? '#FFA500' : '#4E71FF' }, // orange kapag pause, blue kapag start
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </Pressable>

      <View style={styles.spacer} />

      <Pressable
        onPress={reset}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: '#FF3B30' }, // red for reset
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
