import { useUserProfile } from '@/swr/user/profile'
import { Image } from '@/components/image/Image'

interface Props {
  url?: string

  size?: number

  mode?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ mode = 'sm', ...props }: Props) {
  const modeSize = mode === 'sm' ? 30 : mode === 'md' ? 40 : 55

  return (
    <Image
      className={'rounded-full bg-red-200'}
      style={{
        width: props.size || modeSize,
        height: props.size || modeSize,
      }}
      source={{
        uri: props.url,
      }}
    />
  )
}

export function MyAvatar(props: Omit<Props, 'url'>) {
  const { data } = useUserProfile()

  return <UserAvatar url={data?.avatar} {...props} />
}
