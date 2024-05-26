import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {
  ChartBarSquareIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
} from 'react-native-heroicons/outline'
import { DocumentMagnifyingGlassIcon } from 'react-native-heroicons/outline'

const serviceList = [
  {
    title: '成绩概览',
    svg: ChartBarSquareIcon,
    route: 'space-nested',
    routeOption: {
      screen: 'score-overview',
    },
  },
  {
    title: '挂科率查询',
    svg: DocumentMagnifyingGlassIcon,
    route: 'space-nested',
    routeOption: {
      screen: 'course-failure-search-query',
    },
  },
  {
    title: '成绩帮助',
    svg: QuestionMarkCircleIcon,
    route: 'space-nested',
    routeOption: {
      screen: 'help',
      params: {
        type: ['score'],
      },
    },
  },
  {
    title: '自定义排名',
    svg: RectangleStackIcon,
    route: 'space-nested',
    routeOption: {
      screen: 'custom-ranking',
    },
  },
]

export const ServiceList = () => {
  const { navigate } = useNavigation()
  return (
    <View className="flex flex-row">
      {serviceList.map((service) => (
        <View className="w-1/4 rounded-lg overflow-hidden" key={service.title}>
          <TouchableRipple
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onPress={() => navigate(service.route, service.routeOption)}
          >
            <View className="flex justify-center items-center space-y-2 py-2">
              <service.svg color={'#333'} />
              <Text className={'text-xs text-black/80'}>{service.title}</Text>
            </View>
          </TouchableRipple>
        </View>
      ))}
    </View>
  )
}
