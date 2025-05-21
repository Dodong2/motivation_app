// app/_layout.tsx
import { NotesProvider } from '@/context/NotesContext';
import { TimerConfigProvider } from '@/context/TimerConfigContext';
import { Stack } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  return (
  <>
  <NotesProvider>
  <TimerConfigProvider>
  <Stack screenOptions={{ headerShown: false }} />
    <Toast />
    </TimerConfigProvider>
    </NotesProvider>
  </>
  )
  
}
