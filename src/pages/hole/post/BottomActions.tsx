import {
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
import { PostCategorySelector } from '@/pages/hole/post/PostCategorySelector'
import { useImagePicker } from '@/shared/hooks/useImagePicker'
import { Categories } from '@/shared/constants/category'
import { useImmer } from 'use-immer'

const SelectTags: React.FC = () => {
  const { setTags: setRootTags } = useHolePostContext()
  const [tags, setTags] = useImmer(Categories.map((item) => item.name))

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
    setImgs,
    tags,
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

  const onEmojiSelect = useCallback((emoji: EmojiItem) => {
    setValue('body', `${getValues('body') || ''}${emoji.name}`)
  }, [])

  return (
    <View className={'pt-2 border-t-[1px] border-t-black/5'}>
      <View className={'px-2'}>
        <Badges data={tags} />
        <SelectTags />

        <View className={'flex flex-row justify-between items-center'}>
          <View className={'flex flex-row'}>
            <IconButton
              icon={() => <EmojiIcon />}
              onPress={() => setExpand((prev) => !prev)}
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

      <View className={'min-h-[120px]'}>
        <EmojiArea onEmojiSelect={onEmojiSelect} expandArea={expand} />
      </View>
    </View>
  )
}
