import { TimerControls } from "@/components/TimerControls";
import { TimerDisplay } from "@/components/TimerDisplay";
import { TimerSet } from "@/components/TimerSet";
import { useTimer } from "@/hooks/useTimer";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TimerScreen() {
  const [show, isShow] = useState(false)

  const showTimeSet = () => {
    isShow(true)
  }
  const closeTimeSet = () => {
    isShow(false)
  }

  const {
    secondsLeft,
    isRunning,
    isBreak,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer();

  return (
    <View style={styles.containerParent}>
      {/* timer */}
      <View style={styles.containerChild}>
      <Text style={{ color: '#4E71FF', fontStyle: 'italic', fontSize: 20, fontWeight: 'bold' }}>Pomodoro Timer</Text>
      <TimerDisplay secondsLeft={secondsLeft} isBreak={isBreak} />
      <TimerControls
        isRunning={isRunning}
        start={startTimer}
        pause={pauseTimer}
        reset={resetTimer}
      />
      </View>
      {/* for time set */}
      <Pressable
        onPress={show ? closeTimeSet : showTimeSet}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: show ? '#FF3B30' : '#4E71FF' }, // red kapag "close", blue kapag "change time"
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.text}>{show ? 'Close' : 'Change Time'}</Text>
      </Pressable>
      {show && <TimerSet/>}

    </View>
  );
}

const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerChild: {
    width: 300,
    // height: 300,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#B0DB9C',
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    marginTop: 100
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
