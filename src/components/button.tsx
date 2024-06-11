import React, { ReactNode } from 'react'
import { Button as RNPButton, useTheme } from 'react-native-paper'
import { Props as ButtonProps } from 'react-native-paper/src/components/Button/Button'
import { GestureResponderEvent, View } from 'react-native'

type Props = {
  children?: ReactNode
  error?: boolean
} & ButtonProps

export const Button: React.FC<Props> = ({ children, error, ...props }) => {
  const theme = useTheme()

  const onPress = (e: GestureResponderEvent) => {
    if (!props.loading) {
      props?.onPress?.(e)
    }
  }

  return (
    <View>
      <RNPButton
        {...props}
        onPress={onPress}
        textColor={error ? theme.colors.error : ''}
      >
        {children}
      </RNPButton>
    </View>
  )
}
