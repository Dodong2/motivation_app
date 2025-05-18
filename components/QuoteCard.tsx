// components/QuoteCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type QuoteCardProps = {
  quote: string;
};

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.quoteText}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
