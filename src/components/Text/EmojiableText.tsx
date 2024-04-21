import { EmojiList } from '@/assets/emoji'
import { Emoji } from '@/components/emoji/Emoji'
import { Text } from 'react-native-paper'
import {
  StyleProp,
  TextStyle,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
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

interface EmojiableTextProps {
  body: string
  variant?: VariantProp<any>
  secondary?: boolean
  textStyle?: StyleProp<TextStyle>
  numberOfLines?: number
  imageSize?: number
  fontSize?: number
}

/**
 * @description 注意：重写了 numberOfLines 逻辑
 */
export const EmojiableText: React.FC<EmojiableTextProps> = (props) => {
  const { body, variant, textStyle, numberOfLines, imageSize = 22 } = props
  const [expanded, setExpanded] = useState(false)
  const bodyParts = useMemo(() => {
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

    return parts
  }, [body, numberOfLines])

  const parts = useMemo(() => {
    let bodyPartsCopy = [...bodyParts]

    if (numberOfLines !== undefined && !expanded) {
      bodyPartsCopy = bodyPartsCopy.slice(0, numberOfLines)
      const lastPart = [...bodyPartsCopy[bodyPartsCopy.length - 1]]
      lastPart.push({
        type: TextType.Text,
        content: '...',
      })
      bodyPartsCopy[bodyPartsCopy.length - 1] = lastPart
    }

    return bodyPartsCopy
  }, [numberOfLines, expanded, bodyParts])

  const toggleExpand = useCallback(() => {
    setExpanded((expanded) => !expanded)
  }, [])

  return (
    <View>
      <View className="flex flex-row flex-wrap">
        {parts.map((part, index) => (
          <View
            key={index}
            className="w-full flex flex-row
"
          >
            {part.map((item, i) => (
              <>
                {item.type === TextType.Emoji ? (
                  <Emoji asset={item.content} key={i} size={imageSize} />
                ) : item.type === TextType.Url ? (
                  <Text
                    onPress={() =>
                      Alert.alert(
                        '确定要打开该链接吗？可能有危险哦',
                        '即将前往浏览器打开该链接，请注意甄别链接！如有问题请举报',
                        [
                          {
                            text: '确定',
                            onPress: () => {
                              Linking.openURL(item.content)
                            },
                          },
                          {
                            text: '取消',
                          },
                        ],
                        {},
                      )
                    }
                    key={item.content}
                    style={[{ color: 'blue' }, textStyle]}
                  >
                    {item.content}
                  </Text>
                ) : (
                  <Text
                    className={'text-black'}
                    key={item.content}
                    style={textStyle}
                  >
                    {item.content}
                  </Text>
                )}
              </>
            ))}
          </View>
        ))}
        {numberOfLines !== undefined && bodyParts.length > numberOfLines && (
          <TouchableOpacity className="py-2 pr-2" onPress={toggleExpand}>
            <Text className="text-textSecondary text-xs">
              {expanded ? '收起' : '展开'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
