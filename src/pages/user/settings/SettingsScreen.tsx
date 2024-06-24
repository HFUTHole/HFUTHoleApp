import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { LogoutButton } from '@/pages/user/settings/LogoutButton'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { HomePageSetterComponent } from '@/pages/user/settings/HomePageSetter'

export function SettingsScreen() {
  return (
    <SafeAreaView className={'flex-1 bg-[#efefef] px-[2.5vw] space-y-4'}>
      <BackHeader title={'设置'} />

      <View>
        <HomePageSetterComponent />
        <LogoutButton />
      </View>
      <Text className={'flex-1 text-center text-tertiary-label'}>
        小肥书版本：{Constants.manifest2?.runtimeVersion}(
        {Application.nativeApplicationVersion})
      </Text>
    </SafeAreaView>
  )
}
