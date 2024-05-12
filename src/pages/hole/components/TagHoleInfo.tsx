import { Text } from 'react-native-paper'
import { Pressable, View } from 'react-native'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { UserAvatar } from '@/components/UserAvatar'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { useMutation } from 'react-query'
import { match } from 'ts-pattern'
import { Image } from '@/components/image/Image'

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
      return () => {}
    },
  })

  return (
    <Pressable className="w-full" onPress={() => go(data.id)}>
      <View className={'bg-white rounded-lg border-[1px] border-black/5'}>
        {image && (
          <View className="w-full rounded-t-lg overflow-hidden">
            <Image className="w-full h-52" source={{ uri: image }} />
          </View>
        )}

        <View className={'px-2 pb-2'}>
          <View className={'py-2'}>
            {match(Boolean(image))
              .with(true, () => (
                <Text className="text-base font-bold">{data.title}</Text>
              ))
              .otherwise(() => (
                <>
                  <Text className="text-base font-bold">{data.title}</Text>
                  <Text className={'mt-2'} numberOfLines={5}>
                    {data.body}
                  </Text>
                </>
              ))}
          </View>
          <View className="flex flex-row justify-between">
            <View className={'flex flex-row items-center space-x-2'}>
              <UserAvatar url={data.user.avatar} size={24} />
              <View>
                <Text className="text-sm text-gray-600">
                  {data.user.username}
                </Text>
              </View>
            </View>
            <AnimatedLikeButton data={data} mutation={mutation} size={18} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}
