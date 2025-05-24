import { useTimerConfig } from '@/context/TimerConfigContext'
import { useCallback } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export const TimerSet = () => {
    const { setTimeFocus, setTimeBreak , timeFocus, timeBreak} = useTimerConfig()

    const handleFocusChange = useCallback( (text: string) => {
        const value = parseInt(text,10)
        setTimeFocus(!isNaN(value) ? value : 0)
    }, [setTimeFocus])

    const handleBreakChange = useCallback((text: string) => {
        const value = parseInt(text,10)
        setTimeBreak(!isNaN(value) ? value : 0)
    }, [setTimeBreak])


  return (
    <View style={styles.container}>
      <View style={styles.focusTimer}>
        <Text style={{ fontWeight: 'bold', color: '#FFFDF6' }}>Focus Time (minutes)</Text>
        <TextInput keyboardType='numeric' onChangeText={handleFocusChange} placeholder='Enter focus time' style={styles.input} 
        defaultValue={String(timeFocus)}/>
        </View>
        <View style={styles.breakTimer}>
        <Text style={{ fontWeight: 'bold', color: '#FFFDF6' }}>Break Time (minutes)</Text>
        <TextInput keyboardType='numeric' onChangeText={handleBreakChange} placeholder='Enter break time' style={styles.input} 
        defaultValue={String(timeBreak)}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    position: 'absolute'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#FFFDF6',
    width: 100,
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    color: '#FF6363'
  },
  focusTimer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0DB9C',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  breakTimer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0DB9C',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
});



