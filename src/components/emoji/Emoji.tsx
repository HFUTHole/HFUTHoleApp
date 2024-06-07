import { ImageSourcePropType } from 'react-native/Libraries/Image/Image'
import { Image } from 'expo-image'

interface Props {
  asset: ImageSourcePropType
  size?: number
}

export function Emoji(props: Props) {
  return (
    <Image
      source={props.asset}
      style={{
        width: props.size ?? 30,
        height: props.size ?? 30,
      }}
    />
  )
}
