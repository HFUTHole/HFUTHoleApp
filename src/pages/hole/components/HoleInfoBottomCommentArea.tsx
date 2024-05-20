import React from 'react'
import { Text, View } from 'react-native'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { UserAvatar } from '@/components/UserAvatar'

interface HoleInfoBottomCommentAreaProps {
  data: IHole
}

export const HoleInfoBottomCommentArea: React.FC<
  HoleInfoBottomCommentAreaProps
> = (props) => {
  return (
    <View className={'bg-background rounded-lg px-2 py-2 space-y-1'}>
      {props.data.comments.map((item) => (
        <View className={'flex-row'}>
          <View className={'flex-row flex-wrap items-center space-x-1'}>
            <UserAvatar url={item.user.avatar} size={18} />
            <Text className={'font-bold text-black/70'}>
              {item.user.username}：
            </Text>
          </View>
          <View className={'flex-1'}>
            <EmojiableText
              variant={'bodyMedium'}
              numberOfLines={2}
              hideOverflow={true}
              isExpandable={false}
              body={item.body}
              imageSize={20}
            />
          </View>
        </View>
      ))}
    </View>
  )
}
