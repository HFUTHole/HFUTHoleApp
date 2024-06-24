import React from 'react'

import { ImageProps } from 'expo-image/src/Image.types'
import { CarouselImage } from '@/components/image/CarouselImage'

interface HoleDetailImageCarouselProps {
  data: IHoleDetailResponse
  height?: number
  imageProps?: ImageProps
}

export const HoleDetailImageCarousel: React.FC<HoleDetailImageCarouselProps> = (
  props,
) => {
  return <CarouselImage imgs={props.data.imgs} height={props.height} />
}
