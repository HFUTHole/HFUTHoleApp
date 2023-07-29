import { Pressable, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React, { useMemo, useState } from 'react'
import { AwaitAble, Func, InferArrayItem } from '@/shared/types'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { VotedIcon } from '@/components/icon'
import { useVoteItem } from '@/pages/hole/components/useVoteItem'

type Data = InferArrayItem<IHole['vote']['items']>

interface Props {
  data: Data
  hole: IHole
  onPress?: (item: Data, func: Func) => AwaitAble
}

// TODO 重构
export function HoleVoteItem({ data, onPress, hole }: Props) {
  const theme = useTheme()
  const [viewWidth, setViewWidth] = useState(0)
  const vote = hole.vote

  const { setData } = useVoteItem()

  const percent = useMemo(() => {
    const res = +(data.count / Math.max(vote.totalCount, data.count)).toFixed(2)

    if (Number.isNaN(res) || (!vote.isVoted && !vote.isExpired)) {
      return 0
    }

    return res
  }, [vote.isVoted, data])

  const width = useDerivedValue(() => {
    return viewWidth * percent
  }, [percent, viewWidth])

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, { duration: 1000 }),
      backgroundColor: theme.colors.primary,
    }
  })

  const onSuccess = () => {
    if (setData && !vote.isVoted && !vote.isExpired) {
      setData((prev) => {
        if (!prev!.pages) {
          const item = prev as unknown as IHoleDetailResponse
          if (item) {
            item.vote.isVoted = true
            item.vote.totalCount++
            const voteItem = item.vote.items.find(
              (voteItem) => voteItem.id === data.id
            )!
            voteItem.count++
            voteItem.isVoted = true
            return prev
          }
        }

        for (const page of prev!.pages) {
          const item = page.items.find((pageItem) => pageItem.id === hole.id)
          if (item) {
            item.vote.isVoted = true
            item.vote.totalCount++
            const voteItem = item.vote.items.find(
              (voteItem) => voteItem.id === data.id
            )!
            voteItem.count++
            voteItem.isVoted = true
            return prev
          }
        }

        return prev!
      })
    }
  }

  const handlePress = () => {
    onPress?.(data, onSuccess)
  }

  return (
    <View>
      <Pressable onPress={handlePress}>
        <View className={'w-full rounded-full overflow-hidden'}>
          <View
            key={data.id}
            className={
              'flex flex-row items-center justify-between border-[1px] p-3 rounded-full'
            }
            style={{
              borderColor: theme.colors.onBackground,
            }}
            onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
          >
            <Text>{data.option}</Text>
            <View className={'flex flex-row space-x-5'}>
              {vote.isExpired || vote.isVoted ? (
                <>
                  {data.isVoted ? <VotedIcon size={20} active={true} /> : <></>}
                  <Text>{(percent * 100).toFixed(0)}%</Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Animated.View
            className={'absolute rounded-full h-full opacity-30'}
            style={[progressStyle]}
          />
        </View>
      </Pressable>
    </View>
  )
}
