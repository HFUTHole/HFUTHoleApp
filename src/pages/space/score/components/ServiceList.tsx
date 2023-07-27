import { View } from 'react-native'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const serviceList = [
  {
    title: '成绩概览',
    svg: BilibiliSvg,
    route: 'space-nested',
    routeOption: {
      screen: 'score-info',
    },
  },
  {
    title: '挂科率查询',
    svg: BilibiliSvg,
    route: 'space-nested',
    routeOption: {
      screen: 'failure-rate',
    },
  },
  {
    title: '自定义排名',
    svg: BilibiliSvg,
    route: 'space-nested',
    routeOption: {
      screen: 'custom-ranking',
    },
  },
  {
    title: '成绩帮助',
    svg: BilibiliSvg,
    route: 'space-nested',
    routeOption: {
      screen: 'help',
      param: {
        type: 'score',
      },
    },
  },
]

export const ServiceList = () => {
  const { navigate } = useNavigation()
  return (
    <View className="flex flex-row justify-between">
      {serviceList.map((service) => (
        <TouchableRipple
          key={service.title}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onPress={() => navigate(service.route, service.routeOption)}
        >
          <View className="flex justify-center items-center space-y-2 py-2">
            <Svg SvgComponent={service.svg} size={30} />
            <Text>{service.title}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  )
}
