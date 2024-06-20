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
import { If, Then } from 'react-if'

interface Props {
  data: MessageAbleItem & {
    user?: IUser
    creator?: IUser
    isRead?: boolean
    target: InteractionNotifyTargetType
    type: NotifyEventType
  } & {
    usedGoods?: INotifyInteractionListItem['usedGoods']
  }
  onPress: Func
}

const TextType: React.FC<{ data: Props['data'] }> = ({ data }) => {
  return (
    <Text>
      {match(data.type)
        .with(NotifyEventType.like, () => {
          return (
            <Text className={'flex-row flex-wrap text-black/60 text-[14px]'}>
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
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.65)',
              }}
              body={
                data.body.replace(`${data.creator?.username} ` || '', '') || ''
              }
            />
          )
        })}
    </Text>
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
            <View className={'flex-row space-x-1 items-center'}>
              <Text className={'text-[16px]'}>{data.creator?.username}</Text>
              <View>
                <If
                  condition={
                    data.target === InteractionNotifyTargetType.usedGoods
                  }
                >
                  <Then>
                    <View
                      className={
                        'bg-[#efefef] rounded-sm py-[1px] px-1 justify-center'
                      }
                    >
                      <Text
                        className={'text-[10px] text-center text-primary-label'}
                      >
                        二手
                      </Text>
                    </View>
                  </Then>
                </If>
              </View>
            </View>
            <View className={'w-full flex-row flex-wrap space-x-1'}>
              <TextType data={data} />
            </View>
            <TimeText time={data.createAt} />
          </View>
        </View>
        <View className={'w-2/12 h-20 flex items-center'}>
          <If condition={!!data?.post}>
            <Then>
              <Image
                source={{
                  uri: data.post?.imgs?.[0] || data.creator?.avatar,
                }}
                className={'w-16 h-20 rounded-md'}
              />
            </Then>
          </If>

          <If condition={!!data.usedGoods}>
            <Then>
              {data.usedGoods?.imgs?.length ? (
                <Image
                  source={{
                    uri: data.usedGoods?.imgs?.[0],
                  }}
                  className={'w-16 h-20 rounded-md'}
                />
              ) : (
                <></>
              )}
            </Then>
          </If>
        </View>
      </View>
    </TouchableRipple>
  )
}
