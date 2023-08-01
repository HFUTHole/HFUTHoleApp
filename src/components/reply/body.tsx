import { Text } from 'react-native-paper'
import { PrimaryText } from '@/components/Text/PrimaryText'
import React from 'react'
import { EmojiList } from '@/assets/emoji'
import { Image, View } from 'react-native'
import { Emoji } from '@/components/emoji/Emoji'
import { EmojiableText } from '@/components/Text/EmojiableText'

interface Props {
  data: IHoleReplyListItem
}

export function ReplyBody({ data }: Props) {
  return (
    <>
      <View className={'flex flex-row flex-wrap'}>
        {data.replyUser && (
          <View className={'flex-row'}>
            <Text>回复</Text>
            <PrimaryText>@{data.replyUser.username}：</PrimaryText>
          </View>
        )}
        <EmojiableText body={data.body} variant={'bodyMedium'} />
      </View>
    </>
  )
}
