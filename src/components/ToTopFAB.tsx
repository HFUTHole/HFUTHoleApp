import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo'
import { useRef } from 'react'
import { FAB, FABProps, useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

interface ToTopFabProps {
  bgColor: string
}

export function ToTopFAB(props: Partial<FABProps> & ToTopFabProps) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: props.bgColor,
      }}
      icon={'arrow-up'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`absolute bottom-5 right-2 rounded-full ${props.className}`}
    />
  )
}
