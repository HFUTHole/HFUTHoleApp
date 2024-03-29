import { View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function Badge(props: Props) {
  return (
    <>
      <View
        className={'bg-error w-5 h-5 items-center rounded-full justify-center'}
      >
        <Text variant={'bodySmall'} className={'text-white'}>
          {props.children}
        </Text>
      </View>
    </>
  )
}
