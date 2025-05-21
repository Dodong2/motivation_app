import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

type Note = {
  id: number;
  content: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (text: string) => void;
  deleteNote: (id: number) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const STORAGE_KEY = 'notes-storage';

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setNotes(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load notes:', err);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (err) {
        console.error('Failed to save notes:', err);
      }
    };
    saveNotes();
  }, [notes]);

  const addNote = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newNote = { id: Date.now(), content: text.trim() };
    setNotes((prev) => [...prev, newNote]);
  }, []);

  const deleteNote = useCallback((id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  // Optional reminder
  useEffect(() => {
    const interval = setInterval(() => {
      if (notes.length > 0) {
        Toast.show({
          type: 'info',
          text1: 'Reminder 📝',
          text2: 'Don’t forget your notes!',
        });
      }
    }, 180000); // 3 mins
    return () => clearInterval(interval);
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
};
