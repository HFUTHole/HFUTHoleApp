import { useRef } from 'react'
import { FAB, FABProps, useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

export function ToTopFAB(props: Partial<FABProps>) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: theme.colors.primary,
      }}
      icon={'arrow-up'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`absolute bottom-5 right-3 rounded-full ${props.className}`}
    />
  )
}
