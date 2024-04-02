import React from 'react'
import { Text, View } from 'react-native'
import { EmojiableText } from '@/components/Text/EmojiableText'

interface HoleInfoBottomCommentAreaProps {
  data: IHole
}

export const HoleInfoBottomCommentArea: React.FC<
  HoleInfoBottomCommentAreaProps
> = (props) => {
  return (
    <View className={'bg-background rounded-lg px-4 py-2 space-y-1'}>
      {props.data.comments.map((item) => (
        <View className={'flex-row items-center'}>
          <Text className={'font-bold text-black/70'}>
            {item.user.username}：
          </Text>
          <EmojiableText
            variant={'bodyMedium'}
            body={item.body}
            imageSize={20}
          />
        </View>
      ))}
    </View>
  )
}
