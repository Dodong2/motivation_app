import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1e1e1e" />
      <Text>tabs ito tangina</Text>
    </View>
  );
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
