import React, { ReactNode, useState } from 'react'
import { Func, IClassName, InferArrayItem } from '@/shared/types'
import { View } from 'react-native'
import { UserAvatar } from '@/components/UserAvatar'
import { Button, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { CommentIcon, LikeIcon } from '@/components/icon'
import { Badges } from '@/components/Badges'
import { TimeText } from '@/components/Text/Time'
import { ImageList } from '@/components/image/ImageList'
import { useMutation } from 'react-query'
import { PostHoleVoteRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { HoleVoteItem } from '@/pages/hole/components/VoteItem'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { HoleBottomAction } from '@/pages/hole/components/sheet/HoleBottomAction'
import { EmojiableText } from '@/components/Text/EmojiableText'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { Svg } from '@/components/svg/Svg'
import { useHoleSearchRoute } from '@/shared/hooks/route/useHoleSearchRoute'
import { sliceHoleInfoCommentBody } from '@/pages/hole/components/utils'
import { PrimaryText } from '@/components/Text/PrimaryText'

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
  return (
    <>
      <View className={'space-y-2'}>
        <View className={'flex flex-row justify-between'}>
          <View className={'flex flex-row items-center space-x-3'}>
            <UserAvatar url={data.user.avatar} size={40} />

            <View className={'grid space-y-1'}>
              <Text>{data.user.username}</Text>
              <TimeText time={data.createAt} />
            </View>
          </View>
          <View>
            <HoleBottomAction data={data as IHoleDetailResponse} />
          </View>
        </View>
      </View>
    </>
  )
}

export const HoleInfoBody: React.FC<{ data: Data }> = React.memo(({ data }) => {
  const { goResult } = useHoleSearchRoute()

  return (
    <View className={'flex space-y-2'}>
      <View>
        <EmojiableText body={data.body} variant={'bodyMedium'} />
      </View>
      {data.imgs.length && (
        <View>
          <ImageList imgs={data?.imgs} />
        </View>
      )}
      {data.tags.length && (
        <View>
          <Badges data={data.tags} onPress={(tag) => goResult(`#${tag}`)} />
        </View>
      )}
    </View>
  )
})

const HoleInfoBottom: React.FC<{ data: Data }> = React.memo(({ data }) => {
  const theme = useTheme()

  const renderList = [
    {
      value: data.favoriteCounts,
      element: <LikeIcon size={16} color={theme.colors.surfaceVariant} />,
    },
    {
      value: data.commentCounts,
      element: <CommentIcon size={16} color={theme.colors.surfaceVariant} />,
    },
  ]

  return (
    <View className={'flex flex-row justify-between'}>
      <View className={'flex flex-row space-x-3'}>
        {renderList.map((icon, index) => (
          <View className={'flex flex-row items-center space-x-2'} key={index}>
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
      <View className={'flex flex-row space-x-2 items-center'}>
        {data.bilibili && (
          <View>
            <Svg SvgComponent={BilibiliSvg} size={20} />
          </View>
        )}
        <Button mode={'text'}>{data?.category?.category}</Button>
        <View>
          <PrimaryText style={{ fontWeight: 'bold' }}>#{data.id}</PrimaryText>
        </View>
      </View>
    </View>
  )
})

interface Props extends IClassName {
  data: Data
  onPress?: Func
  header?: ReactNode
  body?: ReactNode
  bottom?: ReactNode
  showComment?: boolean
}

export const HoleInfo = React.memo(
  ({
    data,
    onPress,
    header,
    body,
    bottom,
    className,
    showComment = true,
  }: Props) => {
    return (
      <View className={'bg-white rounded-lg mt-2 overflow-hidden'}>
        <TouchableRipple onPress={onPress}>
          <View className={`flex flex-col space-y-3 p-4 ${className}`}>
            <View>{header || <HoleInfoHeader data={data} />}</View>
            <View>{body || <HoleInfoBody data={data} />}</View>
            <View>{data.vote && <HoleInfoVote data={data} />}</View>
            <View>{bottom || <HoleInfoBottom data={data} />}</View>
            {showComment && (
              <View className={'grid gap-2'}>
                {data.comments?.length > 0 &&
                  data.comments.map((comment) => (
                    <View
                      className={
                        'flex flex-row space-x-2 items-center py-3 border-b-[1px] border-black/10 justify-between'
                      }
                      key={comment.id}
                    >
                      <Text
                        className={'font-bold self-start max-w-[30%]'}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                      >
                        {comment.user.username}
                      </Text>
                      <View className={'flex-1'}>
                        <EmojiableText
                          body={sliceHoleInfoCommentBody(comment.body)}
                          variant={'bodyMedium'}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            )}
          </View>
        </TouchableRipple>
      </View>
    )
  }
)
