import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import React from 'react'
import { Func } from '@/shared/types'

interface Props {
  onPress: Func
  text: string
}

export function BeautifulButton(props: Props) {
  return (
    <View className={'rounded-lg overflow-hidden bg-[#232b35]'}>
      <TouchableRipple onPress={props.onPress}>
        <View className={'p-4'}>
          <Text className={'text-center text-white font-[800]'}>
            {props.text}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  )
}
