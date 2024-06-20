import { Text } from 'react-native-paper'
import { Pressable, View } from 'react-native'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { UserAvatar } from '@/components/UserAvatar'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { useMutation } from 'react-query'
import { match } from 'ts-pattern'
import { Image } from '@/components/image/Image'
import { EmojiableText } from '@/components/Text/EmojiableText'
import { Else, If, Then } from 'react-if'
import { TimeText } from '@/components/Text/Time'
import { Apis } from '@/request/apis'

export interface TagHoleInfoData {
  id: number
  title: string
  imgs: string[]
  favoriteCounts: number
  user: User
  isLiked: boolean
}

interface TagHoleInfoProps {
  data: IHole
}

export function TagHoleInfo({ data }: TagHoleInfoProps) {
  const { go } = useHoleDetailRoute()
  const image = data.imgs.length ? data.imgs[0] : null
  const mutation = useMutation({
    mutationKey: ['hole.tag.like'],
    mutationFn: (isLiked: boolean) => {
      return () =>
        isLiked
          ? Apis.hole.PostLikeHoleRequest({
              id: data.id,
            })
          : Apis.hole.DeleteLikeHoleRequest({
              id: data.id,
            })
    },
  })

  return (
    <Pressable
      className="w-full"
      onPress={() => {
        go(data.id)
      }}
    >
      <View className={'bg-white rounded-lg'}>
        <If condition={image}>
          <Then>
            <View className="w-full rounded-t-lg overflow-hidden">
              <Image className="w-full h-60" source={{ uri: image! }} />
            </View>
          </Then>
        </If>

        <View className={'px-2 pb-2'}>
          <View className={'py-2'}>
            {match(Boolean(image))
              .with(true, () => (
                <Text className="text-base font-bold">{data.title}</Text>
              ))
              .otherwise(() => (
                <>
                  <If condition={data.title}>
                    <Then>
                      <Text className="text-base font-bold mb-2">
                        {data.title}
                      </Text>
                    </Then>
                  </If>
                  <EmojiableText body={data.body} numberOfLines={5} />
                </>
              ))}
          </View>
          <View className="flex flex-row justify-between">
            <View className={'flex flex-row items-center space-x-2'}>
              <UserAvatar url={data.user.avatar} size={25} />
              <View>
                <Text className="text-sm text-primary-label">
                  {data.user.username}
                </Text>
                <TimeText
                  time={data.createAt}
                  className="text-xs text-primary-label"
                />
              </View>
            </View>
            <AnimatedLikeButton data={data} mutation={mutation} size={18} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}
