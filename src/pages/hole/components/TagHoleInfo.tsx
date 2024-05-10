import { TouchableRipple, Text } from 'react-native-paper'
import { Image, View } from 'react-native'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'
import { UserAvatar } from '@/components/UserAvatar'
import { LoveIcon } from '@/components/icon'
import { AnimatedLikeButton } from '@/components/animation/LikeButton'
import { useMutation } from 'react-query'

export interface TagHoleInfoData {
  id: number
  title: string
  imgs: string[]
  favoriteCounts: number
  user: User
  isLiked: boolean
}

interface TagHoleInfoProps {
  data: TagHoleInfoData
}

export function TagHoleInfo({ data }: TagHoleInfoProps) {
  const { go } = useHoleDetailRoute()
  const image = data.imgs.length ? data.imgs[0] : null
  const mutation = useMutation({
    // 莫名其妙的类型错误
    mutationKey: ['hole.tag.like'],
    mutationFn: (isLiked: boolean) => {},
  })

  return (
    <TouchableRipple className="w-full" onPress={() => go(data.id)}>
      <View>
        {image && (
          <View className="w-full rounded-t-lg overflow-hidden">
            <Image className="w-full aspect-square" source={{ uri: image }} />
          </View>
        )}

        <Text className="my-2 text-base font-bold">{data.title}</Text>
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
    </TouchableRipple>
  )
}
