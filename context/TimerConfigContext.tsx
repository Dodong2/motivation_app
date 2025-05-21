import { createContext, ReactNode, useContext, useState } from 'react'

type TimerConfigContextType = {
    timeFocus: number
    timeBreak: number
    setTimeFocus: (value: number) => void
    setTimeBreak: (value: number) => void
}

const TimerConfigContext = createContext<TimerConfigContextType | undefined>(undefined)

export const TimerConfigProvider= ({ children } : {children: ReactNode}) => {
    const [timeFocus, setTimeFocus] = useState(30)
    const [timeBreak, setTimeBreak] = useState(5)
  return (
    <TimerConfigContext.Provider value={{ timeFocus, timeBreak, setTimeBreak, setTimeFocus }}>
        {children}
    </TimerConfigContext.Provider>
  )
}

export const useTimerConfig = () => {
    const context = useContext(TimerConfigContext)
    if(!context) throw new Error('useTimerConfig must be used within TimerConfigProvider')
        return context
}