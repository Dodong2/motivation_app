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
    <View style={styles.container}>
      <Button title={show ? 'close' : 'change time'} onPress={show ? closeTimeSet : showTimeSet}/>
      {show && <TimerSet/>}
      
      <Text>Timer</Text>
      <TimerDisplay secondsLeft={secondsLeft} isBreak={isBreak} />
      <TimerControls
        isRunning={isRunning}
        start={startTimer}
        pause={pauseTimer}
        reset={resetTimer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
