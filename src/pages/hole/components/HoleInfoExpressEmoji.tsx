import { useMemo } from 'react'
import { View } from 'react-native'
import { Emoji } from '@/components/emoji/Emoji'
import { EmojiList } from '@/assets/emoji'
import { Text } from 'react-native-paper'

const MAX_DISPLAY_CONST = 7

export const HoleInfoExpressEmoji = ({ data }: { data: IHole }) => {
  const expressEmojis = useMemo(() => {
    return data.expressEmojis.map((expressEmoji) => {
      const displayUsers =
        expressEmoji.users.length > MAX_DISPLAY_CONST
          ? expressEmoji.users
          : expressEmoji.users.slice(0, MAX_DISPLAY_CONST)
      const userString =
        expressEmoji.users.length > MAX_DISPLAY_CONST
          ? displayUsers.join(',') +
            `...+${expressEmoji.users.length - MAX_DISPLAY_CONST}人`
          : displayUsers.join(',')
      return {
        userString,
        asset: EmojiList.find((item) => item.name === expressEmoji.emoji)!
          .asset,
        ...expressEmoji,
      }
    })
  }, [data.expressEmojis])
  console.log(expressEmojis)

  return (
    <View className="flex flex-row flex-wrap space-x-4">
      {expressEmojis.map((expressEmoji) => (
        <View
          key={expressEmoji.id}
          className="flex flex-row items-center space-x-1 px-2 py-1 rounded-full bg-blue-200"
        >
          <Emoji asset={expressEmoji.asset} size={22} />
          <View className={'h-4 border-l-[1px] border-black/10'} />
          <Text className="text-xs">{expressEmoji.userString}</Text>
        </View>
      ))}
    </View>
  )
}
