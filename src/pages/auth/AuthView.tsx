import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { ReactNode, useMemo } from 'react'
import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  title: string

  secondary: string

  snackbar: string | string[]

  children: ReactNode

  logo?: ReactNode

  image?: string
}

export function AuthView(props: Props) {
  const snackbarContent = useMemo(
    () => (Array.isArray(props.snackbar) ? props.snackbar : [props.snackbar]),
    [props.snackbar],
  )

  return (
    <SafeAreaView className={'flex-1 relative bg-white px-5'}>
      <View className={'bg-white flex-1 py-[10px]'}>
        <View className={'grid gap-5'}>
          {props.logo || (
            <Avatar.Image
              source={props.image || require('../../../assets/splash.png')}
              size={100}
            />
          )}
          <View className={'grid space-y-2'}>
            <Text className={'font-bold text-2xl'}>{props.title}</Text>
            <Text className={'text-gray-400'}>{props.secondary}</Text>
          </View>
          <View className={'space-y-2'}>
            {snackbarContent.map((content) => (
              <View key={content}>
                <Snackbar text={content} icon={'info'} />
              </View>
            ))}
            <View>{props.children}</View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
