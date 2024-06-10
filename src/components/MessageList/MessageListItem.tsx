import { Func } from '@/shared/types'
import { Image, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { UnreadPointer } from '@/components/UnreadPointer'
import { UserAvatar } from '@/components/UserAvatar'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { TimeText } from '@/components/Text/Time'
import { MessageAbleItem } from '@/shared/hooks/useNavigateToMessageTarget'
import { InteractionNotifyTargetType } from '@/shared/enums/notify.enum'
import { NotifyEventType } from '@/shared/enums'
import clsx from 'clsx'
import { match } from 'ts-pattern'
import React from 'react'

interface Props {
  data: MessageAbleItem & {
    user?: IUser
    creator?: IUser
    isRead?: boolean
    target: InteractionNotifyTargetType
    type: NotifyEventType
  }
  onPress: Func
}

const TextType: React.FC<{ data: Props['data'] }> = ({ data }) => {
  return (
    <View>
      {match(data.type)
        .with(NotifyEventType.like, () => {
          return (
            <Text className={'flex-row flex-wrap text-primary-label text-md'}>
              {`赞了你的${match(data.target)
                .with(InteractionNotifyTargetType.reply, () => '回复')
                .with(InteractionNotifyTargetType.comment, () => '评论')
                .with(InteractionNotifyTargetType.post, () => '帖子')
                .exhaustive()}`}
            </Text>
          )
        })
        .otherwise(() => {
          return (
            <EmojiableText
              textStyle={{
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.75)',
              }}
              body={
                data.body.replace(`${data.creator?.username} ` || '', '') || ''
              }
            />
          )
        })}
    </View>
  )
}

export function MessageListItem({ data, onPress }: Props) {
  const user = data.creator || data.user
  const isUnRead = data.isRead === false

  return (
    <TouchableRipple onPress={onPress}>
      <View
        className={clsx([
          'p-2 justify-between flex-row',
          {
            'bg-gray-200/20': isUnRead,
          },
        ])}
      >
        <View className={'w-10/12 flex-row space-x-2 items-center flex-1'}>
          <View className={'flex-row space-x-1 items-center'}>
            <View className={'w-2'}>{isUnRead && <UnreadPointer />}</View>
            <View>
              <UserAvatar url={user?.avatar} mode={'lg'} />
            </View>
          </View>
          <View className={'flex-1 space-y-1'}>
            <Text className={'text-sm'}>{data.creator?.username}</Text>
            <View className={'w-full flex-row flex-wrap space-x-1'}>
              <TextType data={data} />
              <TimeText time={data.createAt} />
            </View>
          </View>
        </View>
        <View className={'w-2/12 h-20 flex items-center'}>
          {data.post?.imgs?.length ? (
            <Image
              source={{
                uri: data.creator?.avatar,
              }}
              className={'w-16 h-20 rounded-md'}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableRipple>
  )
}
