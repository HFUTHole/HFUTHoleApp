import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { HolePostAddTags } from '@/pages/hole/post/tags'
import { useHolePostContext } from '@/shared/context/hole'
import { Toast } from '@/shared/utils/toast'
import { HolePostVote } from '@/pages/hole/post/votes'
import { IconButton } from '@/components/IconButton'
import { EmojiItem } from '@/assets/emoji'
import { EmojiIcon } from '@/components/icon'
import { Badges } from '@/components/Badges'
import { EmojiArea } from '@/components/emoji/EmojiArea'
import { HolePostBilibili } from '@/pages/hole/post/HolePostBilibili'
import { useImagePicker } from '@/shared/hooks/useImagePicker'
import { Categories } from '@/shared/constants/category'
import { useImmer } from 'use-immer'
import clsx from 'clsx'
import { App } from '@/shared/utils/App'
import { FormImage } from '@/components/form/FormImage'

const SelectTags: React.FC = () => {
  const { setTags: setRootTags } = useHolePostContext()
  const [tags, setTags] = useImmer(Categories.slice(1).map((item) => item.name))

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      className={'flex-row space-x-2 p-2'}
    >
      {tags.map((tag, index) => (
        <TouchableOpacity
          key={tag}
          onPress={() => {
            setTags((draft) => {
              setRootTags((prev) => prev.concat(tag))
              return draft.filter((item) => item !== tag)
            })
          }}
        >
          <View className={'bg-background py-2 px-2 rounded-full'}>
            <Text className={'text-xs text-tertiary-label'}>#{tag}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

// TODO @实现
export function BottomActions() {
  const {
    imgs,
    setImgs,
    tags,
    additionalTags,
    cursor,
    setCursor,
    setShouldUpdateCursor,
    form: { setValue, getValues },
  } = useHolePostContext()

  const { onImageSelect } = useImagePicker({
    onSuccess(result) {
      setImgs((draft) => {
        for (const assets of result.assets!) {
          if (draft!.length >= 4) {
            Toast.error({ text1: '最多只能选4张图片哦' })
            return
          }
          draft!.push(assets)
        }
      })
    },
    onError() {
      Toast.error({ text1: '图片选择失败' })
    },
  })

  const [expand, setExpand] = useState(false)

  const onEmojiSelect = useCallback(
    (emoji: EmojiItem) => {
      // setValue('body', `${getValues('body') || ''}${emoji.name}`)
      const body = getValues('body') || ''
      setValue(
        'body',
        `${body.slice(0, cursor.start)}${emoji.name}${body.slice(cursor.end)}`,
      )
      setCursor({
        start: cursor.start + emoji.name.length,
        end: cursor.start + emoji.name.length,
      })
      setShouldUpdateCursor(true)
    },
    [cursor],
  )

  const closeEmoji = () => {
    setExpand(false)
  }

  // 打开键盘时关闭emoji
  Keyboard.addListener('keyboardWillShow', closeEmoji)
  Keyboard.addListener('keyboardDidShow', closeEmoji)

  return (
    <View className={'pt-2 border-t-[1px] border-t-black/5'}>
      <View className={'px-2'}>
        <FormImage
          imgs={imgs}
          onCloseable={(index) =>
            setImgs((draft) => {
              draft!.splice(index, 1)
            })
          }
        />
        <View className={'mt-2'}>
          <Badges data={tags.concat(additionalTags)} />
          <SelectTags />
        </View>

        <View className={'flex flex-row justify-between items-center'}>
          <View className={'flex flex-row'}>
            <IconButton
              icon={() => <EmojiIcon />}
              onPress={() => {
                if (!expand) {
                  // 展开 emoji 时关闭键盘
                  Keyboard.dismiss()
                }
                setExpand((prev) => !prev)
              }}
            />
            <IconButton icon={'image'} onPress={onImageSelect} />
          </View>
          <View className={'flex flex-row'}>
            <HolePostBilibili />
            <HolePostAddTags />
            <HolePostVote />
          </View>
        </View>
      </View>
      <View
        className={clsx([
          {
            'min-h-[13vh]': App.isIOS,
          },
        ])}
      >
        <EmojiArea onEmojiSelect={onEmojiSelect} expandArea={expand} />
      </View>
    </View>
  )
}
