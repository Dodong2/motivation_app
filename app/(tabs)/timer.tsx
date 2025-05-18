import { StyleSheet, Text, View } from "react-native";

export default function TimerScreen() {
    return (
        <View style={styles.container}>
            <Text>Timer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 35,
  },
  textDesign: {
    textAlign: "center",
    color: "white",
  }
});