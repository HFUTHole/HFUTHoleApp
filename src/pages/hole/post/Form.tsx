import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

import { getQAQFont, ScreenHeight, WindowHeight } from '@/shared/utils/utils'
import { NativeInput } from '@/components/form/NativeInput'
import { View } from 'react-native'
import { FormImage } from '@/components/form/FormImage'
import { useHolePostContext } from '@/shared/context/hole'
import { useTheme } from 'react-native-paper'
import React, { useCallback, useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export function HolePostForm() {
  const {
    imgs,
    setImgs,
    form: { control },
  } = useHolePostContext()

  return (
    <View className={'space-y-2 py-2 min-h-[50vh]'}>
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
        <NativeInput
          name={'body'}
          control={control}
          multiline={true}
          placeholder={'说点什么吧...'}
          style={{
            height: ScreenHeight * 0.5,
            flex: 1,
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
