// utils/playSound.ts
import { Audio } from 'expo-av';

export const playNotificationSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Gunner.mp3') // ✅ Correct relative path
    );

    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.warn('Failed to play sound:', error);
  }
};
