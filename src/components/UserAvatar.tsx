import { useUserProfile } from '@/swr/user/profile'
import { Image } from '@/components/image/Image'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import { Pressable, TouchableOpacity } from 'react-native'
import { Config } from '@/shared/config'

interface Props {
  userId?: number

  url?: string

  size?: number

  mode?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ mode = 'sm', userId, ...props }: Props) {
  const modeSize = mode === 'sm' ? 30 : mode === 'md' ? 40 : 55
  const userRoute = useUserProfileRoute()
  const { data: userData } = useUserProfile()

  return (
    <TouchableOpacity
      onPress={() => {
        if (userId && userData?.id !== userId) {
          userRoute.goOtherUserProfileScreen(userId)
        } else if (userData?.id === userId) {
          userRoute.goTo()
        }
      }}
    >
      <Image
        className={'rounded-full'}
        style={{
          width: props.size || modeSize,
          height: props.size || modeSize,
        }}
        source={{
          uri: props.url,
        }}
      />
    </TouchableOpacity>
  )
}

export function MyAvatar(props: Omit<Props, 'url'>) {
  const { data } = useUserProfile()

  return <UserAvatar url={data?.avatar} userId={data?.id} {...props} />
}
