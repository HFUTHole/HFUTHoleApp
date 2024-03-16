import { Text, View } from 'react-native'
import { Avatar, Checkbox } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { ReactNode, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from '@/components/link'

interface Props {
  title: string

  secondary: string

  children: ReactNode

  logo?: ReactNode

  image?: string
}

export function AuthView(props: Props) {
  return (
    <SafeAreaView className={'flex-1 relative bg-white px-5'}>
      <View className={'bg-white flex-1 py-[10px]'}>
        <View className={'grid gap-5'}>
          <View className={'flex-row justify-between items-center'}>
            <View className={'grid space-y-2'}>
              <Text className={'font-bold text-2xl'}>{props.title}</Text>
            </View>
          </View>
          <View className={'space-y-2'}>
            <View className={'flex-row items-center'}>
              <Checkbox status={'checked'} />
              <Text className={'text-black/60'}>
                已阅读并同意 <Link to={'/'}>用户协议</Link> 和{' '}
                <Link to={'/'}>隐私政策</Link>
              </Text>
            </View>
            <View>{props.children}</View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
