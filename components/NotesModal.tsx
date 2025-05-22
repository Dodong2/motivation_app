import { useNotes } from '@/context/NotesContext';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const NotesModal = ({ visible, onClose }: Props) => {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    addNote(title, content);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
          <Text>Add a note</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Enter content"
            multiline
            style={styles.TextContent}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create( {
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  TextContent: {
    borderWidth: 1, height: 100, textAlignVertical: 'top', marginBottom: 10, padding: 8,
    borderRadius: 10
  }
})
