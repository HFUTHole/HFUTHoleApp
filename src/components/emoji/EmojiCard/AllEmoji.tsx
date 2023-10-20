import { EmojiList } from '@/assets/emoji'
import { Pressable, Text, View, GestureResponderEvent } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Emoji } from '@/components/emoji/Emoji'

const EMOJI_PER_LINE = 6
const ITEM_HEIGHT = 30

// TODO 自行修改逻辑
const handleEmojiPressed = () => {
  console.log('[emoji pressed]')
}

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
        <Pressable onPress={() => onPress?.(item.name)} key={item.name}>
          <Emoji key={item.name} asset={item.asset} size={ITEM_HEIGHT} />
        </Pressable>
      ))}
      <BlankView count={EMOJI_PER_LINE - list.length} />
    </>
  )
}

const BlankView = (props: { count: number }) => {
  return (
    <>
      {Array.from(Array(props.count), (_item, index) => (
        <View style={{ width: ITEM_HEIGHT }} key={index} />
      ))}
    </>
  )
}

export const AllEmoji = ({
  onPress,
}: {
  onPress?: (emoji: string) => void
}) => {
  const totalGroupCount = (EmojiList.length + 6) / EMOJI_PER_LINE

  const groupId = []
  for (let group = 0; group < totalGroupCount; group++) {
    groupId.push(group)
  }

  return (
    <View className={'space-y-2'}>
      <Text className={'text-xs text-surfaceVariant'}>所有表情</Text>
      <FlatList
        className={'h-48'}
        data={groupId}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item: group }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 14,
              marginVertical: 8,
            }}
          >
            <Line group={group} onPress={onPress} />
          </View>
        )}
        initialNumToRender={5}
      />
    </View>
  )
}
