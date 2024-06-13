import React, { useState } from 'react'
import { ImageProps } from 'expo-image/src/Image.types'
import { Pressable, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { ScreenWidth } from '@/shared/utils/utils'
import { Image } from '@/components/image/Image'
import clsx from 'clsx'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface CarouselImageProps {
  imgs: string[]
  height?: number
  imageProps?: ImageProps
  width?: number
}

export const CarouselImage: React.FC<CarouselImageProps> = (props) => {
  const { imgs, height = 540, imageProps, width = ScreenWidth } = props
  const imageLength = imgs.length
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <View className={'pb-4'}>
      <View
        className={
          'absolute right-2 top-2 z-[1] bg-black/50 rounded-full px-2 py-1'
        }
      >
        <Text className={'text-white text-xs'}>
          {activeIndex + 1}/{imageLength}
        </Text>
      </View>
      <View className={'bg-background'}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Carousel
            loop={false}
            width={width}
            height={height}
            // https://github.com/dohooo/react-native-reanimated-carousel/issues/125
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={imgs!}
            renderItem={({ item: uri }) => {
              return (
                <Pressable className={'flex-1'}>
                  <Image
                    className={'flex-1'}
                    source={{ uri }}
                    resizeMode={'contain'}
                    {...imageProps}
                  />
                </Pressable>
              )
            }}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </GestureHandlerRootView>
      </View>
      <View className={'flex-row justify-center space-x-1 pt-4'}>
        {imgs.map((_, index) => (
          <View
            key={index}
            className={clsx([
              'bg-quaternary-label w-[5px] h-[5px] rounded-full',
              {
                'bg-primary': activeIndex === index,
              },
            ])}
          ></View>
        ))}
      </View>
    </View>
  )
}
