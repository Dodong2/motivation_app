import { NotesModal } from '@/components/NotesModal';
import { QuoteCard } from '@/components/QuoteCard';
import { useNotes } from '@/context/NotesContext';
import { useQuote } from '@/hooks/useQoute';
import React, { useState } from 'react';

import { ActivityIndicator, Button, FlatList, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const {quote, loading, error, refresh: fetchQuote} = useQuote()
  const { notes, deleteNote } = useNotes()
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>      
      <RNStatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

      {loading ? (
        <ActivityIndicator size="large" color="#1e1e1e" />
      ) : (
        <QuoteCard quote={quote}/>
      )}

    <Text style={styles.historyTitle}>your Notes</Text>

    <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Button title="Delete" onPress={() => deleteNote(item.id)} />
          </View>
        )}
      />
      <Button title="Add Note" onPress={() => setModalVisible(true)} />
      <NotesModal visible={modalVisible} onClose={() => setModalVisible(false)} />

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
