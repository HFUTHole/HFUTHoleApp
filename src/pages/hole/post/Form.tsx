import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

import { getQAQFont, ScreenHeight, WindowHeight } from '@/shared/utils/utils'
import {
  NativeHighlightInput,
  NativeInput,
} from '@/components/form/NativeInput'
import { View } from 'react-native'
import { FormImage } from '@/components/form/FormImage'
import { useHolePostContext } from '@/shared/context/hole'
import { useTheme } from 'react-native-paper'
import React, { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export function HolePostForm() {
  const {
    imgs,
    setImgs,
    cursor,
    shouldUpdateCursor,
    setShouldUpdateCursor,
    setCursor,
    additionalTags,
    setAdditionalTags,
    form: { control },
  } = useHolePostContext()

  const updateTags = useCallback(
    (body: string) => {
      const reg = /(?<= |^)(#[^#\s]+)(?= |$)/gm
      const matchedAllIterator = Array.from(body.matchAll(reg))
      const newTags = matchedAllIterator.map((matched) => matched[1].slice(1))
      setAdditionalTags(Array.from(new Set(newTags))
        .filter((item) => item.length > 1))
    },
    [additionalTags, setAdditionalTags],
  )

  return (
    <View className={'space-y-2 py-2 flex-1  min-h-[50vh]'}>
      <View className={'border-b-[1px] border-b-black/5'}>
        <NativeInput
          name={'title'}
          control={control}
          placeholder={`写个标题吧(没有标题也可以发布哦)~${getQAQFont(
            'happy',
          )}`}
          style={{
            paddingVertical: 10,
            fontSize: 18,
          }}
        />
      </View>
      <View className={'flex-1'}>
        <NativeHighlightInput
          name={'body'}
          highlightRules={[
            {
              match:
                /((ftp|http|https):\/\/)(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
              style: {
                color: 'rgb(0, 122, 255)',
                textDecorationLine: 'underline',
              },
            },
            {
              match: /(\[\/\S+\])/gm,
              style: { color: '#14532d' },
            },
            {
              match: /(?<= |^)(#[^#\s]+)(?= |$)/gm,
              style: { color: '#054D7E' },
            },
          ]}
          control={control}
          multiline={true}
          placeholder={'说点什么吧...'}
          textAlignVertical="top"
          // REVIEW: NOTE: FIXME:
          // 2024-05-25
          // 改用 NativeHighlightInput 后，似乎在插入 emoji 后能正确跳转光标
          // 但在 选择文本后，再插入 emoji 时，光标跳转位置不正确
          // 如果使用 NativeHighlightInput 并使用 selection 参数，会导致在插入 emoji 后，清空文本框
          // 考虑到 选择替换 的行为较少，暂时不使用 selection 参数
          // ![TextInput with controled selection clear children when change position](
          //    https://github.com/facebook/react-native/issues/41966
          //  )
          // PR #24096 https://github.com/facebook/react-native/pull/42096
          // PR #41980 https://github.com/facebook/react-native/pull/41980
          // 似乎是修复了这个问题，但是在六个月后还没有被合并 🫤
          // selection={shouldUpdateCursor ? cursor : undefined}
          onSelectionChange={(e) => {
            if (shouldUpdateCursor) {
              setShouldUpdateCursor(false)
            } else {
              setCursor(e.nativeEvent.selection)
            }
          }}
          style={{
            height: ScreenHeight * 0.5,
            flex: 1,
          }}
          onChange={(event) => {
            updateTags(event.nativeEvent.text)
          }}
        />
      </View>
      <View>
        <FormImage
          imgs={imgs}
          onCloseable={(index) =>
            setImgs((draft) => {
              draft!.splice(index, 1)
            })
          }
        />
      </View>
    </View>
  )
}
