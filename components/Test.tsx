import * as Haptics from 'expo-haptics';
import { Button } from 'react-native';

export default function Test() {
  return (
    <Button
      title="Test Vibration"
      onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
    />
  );
}