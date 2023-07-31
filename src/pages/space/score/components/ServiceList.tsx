import FailureFate from '@/assets/svg/space/failure_rate.svg'
import CustomRanking from '@/assets/svg/space/custom_ranking.svg'
import Help from '@/assets/svg/space/help.svg'
import { Pressable, View } from 'react-native'
import ChartSvg from '@/assets/svg/chart.svg'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const serviceList = [
  {
    title: '成绩概览',
    svg: ChartSvg,
    route: 'space-nested',
    routeOption: {
      screen: 'score-overview',
    },
  },
  // {
  //   title: '挂科率查询',
  //   svg: FailureFate,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'failure-rate',
  //   },
  // },
  // {
  //   title: '自定义排名',
  //   svg: CustomRanking,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'custom-ranking',
  //   },
  // },
  // {
  //   title: '成绩帮助',
  //   svg: Help,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'help',
  //     params: {
  //       type: 'score',
  //     },
  //   },
  // },
  // {
  //   title: '挂科率查询',
  //   svg: ChartSvg,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'failure-rate',
  //   },
  // },
  // {
  //   title: '自定义排名',
  //   svg: BilibiliSvg,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'custom-ranking',
  //   },
  // },
  // {
  //   title: '成绩帮助',
  //   svg: BilibiliSvg,
  //   route: 'space-nested',
  //   routeOption: {
  //     screen: 'help',
  //     params: {
  //       type: 'score',
  //     },
  //   },
  // },
]

export const ServiceList = () => {
  const { navigate } = useNavigation()
  return (
    <View className="flex flex-row justify-between">
      {serviceList.map((service) => (
        <Pressable
          key={service.title}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onPress={() => navigate(service.route, service.routeOption)}
        >
          <View className="flex justify-center items-center space-y-2 py-2">
            <Svg SvgComponent={service.svg} size={30} />
            <Text className={'text-xs text-black/80'}>{service.title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  )
}
