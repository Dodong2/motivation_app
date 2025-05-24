// components/TimerDisplay.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type TimerDisplayProps = {
  secondsLeft: number;
  isBreak: boolean;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  secondsLeft,
  isBreak,
}) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formatTime = (val: number) => val.toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isBreak ? (
          <>
            <View style={styles.ImageContainer}>
              <Text style={styles.BreakTime}>Focus Time</Text>
              <Image
                source={require("../assets/images/break.png")}
                style={styles.ImageStyle1}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.ImageContainer}>
              <Text style={styles.focusTime}>Focus Time</Text>
              <Image
                source={require("../assets/images/focus.png")}
                style={styles.ImageStyle2}
              />
            </View>
          </>
        )}
      </Text>
      <Text style={styles.timerText}>{`${formatTime(minutes)}:${formatTime(
        seconds
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    marginBottom: 8,
  },
  focusTime: {
    color: "#FFFDF6",
    fontSize: 20,
    fontWeight: 'bold',
  },
  BreakTime: {
    color: "#FF6363",
    fontSize: 20,
    fontWeight: 'bold',
  },
  timerText: {
    textAlign: "center",
    backgroundColor: "#FFFDF6",
    borderRadius: 10,
    width: 200,
    fontSize: 64,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    
  },
  /* Image */
  ImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageStyle1: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    position: 'absolute',
    top:-212
  },
  ImageStyle2: {
    width: 222,
    height: 222,
    resizeMode: "contain",
    borderRadius: 10,
    position: 'absolute',
    top:-210
  },
});
