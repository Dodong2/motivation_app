import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/learn.png')}
        style={styles.image}
      />
      <Text style={styles.introText1}>Welcome to StudySprint!</Text>
      <Text style={styles.introText2}>
        Stay focused with the Pomodoro timer and take notes while you study.
      </Text>

      {/* Replacing Button with Pressable */}
      <Pressable style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Let’s get started!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    borderRadius: 10
  },
  introText1: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#73946B'
  },
  introText2: {
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 10,
    color: '#73946B'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#B0DB9C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
