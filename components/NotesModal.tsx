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
      <View style={styles.containerParent}>
        <View style={styles.containerChild}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFDF6' }}>Add a note</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            placeholderTextColor="#888"
            style={styles.titleContent}
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Enter content"
            placeholderTextColor="#888"
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

const styles = StyleSheet.create({
  containerParent: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 10, 
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  containerChild: {
    backgroundColor: '#B0DB9C', 
    padding: 20, 
    borderRadius: 8
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleContent: {
     marginBottom: 10, marginTop: 10, backgroundColor: '#FFFDF6', borderRadius: 10
  },
  TextContent: {
    backgroundColor: '#FFFDF6',
    height: 250, 
    textAlignVertical: 'top',
    marginBottom: 10, 
    padding: 8,
    borderRadius: 10
  }
})
