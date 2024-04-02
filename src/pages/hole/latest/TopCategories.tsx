import { View } from 'react-native'
import { Categories } from '@/shared/constants/category'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'

export function TopCategories() {
  const { go } = useHoleCategoryRoute()

  return (
    <View className={'rounded-lg bg-white flex-row flex-wrap py-2'}>
      {Categories.slice(0, 10).map((item) => (
        <TouchableRipple
          key={item.route}
          className={'p-2 w-1/5'}
          onPress={() =>
            go({
              name: item.name,
            })
          }
        >
          <View className={'space-y-2 justify-center items-center'}>
            <Svg SvgComponent={item.icon} size={35} />
            <Text className={'text-black/80 text-xs'}>{item.name}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  )
}
