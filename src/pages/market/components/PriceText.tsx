import React from 'react'
import { Text, TextProps } from 'react-native'
import clsx from 'clsx'

export const PriceText: React.FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      children={`¥${props.children}`}
      className={clsx('text-primary', props.className)}
    />
  )
}
