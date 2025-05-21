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
    <View>
        <Text>Focus Time (minutes)</Text>
        <TextInput keyboardType='numeric' onChangeText={handleFocusChange} placeholder='Enter focus time' style={styles.input} 
        defaultValue={String(timeFocus)}/>
        <Text>Break Time (minutes)</Text>
        <TextInput keyboardType='numeric' onChangeText={handleBreakChange} placeholder='Enter break time' style={styles.input} 
        defaultValue={String(timeBreak)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: 100,
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
  },
});



