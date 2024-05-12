import { EmojiList } from '@/assets/emoji'
import { Pressable, Text, View } from 'react-native'
import { Emoji } from '../emoji/Emoji'

const EMOJI_PER_LINE = 7
const ITEM_HEIGHT = 30

// TODO 自行修改逻辑
const handleEmojiPressed = () => {}

// TODO 这里直接从EmojiList里面取了几个，请自行修改选取emoji的逻辑
export const RecentEmoji = () => {
  const Line = (group: number) => {
    const list = EmojiList.slice(
      group * EMOJI_PER_LINE - EMOJI_PER_LINE,
      group * EMOJI_PER_LINE,
    )
    return (
      <>
        {list.map((item) => (
          <Pressable onPress={() => handleEmojiPressed()} key={item.name}>
            <Emoji key={item.name} asset={item.asset} size={ITEM_HEIGHT} />
          </Pressable>
        ))}
      </>
    )
  }

  const ListTile = (props: { group: number }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
      >
        {Line(props.group)}
      </View>
    )
  }

  return (
    <View className={'space-y-2'}>
      <Text className={'text-surfaceVariant text-xs'}>最近使用</Text>
      <View>
        <ListTile group={5} />
      </View>
    </View>
  )
}
