import { EmojiList } from '@/assets/emoji'
import { Pressable, Text, View, GestureResponderEvent } from 'react-native'
import { Emoji } from '../Emoji'

const EMOJI_PER_LINE = 7
const ITEM_HEIGHT = 30

const Line = ({
  group,
  onPress,
}: {
  group: number
  onPress?: (emoji: string) => void
}) => {
  const list = EmojiList.slice(
    group * EMOJI_PER_LINE - EMOJI_PER_LINE,
    group * EMOJI_PER_LINE
  )
  return (
    <>
      {list.map((item) => (
        <Pressable key={item.name} onPress={() => onPress?.(item.name)}>
          <Emoji key={item.name} asset={item.asset} size={ITEM_HEIGHT} />
        </Pressable>
      ))}
    </>
  )
}

// TODO 这里直接从EmojiList里面取了几个，请自行修改选取emoji的逻辑
export const RecentEmoji = ({
  onPress,
}: {
  onPress?: (emoji: string) => void
}) => {
  return (
    <View className={'space-y-2'}>
      <Text className={'text-surfaceVariant text-xs'}>最近使用</Text>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            backgroundColor: 'white',
          }}
        >
          <Line group={5} onPress={onPress} />
        </View>
      </View>
    </View>
  )
}
