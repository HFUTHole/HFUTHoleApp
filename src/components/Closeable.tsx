import { Pressable, TouchableOpacity, View } from 'react-native'
import { CloseIcon } from '@/components/icon'
import { Func } from '@/shared/types'

interface Props {
  onPress?: Func
}

export function Closeable(props: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={'absolute right-[-4]'}
      onPress={props.onPress}
    >
      <View
        className={
          'w-5 h-5 rounded-full bg-black/30 items-center justify-center'
        }
      >
        <CloseIcon size={10} color={'#fff'} />
      </View>
    </TouchableOpacity>
  )
}
