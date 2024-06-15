import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { LogoutButton } from '@/pages/user/settings/LogoutButton'
import { TouchableEffect } from '@/components/button/TouchableEffect'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import { CommandLineIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'

export function SettingsScreen() {
  return (
    <SafeAreaView className={'flex-1 px-[2.5vw] space-y-4 bg-white'}>
      {/*<View className={'bg-white rounded-lg p-4'}>*/}
      {/*  <TouchableEffect onPress={() => {}}>*/}
      {/*    <View className={'flex-row items-center space-x-2'}>*/}
      {/*      <CommandLineIcon color={'#333'} size={24} />*/}
      {/*      <Text>检查更新</Text>*/}
      {/*    </View>*/}
      {/*    <View className={'flex-row items-center space-x-2'}>*/}
      {/*      <View className={'w-[24px] h-[24px]'}></View>*/}
      {/*      <View className={'flex-1 h-[0.5px] bg-black/20'} />*/}
      {/*    </View>*/}
      {/*  </TouchableEffect>*/}
      {/*</View>*/}
      <BackHeader title={'设置'} />
      <View>
        <LogoutButton />
      </View>
      <Text className={'flex-1 text-center text-tertiary-label'}>
        小肥书版本：{Constants.manifest2?.runtimeVersion}(
        {Application.nativeApplicationVersion})
      </Text>
    </SafeAreaView>
  )
}
