import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface Props {
  to: string

  children: ReactNode

  size?: 'xs' | 'normal' | 'lg'
}

export const Link: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const handleNavigation = () => {
    navigation.navigate(props.to)
  }

  return (
    <Text
      className={`text-stress text-center font-bold ${
        props.size === 'xs' ? 'text-xs' : props.size === 'lg' ? 'text-lg' : ''
      }`}
      onPress={handleNavigation}
    >
      {props.children}
    </Text>
  )
}
