import { EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { Text } from 'react-native-paper'
import { StyleProp, TextStyle, View } from 'react-native'
import React from 'react'
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types'

interface Props {
  body: string
  variant?: VariantProp<any>
  secondary?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

export function EmojiableText({
  body,
  variant,
  secondary,
  style,
  numberOfLines,
  ...rest
}: Props) {
  const renderBody = () => {
    const reg = /(\[.*?\])/g
    const parts = body.split(reg)

    return parts.map((part, index) => {
      const emoji = EmojiList.find((item) => item.name === part)

      if (emoji) {
        return <Emoji asset={emoji.asset} key={index} size={22} />
      } else {
        return (
          <Text
            className={`${secondary && 'text-surfaceVariant'}`}
            variant={variant || 'bodyLarge'}
            key={index}
            style={style}
            numberOfLines={numberOfLines}
          >
            {part}
          </Text>
        )
      }
    })
  }

  return (
    <>
      <View className={'flex flex-row flex-wrap'}>{renderBody()}</View>
    </>
  )
}
