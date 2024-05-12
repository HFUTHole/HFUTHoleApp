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
        <View className={'w-10/12 flex-row space-x-4 items-center flex-1'}>
          <View className={'flex-row space-x-1 items-center'}>
            <View className={'w-2'}>{isUnRead && <UnreadPointer />}</View>
            <View>
              <UserAvatar url={user?.avatar} mode={'lg'} />
            </View>
          </View>
          <View className={'flex-1 flex-wrap'}>
            <Text className={'text-lg'}>{user?.username}</Text>
            <View className={'space-y-1'}>
              <View className={''}>
                {match(data.type)
                  .with(NotifyEventType.like, () => {
                    return (
                      <Text className={'flex-row flex-wrap text-textPrimary'}>
                        {`赞了你的${match(data.target)
                          .with(InteractionNotifyTargetType.reply, () => '回复')
                          .with(
                            InteractionNotifyTargetType.comment,
                            () => '评论',
                          )
                          .with(InteractionNotifyTargetType.post, () => '帖子')
                          .exhaustive()}`}
                      </Text>
                    )
                  })
                  .otherwise(() => {
                    return <EmojiableText body={data.body || ''} />
                  })}
              </View>

              <View>
                <TimeText time={data.createAt} />
              </View>
            </View>
          </View>
        </View>
        <View className={'w-2/12 h-20 flex items-center'}>
          {data.post?.imgs?.length ? (
            <Image
              source={{
                uri: data.post?.imgs[0],
              }}
              className={'w-20 h-20 rounded-md'}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableRipple>
  )
}
