import React from 'react'
import { Func } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { Pressable, View } from 'react-native'
import { Image } from 'expo-image'
import { useUserProfile } from '@/swr/user/profile'

export const ImageListItem = React.memo(
  ({
    img,
    i,
    open,
    setIndex,
  }: {
    img: string
    i: number
    length: number
    open: Func
    setIndex: Func
  }) => {
    const theme = useTheme()

    const { data } = useUserProfile()

    return (
      <Pressable
        onPress={() => {
          setIndex(i)
          open()
        }}
        className={'w-[95%] h-28'}
      >
        <Image
          source={{
            uri: img,
          }}
          className={'rounded-lg flex-1 h-fit bg-background'}
          resizeMode={'cover'}
        />
      </Pressable>
    )
  },
)
