import { Alert, View } from 'react-native'
import SettingSvg from '@/assets/svg/settings.svg'
import AboutSvg from '@/assets/svg/user/about.svg'
import UpdateSvg from '@/assets/svg/update.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { Button } from 'react-native-paper'
import { grey300 } from 'react-native-paper/src/styles/themes/v2/colors'
import { useFetchUpdateAsync } from '@/shared/hooks/useFetchUpdate'

const List = [
  {
    icon: SettingSvg,
    title: '应用设置',
    onPress: undefined,
  },
  {
    icon: AboutSvg,
    title: '关于应用',
    nPress: undefined,
  },
  {
    icon: UpdateSvg,
    title: '检查更新',
    onPress: useFetchUpdateAsync,
  },
]

export function MoreServiceList() {
  return (
    <View className={'space-y-2'}>
      {List.map((item) => (
        <Button
          key={item.title}
          onPress={item.onPress}
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
