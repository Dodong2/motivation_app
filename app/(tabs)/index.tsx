import { QuoteCard } from '@/components/QuoteCard';
import { useQuote } from '@/hooks/useQoute';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';


type promodoroHistory = {
  timestamp: number
}

export default function HomeScreen() {
  const {quote, loading, error, refresh: fetchQuote} = useQuote()
  const [history, setHistory] = useState<promodoroHistory[]>([])

    // Load history from AsyncStorage on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('pomodoroHistory');
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>      
      <RNStatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

      {loading ? (
        <ActivityIndicator size="large" color="#1e1e1e" />
      ) : (
        <QuoteCard quote={quote}/>
      )}

    <Text style={styles.historyTitle}>Today's Pomodoros</Text>

    <FlatList data={history} keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <Text style={styles.historyItem}>
        {new Date(item.timestamp).toLocaleDateString()}
      </Text>
    )}
    ListFooterComponent={<Text style={styles.empty}>No sessions yet.</Text>}
    />
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: '#444',
  },
  historyItem: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
