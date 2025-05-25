// components/QuoteCard.tsx
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

type QuoteCardProps = {
  quote: string;
};

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(quote);
    Toast.show({
      type: 'success',
      text1: 'Copied successfully ✨',
      text2: 'Quote copied to clipboard',
      visibilityTime: 3000,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.quoteText}>{quote}</Text>
      <Pressable style={styles.copyButton} onPress={handleCopy}>
        <Text style={styles.copyButtonText}>Copy</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    elevation: 5,
    alignItems: 'center',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
