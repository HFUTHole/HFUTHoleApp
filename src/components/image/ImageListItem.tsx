import React from 'react'
import { Func } from '@/shared/types'
import { useTheme } from 'react-native-paper'
import { Image } from '@/components/image/Image'
import { Pressable } from 'react-native'

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
          className={'rounded-lg w-28 h-28'}
          style={{
            resizeMode: 'cover',
          }}
        />
      </Pressable>
    )
  },
)
