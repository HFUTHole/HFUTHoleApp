import { View } from 'react-native'
import SettingSvg from '@/assets/svg/settings.svg'
import AboutSvg from '@/assets/svg/user/about.svg'
import UpdateSvg from '@/assets/svg/update.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { Button, useTheme } from 'react-native-paper'
import AppUpdateScreen from './update/AppUpdateScreen'
import { useState } from 'react'

export function MoreServiceList() {
  const theme = useTheme()
  const [isAppUpdateScreenVisible, setAppUpdateScreenVisible] = useState(false)

  const List = [
    {
      icon: SettingSvg,
      title: '应用设置',
      onPress: () => {},
    },
    {
      icon: AboutSvg,
      title: '关于应用',
      onPress: () => {},
    },
    {
      icon: UpdateSvg,
      title: '检查更新',
      onPress: () => {
        setAppUpdateScreenVisible(true)
      },
    },
  ]

  return (
    <>
      <View className={'space-y-2'}>
        {List.map((item) => (
          <Button
            key={item.title}
            onPress={item.onPress}
            rippleColor={theme.colors.onBackground}
            icon={({ size, color }) => (
              <item.icon width={24} height={24} color="grey" />
            )}
            contentStyle={{
              height: 60,
              justifyContent: 'flex-start',
            }}
          >
            <SecondaryText variant={'bodyLarge'} style={{ lineHeight: 20 }}>
              {item.title}
            </SecondaryText>
          </Button>
        ))}
      </View>
      <AppUpdateScreen
        visible={isAppUpdateScreenVisible}
        setVisible={setAppUpdateScreenVisible}
      />
    </>
  )
}
