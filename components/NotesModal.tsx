import { useNotes } from '@/context/NotesContext';
import React, { useState } from 'react';
import { Button, Modal, Text, TextInput, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const NotesModal = ({ visible, onClose }: Props) => {
  const { addNote } = useNotes();
  const [text, setText] = useState('');

  const handleSave = () => {
    addNote(text);
    setText('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View>
        <Text>Add a note</Text>
        <TextInput value={text} onChangeText={setText} placeholder="Enter note" />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};
