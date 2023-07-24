import { Alert, View } from 'react-native'
import SettingSvg from '@/assets/svg/settings.svg'
import AboutSvg from '@/assets/svg/user/about.svg'
import UpdateSvg from '@/assets/svg/update.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import * as Updates from 'expo-updates'
import { Button } from 'react-native-paper'
import { grey300 } from 'react-native-paper/src/styles/themes/v2/colors'

const List = [
  {
    icon: SettingSvg,
    title: '应用设置',
    func: undefined,
  },
  {
    icon: AboutSvg,
    title: '关于应用',
    func: undefined,
  },
  {
    icon: UpdateSvg,
    title: '检查更新',
    func: onFetchUpdateAsync,
  },
]

export async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      Alert.alert('更新中', `更新ID：${update.manifest?.id}`, [
        {
          text: '确定',
        },
      ])
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  } catch (error) {
    Alert.alert('更新失败', `错误信息：\n${error}`, [
      {
        text: '确定',
      },
    ])
  }
}

export function MoreServiceList() {
  return (
    <View className={'space-y-2'}>
      {List.map((item) => (
        <Button
          key={item.title}
          onPress={item.func}
          rippleColor={grey300}
          icon={({ size, color }) => (
            <item.icon width={28} height={28} color="grey" />
          )}
          contentStyle={{
            height: 65,
            justifyContent: 'flex-start',
          }}
        >
          <SecondaryText variant={'bodyLarge'} style={{ lineHeight: 20 }}>
            {item.title}
          </SecondaryText>
        </Button>
      ))}
    </View>
  )
}
