import { View } from 'react-native'
import SettingSvg from '@/assets/svg/settings.svg'
import AboutSvg from '@/assets/svg/app_deno.svg'
import { Button, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import { RightIcon } from '@/components/icon'
import { Svg } from '@/components/svg/Svg'

export function MoreServiceList() {
  const route = useUserProfileRoute()

  const List = [
    {
      icon: SettingSvg,
      title: '应用设置',
      onPress: route.goSettingsScreen,
    },
    {
      icon: AboutSvg,
      title: '关于小宇宙',
      onPress: route.goAboutScreen,
    },
  ]

  return (
    <>
      <View className={'space-y-4'}>
        {List.map((item) => (
          <View className={'rounded-lg overflow-hidden'} key={item.title}>
            <TouchableRipple onPress={item.onPress}>
              <View
                className={'flex-row justify-between items-center px-2 py-3'}
              >
                <View className={'flex-row space-x-4 items-center'}>
                  <Svg SvgComponent={item.icon} size={28} />
                  <Text variant={'bodyLarge'}>{item.title}</Text>
                </View>
                <RightIcon />
              </View>
            </TouchableRipple>
          </View>
        ))}
      </View>
    </>
  )
}
