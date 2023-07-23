import { Button, View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import SettingSvg from '@/assets/svg/setting.svg'
import AboutSvg from '@/assets/svg/user/about.svg'
import UpdateSvg from '@/assets/svg/update.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { RightIcon } from '@/components/icon'
import { onFetchUpdateAsync } from '@/request/apis/update'

const List = [
  {
    icon: SettingSvg,
    title: '应用设置',
    route: '',
  },
  {
    icon: AboutSvg,
    title: '关于应用',
    route: '',
  },
  {
    icon: UpdateSvg,
    title: '检查更新',
    route: '',
  },
]

export function MoreServiceList() {
  return (
    <View className={'space-y-2'}>
      {List.map((item) => (
        <View className={'flex flex-row justify-between py-4'} key={item.title}>
          <View className={'flex-row space-x-2 items-center'}>
            <Svg SvgComponent={item.icon} size={20} />
            <View>
              <SecondaryText variant={'bodyLarge'}>{item.title}</SecondaryText>
            </View>
          </View>
          <RightIcon />
        </View>
      ))}
      <Button title="Fetch update" onPress={onFetchUpdateAsync} />
    </View>
  )
}
