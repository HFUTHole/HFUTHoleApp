import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import {
  HoleDetailCommentMode,
  HoleDetailCommentOrderMode,
} from '@/shared/enums'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { useCallback } from 'react'
import { MenuIcon } from '@/components/icon'
import { useHoleDetail } from '@/swr/hole'
import { SecondaryText } from '@/components/Text/SecondaryText'

export function HoleDetailCommentHeader() {
  const theme = useTheme()
  const { data } = useHoleDetail()

  const { mode, setMode, order, setOrder, isHotOrder } =
    useHoleDetailCommentContext()

  const isAllMode = mode === HoleDetailCommentMode.all

  const toggleMode = useCallback(
    (param: HoleDetailCommentMode) => {
      if (param === mode) {
        return
      }
      setMode(param)
    },
    [mode],
  )

  const toggleOrder = useCallback(() => {
    if (order === HoleDetailCommentOrderMode.favorite) {
      setOrder(HoleDetailCommentOrderMode.time)
    } else {
      setOrder(HoleDetailCommentOrderMode.favorite)
    }
  }, [order])

  return (
    <>
      <View className={'bg-white flex flex-row p-3 justify-between'}>
        <View className={'flex flex-row space-x-10'}>
          <Text
            className={`${isAllMode && 'font-bold'}`}
            style={{ color: isAllMode ? 'black' : theme.colors.surfaceVariant }}
            onPress={() => toggleMode(HoleDetailCommentMode.all)}
          >
            全部评论
          </Text>
          <Text
            className={`${!isAllMode && 'font-bold'}`}
            style={{
              color: !isAllMode ? 'black' : theme.colors.surfaceVariant,
            }}
            onPress={() => toggleMode(HoleDetailCommentMode.author)}
          >
            只看楼主
          </Text>
        </View>
        <Pressable onPress={toggleOrder}>
          <View className={'flex flex-row space-x-1 items-center'}>
            <MenuIcon size={16} />
            <Text style={{ color: theme.colors.surfaceVariant }}>
              按{isHotOrder ? '热度' : '时间'}
            </Text>
          </View>
        </Pressable>
      </View>
      {data!.commentCounts > 0 && (
        <View className={'px-3'}>
          <Text className={'text-xs text-tertiary-label'}>
            共有{data!.commentCounts}条评论
          </Text>
        </View>
      )}
    </>
  )
}
