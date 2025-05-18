import { TimerControls } from "@/components/TimerControls";
import { TimerDisplay } from "@/components/TimerDisplay";
import { useTimer } from "@/hooks/useTimer";
import { StyleSheet, Text, View } from "react-native";


export default function TimerScreen() {
    const {
        secondsLeft,
        isRunning,
        isBreak,
        startTimer,
        pauseTimer,
        resetTimer,
    } = useTimer()

    
    return (
        <View style={styles.container}>
            <Text>Timer</Text>
            <TimerDisplay secondsLeft={secondsLeft} isBreak={isBreak} />
            <TimerControls 
                isRunning={isRunning}
                start={startTimer}
                pause={pauseTimer}
                reset={resetTimer}
            />

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});