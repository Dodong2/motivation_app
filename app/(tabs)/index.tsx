import { QuoteCard } from '@/components/QuoteCard';
import { useQuote } from '@/hooks/useQoute';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const {quote, loading, error, refresh: fetchQuote} = useQuote()
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1e1e1e" />
      {loading ? (
        <ActivityIndicator size="large" color="#1e1e1e" />
      ) : (
        <QuoteCard quote={quote}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});
