import { Func } from '@/shared/types'
import { Image, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { UnreadPointer } from '@/components/UnreadPointer'
import { UserAvatar } from '@/components/UserAvatar'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { TimeText } from '@/components/Text/Time'
import { MessageAbleItem } from '@/shared/hooks/useNavigateToMessageTarget'

interface Props {
  data: MessageAbleItem & {
    user?: IUser
    creator?: IUser
    isRead?: boolean
  }
  onPress: Func
}

export function MessageListItem({ data, onPress }: Props) {
  const user = data.creator || data.user
  const isUnRead = data.isRead === false

  return (
    <TouchableRipple onPress={onPress}>
      <View
        className={`p-2 justify-between flex-row ${
          isUnRead && 'bg-gray-200/20'
        }`}
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
              <EmojiableText
                body={data.body}
                secondary={true}
                variant={'bodyMedium'}
              />
              <View>
                <TimeText time={data.createAt} />
              </View>
            </View>
          </View>
        </View>
        <View className={'w-2/12 h-20 flex items-center'}>
          {data.hole?.imgs?.length ? (
            <Image
              source={{
                uri: data.hole?.imgs[0],
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
