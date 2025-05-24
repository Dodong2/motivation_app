import { TimerControls } from "@/components/TimerControls";
import { TimerDisplay } from "@/components/TimerDisplay";
import { TimerSet } from "@/components/TimerSet";
import { useTimer } from "@/hooks/useTimer";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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
      <Text style={{ color: '#4E71FF', fontStyle: 'italic', fontSize: 20, fontWeight: 'bold', fontFamily: 'font1' }}>Promodoro Timer</Text>
      <TimerDisplay secondsLeft={secondsLeft} isBreak={isBreak} />
      <TimerControls
        isRunning={isRunning}
        start={startTimer}
        pause={pauseTimer}
        reset={resetTimer}
      />
      </View>
      {/* for time set */}
      <Button title={show ? 'close' : 'change time'} onPress={show ? closeTimeSet : showTimeSet}/>
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
  }
});
