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
  TextLayoutEventData,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as Linking from 'expo-linking'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'
import clsx from 'clsx'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import * as Clipboard from 'expo-clipboard'

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
  enableBodyCanExpanded?: boolean
}

const splitIntoLines = (text: string) => text.split('\n')

const splitByEmoji = (text: string) => text.split(emojiRegexp).filter(Boolean)

const splitByUrl = (text: string) => text.split(urlRegexp).filter(Boolean)

const mapToPart = (item: string) => {
  const emoji = EmojiList.find((emojiItem) => emojiItem.name === item)
  if (emoji) {
    return {
      type: TextType.Emoji,
      content: emoji.asset,
    }
  }

  if (item.startsWith('http')) {
    return {
      type: TextType.Url,
      content: item,
    }
  }

  return {
    type: TextType.Text,
    content: item,
  }
}

export const EmojiableText: React.FC<EmojiableTextProps> = (props) => {
  const {
    body,
    variant,
    textStyle,
    imageSize = 22,
    enableBodyCanExpanded = true,
  } = props

  const numberOfLines = useMemo(() => {
    return enableBodyCanExpanded ? props.numberOfLines : Infinity
  }, [props.numberOfLines, enableBodyCanExpanded])

  const [expanded, setExpanded] = useState(false)

  const bodyParts = useMemo(() => {
    const lines = splitIntoLines(body)
    let parts = lines.map((line) => {
      const emojiParts = splitByEmoji(line)
      return emojiParts
        .map((part) => {
          const urlParts = splitByUrl(part)
          return urlParts.map(mapToPart).flat()
        })
        .flat()
    })

    return parts
  }, [body, numberOfLines])

  const parts = useMemo(() => {
    let bodyPartsCopy = [...bodyParts]

    // if (numberOfLines !== undefined && !expanded) {
    //   bodyPartsCopy = bodyPartsCopy.slice(0, numberOfLines)
    //   const lastPart = [...bodyPartsCopy[bodyPartsCopy.length - 1]]
    //   lastPart.push({
    //     type: TextType.Text,
    //     content: '',
    //   })
    //   bodyPartsCopy[bodyPartsCopy.length - 1] = lastPart
    // }

    return bodyPartsCopy
  }, [numberOfLines, expanded, bodyParts])

  // # 计算实际显示的每行的高度
  //
  // ## 布局
  //
  // 每个 part 包含多个 item，每个 item 可以为 emoji 或 text。
  // lineHeights 记录每个 part 的每行的高度。每行可能包含多个类别的 item。
  // part 的 align-items: stretch 可以保证每行内 不同 item 的高度一致。
  //
  // ## 获取数据
  //
  // 通过 onLayout 事件获取组件的 Layout 数据。
  // 每一个 part 的 onLayout 事件触发时，计算每行的高度。
  // 如果 一个 item 的 x 为 0，我们认为是新的一行，记录该行的高度。
  // 子组件的 onLayout 事件应当在父组件的 onLayout 事件触发前触发。
  // （只有子组件的 Layout 计算完成后，父组件的 Layout 才能计算）
  //
  // ## 多行 Text:
  // 如果一个 Text Item 过长，其会自动换行。
  // 多行文本不会和 emoji 占据同一行。我们可以认为其始终为新的一行。
  // 通过 onLayout 事件获取到的 Layout 数据是多行文本整体的 高度。
  // 可以通过 onTextLayout 事件获取到多行文本的行数（和每行高度，这里我们认为每行的高度是一致的）。
  const lineHeights = useRef<{ height: number; line: number }[][]>(
    Array.from({ length: parts.length }, () => []),
  )

  const handleTextLayoutChange = (
    layout: TextLayoutEventData,
    i: number,
    j: number,
  ) => {
    // 假定 Text 每行的高度都是一样的
    const line = layout.lines.length
    if (!lineHeights.current[i][j]) {
      lineHeights.current[i][j] = { height: 0, line }
    } else {
      lineHeights.current[i][j].line = line
    }
  }

  const foldedHeight = useRef<number | null>(null)
  const [exceedHeight, setExceedHeight] = useState(false)
  const displayHeight = useSharedValue<number | null>(null)

  const animatedMaxHeight = useAnimatedStyle(() => {
    return {
      maxHeight: displayHeight.value ?? 65535,
    }
  })

  // 根据 numberOfLines 和 lineHeights 计算实际要显示的高度
  const calculateHeight = () => {
    if (
      !numberOfLines ||
      numberOfLines === Infinity ||
      !enableBodyCanExpanded
    ) {
      displayHeight.value = null
      return
    }
    if (exceedHeight) {
      // 已经计算过了
      return
    }
    let height = 0
    let line = 0
    // filter null value in 2 level
    const filtered = lineHeights.current.map((item) => item.filter(Boolean))
    for (let i = 0; i < filtered.length; i++) {
      for (let j = 0; j < filtered[i].length; j++) {
        if (!filtered[i][j]) {
          continue
        }
        const { line: curLines, height: curHeight } = filtered[i][j]
        for (let k = 0; k < curLines; k++) {
          height += curHeight / curLines
          line++
          if (line >= numberOfLines) {
            if (
              k === curLines - 1 &&
              j === filtered[i].length - 1 &&
              i === filtered.length - 1
            ) {
              // 最后一行，不需要折叠
              return
            }
            foldedHeight.current = height
            displayHeight.value = height
            setExceedHeight(true)
            return
          }
        }
      }
    }
  }

  const toggleExpand = useCallback(() => {
    setExpanded((expanded) => !expanded)
    if (expanded) {
      displayHeight.value = foldedHeight.current
    } else {
      displayHeight.value = null
    }
  }, [expanded])

  return (
    <View>
      <Animated.View className="overflow-hidden" style={[animatedMaxHeight]}>
        <View
          className="flex flex-row flex-wrap overflow-hidden"
          onLayout={() => calculateHeight()}
        >
          {parts.map((part, index) => (
            // items-stretch 保证每行内不同 item 的高度一致
            <View
              key={index}
              className="w-full flex flex-row flex-wrap items-stretch"
            >
              {part.map((item, i) => (
                <View
                  className="flex flex-row items-center"
                  onLayout={(e) => {
                    const { height, x } = e.nativeEvent.layout
                    // 如果 一个 item 的 x 为 0，我们则认为是新的一行，记录该行的高度。
                    if (x === 0) {
                      if (!lineHeights.current[index][i]) {
                        lineHeights.current[index][i] = { height, line: 1 }
                      } else {
                        lineHeights.current[index][i].height = height
                      }
                    } else {
                      // lineHeights.current[index][i] = undefined as any;
                      delete lineHeights.current[index][i]
                    }
                  }}
                >
                  {item.type === TextType.Emoji ? (
                    <Emoji asset={item.content} key={i} size={imageSize} />
                  ) : item.type === TextType.Url ? (
                    <Text
                      onPress={() =>
                        Alert.alert(
                          '确定要复制该链接吗？',
                          '',
                          [
                            {
                              text: '确定',
                              onPress: () => {
                                // copy to clipboard
                                Clipboard.setStringAsync(item.content)
                              },
                            },
                            {
                              text: '取消',
                            },
                          ],
                          {},
                        )
                      }
                      onTextLayout={(e) =>
                        handleTextLayoutChange(e.nativeEvent, index, i)
                      }
                      key={item.content}
                      style={[{ color: 'blue' }, textStyle]}
                    >
                      {item.content}
                    </Text>
                  ) : (
                    <Text
                      onTextLayout={(e) =>
                        handleTextLayoutChange(e.nativeEvent, index, i)
                      }
                      className={'text-black'}
                      key={item.content}
                      style={[textStyle, {}]}
                    >
                      {item.content}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Animated.View>
      {exceedHeight && (
        <TouchableOpacity className="py-2 pr-2" onPress={toggleExpand}>
          <Text className="text-textSecondary text-xs">
            {expanded ? '收起' : '展开'}
          </Text>
        </TouchableOpacity>
      )}
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
