import React, { ReactNode, useState } from 'react'
import { Func, IClassName, InferArrayItem } from '@/shared/types'
import { View, StyleSheet } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { CommentIcon, LikeIcon } from '@/components/icon'
import { Badges } from '@/components/Badges'
import { TimeText } from '@/components/Text/Time'
import { ImageList } from '@/components/image/ImageList'
import { useMutation } from 'react-query'
import { PostHoleVoteRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { HoleVoteItem } from '@/pages/hole/components/VoteItem'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { EmojiableText } from '@/components/Text/EmojiableText'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { Svg } from '@/components/svg/Svg'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { sliceHoleInfoCommentBody } from '@/pages/hole/components/utils'
import { Categories } from '../Category'
import { HoleBottomAction } from './sheet/HoleBottomAction'

type Data = IHole

type VoteItem = InferArrayItem<Data['vote']['items']>

const HoleInfoVote: React.FC<{ data: Data }> = ({ data }) => {
  const [onSuccess, setOnSuccess] = useState<Func>()

  const mutation = useMutation({
    mutationKey: [data.vote.id, data.vote.isVoted],
    mutationFn: (ids: string[]) =>
      PostHoleVoteRequest({
        id: data.vote.id,
        ids,
      }),
    onSuccess() {
      Toast.success({
        text1: '投票成功',
      })
      // onSuccess?.()
    },
  })

  const onVotePress = (item: VoteItem, func: Func) => {
    if (data.vote.isVoted) {
      return
    }

    if (data.vote.type === 'single') {
      mutation.mutate([item.id])
    }

    setOnSuccess(func)
  }

  return (
    <View>
      <View className={'grid space-y-2'}>
        {data.vote.items.map((item) => (
          <View key={item.id}>
            <HoleVoteItem
              data={item}
              hole={data}
              onPress={(item, func) => onVotePress(item, func)}
            />
          </View>
        ))}
        {data.vote.isVoted && (
          <View className={'flex flex-row justify-end w-full'}>
            <SecondaryText>
              一共有{data.vote.totalCount}人参与投票
            </SecondaryText>
          </View>
        )}
      </View>
    </View>
  )
}

export const HoleInfoHeader: React.FC<{ data: Data }> = ({ data }) => {
  const theme = useTheme()

  const renderList = [
    {
      value: data.favoriteCounts,
      element: <LikeIcon size={14} color={theme.colors.surfaceVariant} />,
    },
    {
      value: data.commentCounts,
      element: <CommentIcon size={14} color={theme.colors.surfaceVariant} />,
    },
  ]

  return (
    <>
      <View className={'my-1 space-y-1'}>
        <View className={'flex flex-row justify-between'}>
          <View className={'flex flex-row items-center space-x-2'}>
            <UserAvatar url={data.user.avatar} size={35} />
            <View>
              <Text
                className={'mb-0.5 text-sm'}
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {data.user.username}
              </Text>
              <TimeText time={data.createAt} />
            </View>
          </View>

          <View className={'flex flex-row justify-end space-x-5'}>
            <View className={'flex flex-row space-x-2 items-center'}>
              {data.bilibili && (
                <View>
                  <Svg SvgComponent={BilibiliSvg} size={20} />
                </View>
              )}
              <View>
                <SecondaryText style={{ color: theme.colors.surfaceVariant }}>
                  #{data.id}
                </SecondaryText>
              </View>
            </View>

            <View className={'flex flex-row space-x-3'}>
              {renderList.map((icon, index) => (
                <View
                  className={'flex flex-row items-center space-x-2'}
                  key={index}
                >
                  {icon.element}
                  <Text
                    className={'text-xs'}
                    style={{ color: theme.colors.surfaceVariant }}
                  >
                    {icon.value}
                  </Text>
                </View>
              ))}
            </View>
            <HoleBottomAction data={data as IHoleDetailResponse} />
          </View>
        </View>
      </View>
    </>
  )
}

export const HoleInfoTitle: React.FC<{ data: Data }> = ({ data }) => {
  const classification = Categories.find(
    (item) => item.name === data.classification?.name
  )

  return (
    <View className={'flex space-y-2'}>
      <View className={'flex-row space-x-2 items-center'}>
        <View
          className={'py-1 px-2 rounded-lg'}
          style={{ backgroundColor: classification?.color.secondary }}
        >
          <Text
            className={'font-bold'}
            style={{ color: classification?.color.primary }}
          >
            {data.classification?.name}
          </Text>
        </View>
        <Text
          className={'font-bold'}
          style={{ color: classification?.color.primary }}
        >
          {data.subClassification?.name}
        </Text>
      </View>
      {data.title && <Text className={'font-bold'}>{data?.title}</Text>}
    </View>
  )
}

export const HoleInfoBody: React.FC<{ data: Data }> = ({ data }) => {
  const theme = useTheme()

  const { goResult } = useHoleSearchRoute()

  return (
    <View className={'flex space-y-2'}>
      <View>
        <HoleInfoTitle data={data} />
      </View>
      <View>
        <EmojiableText
          body={data.body}
          variant={'bodyMedium'}
          numberOfLines={3}
          style={{ color: theme.colors.surfaceVariant, lineHeight: 25 }}
        />
      </View>
      {data.imgs.length && (
        <View>
          <ImageList imgs={data?.imgs.slice(0, 3)} />
        </View>
      )}
      {data.tags.length && (
        <View>
          <Badges data={data.tags} onPress={(tag) => goResult(`#${tag}`)} />
        </View>
      )}
    </View>
  )
}

interface Props extends IClassName {
  data: Data
  onPress?: Func
  header?: ReactNode
  body?: ReactNode
  showComment?: boolean
  categoryMode?: 'category' | 'subcategory' | undefined
}

export const HoleInfo = ({
  data,
  onPress,
  header,
  body,
  className,
  showComment = true,
}: Props) => {
  const theme = useTheme()

  return (
    <View className={'bg-white rounded-2xl mt-4 overflow-hidden'}>
      <TouchableRipple onPress={onPress}>
        <View className={`flex-col space-y-3 px-4 py-2 ${className}`}>
          <View>{header || <HoleInfoHeader data={data} />}</View>
          <View>{body || <HoleInfoBody data={data} />}</View>
          <View>{data.vote && <HoleInfoVote data={data} />}</View>
          {showComment && data.comments?.length > 0 && (
            <>
              <View className={'border-b-[1px] border-black/10'}></View>
              <View className={'grid'}>
                {data.comments?.length > 0 &&
                  data.comments.map((comment) => (
                    <View
                      className={
                        'flex flex-row space-x-2 items-center py-2 justify-between'
                      }
                      key={comment.id}
                    >
                      <Text
                        className={'font-bold self-start max-w-[30%]'}
                        variant={'bodyMedium'}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {comment.user.username}
                      </Text>
                      <View className={'flex-1'}>
                        <EmojiableText
                          body={sliceHoleInfoCommentBody(comment.body)}
                          variant={'bodyMedium'}
                          style={{ color: theme.colors.surfaceVariant }}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            </>
          )}
        </View>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    lineHeight: 28,
    transform: [{ translateY: -7 }],
  },
  categoryText: {
    fontSize: 18,
  },
})
