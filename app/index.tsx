import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Welcome to the App!</Text>
      <Button title="Get Started" onPress={() => router.replace('/(tabs)')} />
    </View>
  );
}
