import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { ScreenWidth } from '@/shared/utils/utils'
import { Image } from '@/components/image/Image'
import clsx from 'clsx'
import { ImageProps } from 'expo-image/src/Image.types'

interface HoleDetailImageCarouselProps {
  data: IHoleDetailResponse
  height?: number
  imageProps?: ImageProps
}

export const HoleDetailImageCarousel: React.FC<HoleDetailImageCarouselProps> = (
  props,
) => {
  const { data, height = 540, imageProps } = props
  const imageLength = data.imgs.length
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
        <Carousel
          loop={false}
          width={ScreenWidth}
          height={height}
          data={data.imgs!}
          renderItem={({ item: uri }) => {
            return (
              <Pressable className={'flex-1'}>
                <Image className={'flex-1'} source={{ uri }} {...imageProps} />
              </Pressable>
            )
          }}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      <View className={'flex-row justify-center space-x-1 pt-4'}>
        {data.imgs.map((_, index) => (
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
