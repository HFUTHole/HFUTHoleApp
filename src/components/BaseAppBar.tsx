import { Appbar } from 'react-native-paper'
import { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

interface Props {
  children?: ReactNode

  className?: string
}

export function BaseAppBar(props: Props) {
  const navigation = useNavigation()

  return (
    <View
      className={
        'w-screen overflow-hidden bg-white flex flex-row space-between  h-14 border-b-[1px] border-black/5'
      }
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      {props.children}
    </View>
  )
}
