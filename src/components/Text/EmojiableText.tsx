import { EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { Text } from 'react-native-paper'
import { StyleProp, TextStyle, View } from 'react-native'
import React, { useMemo } from 'react'
import * as Linking from 'expo-linking'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'
import clsx from 'clsx'

const urlRegexp = /(https?:\/\/[^\s]+)/g
const emojiRegexp = /(\[.*?\])/g
const MAX_CHARACTERS_FULL_WIDTH = 30
const MAX_CHARACTERS_HALF_WIDTH = MAX_CHARACTERS_FULL_WIDTH * 2
const EMOJI_WIDTH = 7

enum TextType {
  Emoji,
  Text,
  Url,
}

interface Props {
  body: string
  variant?: VariantProp<any>
  secondary?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
}

/**
 * @description 注意：重写了 numberOfLines 逻辑
 */
export function EmojiableText({
  body,
  variant,
  secondary,
  style,
  numberOfLines,
}: Props) {
  const parts = useMemo(() => {
    let parts = body
      .split('\n')
      .map<{ type: TextType; content: any }[]>((part) =>
        part
          .split(emojiRegexp)
          .filter((item) => !!item)
          .map((item) => {
            const emoji = EmojiList.find((emojiItem) => emojiItem.name === item)
            if (emoji) {
              return {
                type: TextType.Emoji,
                content: emoji.asset,
              }
            } else {
              return item
                .split(urlRegexp)
                .filter((item) => !!item)
                .map((item) => {
                  if (item.startsWith('http')) {
                    return {
                      type: TextType.Url,
                      content: item,
                    }
                  } else {
                    return {
                      type: TextType.Text,
                      content: item,
                    }
                  }
                })
            }
          })
          .flat(),
      )

    // 处理逻辑：太长的文本单独占用一行
    for (let i = 0; i < parts.length; i++) {
      let width = 0
      for (let j = 0; j < parts[i].length; j++) {
        const itemWidth =
          parts[i][j].type === TextType.Emoji
            ? EMOJI_WIDTH
            : calcWidth(parts[i][j].content)
        if (width + itemWidth > MAX_CHARACTERS_HALF_WIDTH) {
          if (parts[i].length !== 1) {
            const temp = parts[i]
            const mid = Math.max(1, j)
            parts[i] = temp.slice(0, mid)
            if (i < parts.length - 1) {
              parts.splice(i + 1, 0, temp.slice(mid))
            } else {
              parts.push(temp.slice(mid))
            }
          }
          break
        } else {
          width += itemWidth
        }
      }
    }

    if (numberOfLines !== undefined) {
      parts = parts.slice(0, numberOfLines)
      parts[parts.length - 1].push({
        type: TextType.Text,
        content: '...',
      })
    }
    return parts
  }, [body, numberOfLines])

  return (
    <View className={'flex flex-row flex-wrap'}>
      {parts.map((part, index) => (
        <View key={index} className="w-full flex flex-row">
          {part.map((item, i) => (
            <>
              {item.type === TextType.Emoji ? (
                <Emoji asset={item.content} key={i} size={22} />
              ) : item.type === TextType.Url ? (
                <Text
                  onPress={() => Linking.openURL(item.content)}
                  variant={variant || 'bodyLarge'}
                  key={item.content}
                  style={[style, { color: 'blue' }]}
                >
                  {item.content}
                </Text>
              ) : (
                <Text
                  className={'text-black/75'}
                  variant={variant || 'bodyLarge'}
                  key={item.content}
                  style={style}
                >
                  {item.content}
                </Text>
              )}
            </>
          ))}
        </View>
      ))}
    </View>
  )
}

// 检验字符是否为半角
function isHalfWidth(char: string) {
  // 半角字符编码范围：[\u0020-\u007E]
  return /^[\u0020-\u007E]$/.test(char)
}

function calcWidth(str: string) {
  return str.split('').reduce((acc, char) => {
    return acc + (isHalfWidth(char) ? 1 : 2)
  }, 0)
}
