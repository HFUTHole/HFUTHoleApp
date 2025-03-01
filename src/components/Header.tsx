import { Pressable, TouchableOpacity, View } from 'react-native'
import { AngleLeftIcon, ArrowLeftIcon } from '@/components/icon'
import { IconButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'

interface Props extends NativeStackHeaderProps {}

export const Header = (props: Props) => {
  const navigation = useNavigation()

  return <BackHeader title={props.options.title} />
}

export const BackHeaderBackButton = () => {
  const navigation = useNavigation()

  return (
    <IconButton
      onPress={() => navigation.goBack()}
      icon={() => <ArrowLeftIcon size={25} color={'#000'} />}
    />
  )
}

export const BackHeader = (props: {
  title?: string
  rightChild?: React.ReactNode
}) => {
  return (
    <View className={'bg-white flex-row flex justify-between'}>
      <View className={'flex-1'}>
        <BackHeaderBackButton />
      </View>
      <View className={'flex-[2] justify-center'}>
        <Text className={'text-center'} variant={'titleMedium'}>
          {props.title}
        </Text>
      </View>
      <View className={'flex-1 items-end justify-center'}>
        {props.rightChild}
      </View>
    </View>
  )
}
