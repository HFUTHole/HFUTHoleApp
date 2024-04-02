import React from 'react'
import type { ImageProps } from 'expo-image'
import { Image as ExpoImage } from 'expo-image'
import clsx from 'clsx'

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <ExpoImage
      {...props}
      cachePolicy={'memory-disk'}
      className={clsx(['bg-onBackground rounded-lg', props.className])}
    />
  )
}
