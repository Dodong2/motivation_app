import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TimeDisplayProps = {
  minutes: number;
  seconds: number;
  mode: "focus" | "break" | "longBreak";
};

const TimerDisplay = ({ minutes, seconds, mode }: TimeDisplayProps) => {
  /* Logics */

  //format ng time para 2 digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // color background base sa mode
  const getBackgroundColor = () => {
    switch (mode) {
      case "focus":
        return "#FF5757";
      case "break":
        return "#57B757";
      case "longBreak":
        return "#5757FF";
      default:
        return "#FF5757";
    }
  };

  return (
  <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
    <Text style={styles.timerText}>
        {formattedMinutes}: {formattedSeconds}
    </Text>
    <Text style={styles.modeText}>
        {mode === 'focus' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
    </Text>
    </View>

  )
};

// styles css
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
    width: 300,
    height: 300,
    marginVertical: 30,
  },
  timerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  modeText: {
    fontSize: 24,
    color: "white",
    marginTop: 10,
  },
});

export default TimerDisplay;
