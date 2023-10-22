import { useMemo } from 'react'
import { View } from 'react-native'
import { Emoji } from '@/components/emoji/Emoji'
import { EmojiList } from '@/assets/emoji'
import { Text } from 'react-native-paper'

const MAX_DISPLAY_CONST = 7

export const ExpressEmojiDisplay = ({ data }: { data: ExpressEmoji[] }) => {
  const expressEmojis = useMemo(() => {
    return data.map((expressEmoji) => {
      const displayUsers =
        expressEmoji.users.length > MAX_DISPLAY_CONST
          ? expressEmoji.users.slice(0, MAX_DISPLAY_CONST)
          : expressEmoji.users
      const userString =
        expressEmoji.users.length > MAX_DISPLAY_CONST
          ? displayUsers.map((item) => item.username).toString() +
            `...+${expressEmoji.users.length - MAX_DISPLAY_CONST}人`
          : displayUsers.map((item) => item.username).toString()
      return {
        userString,
        asset: EmojiList.find((item) => item.name === expressEmoji.emoji)!
          .asset,
        ...expressEmoji,
      }
    })
  }, [data])

  return (
    <View className="flex flex-row flex-wrap space-x-3">
      {expressEmojis.map((expressEmoji) => (
        <View
          key={expressEmoji.id}
          className="flex flex-row items-center my-1 space-x-1 px-2 py-1 rounded-full bg-blue-200"
        >
          <Emoji asset={expressEmoji.asset} size={22} />
          <View className={'h-4 border-l-[1px] border-black/10'} />
          <Text className="text-xs">{expressEmoji.userString}</Text>
        </View>
      ))}
    </View>
  )
}
