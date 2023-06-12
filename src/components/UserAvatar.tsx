import { Avatar } from 'react-native-paper'

interface Props {
  url: string

  size?: number
}

export function UserAvatar(props: Props) {
  return (
    <Avatar.Image
      size={props.size || 30}
      source={{
        uri: props.url,
      }}
    />
  )
}
