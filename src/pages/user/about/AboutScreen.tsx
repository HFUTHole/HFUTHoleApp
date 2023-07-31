import { Image, ScrollView, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import GithubSvg from '@/assets/svg/github.svg'
import { Svg } from '@/components/svg/Svg'
import { ArrowBackIcon } from 'native-base'
import AppDenoSvg from '@/assets/svg/app_deno.svg'

const AboutList = [
  {
    title: '肥工小宇宙',
    text: '是一款集成HFUTSpace小程序，论坛于一体的平台，旨在为工大同学方便交流，查阅课表、成绩等数据，后续还有更多新玩法开放~',
    svg: AppDenoSvg,
  },
  {
    title: 'HFUTSpace',
    text: 'HFUTSpace小程序是一款提供给工大同学查看课表的小程序平台，灵感来源于"合工大课表无敌版"小程序\n\n日活约计1.7-2w左右，但是由于微信平台的限制，让我们在开发上遇到了不少令人烦躁的阻碍，所以我们想脱离微信平台，重新打造一个为工大同学服务的App，不过小程序依然是在维护',
    image: require('@/assets/img/space.png'),
    showArrow: false,
  },
  {
    title: 'Github 开源地址',
    text: 'https://github.com/HFUTHole/HFUTHoleApp',
    svg: GithubSvg,
  },
]

export function AboutScreen() {
  return (
    <ScrollView>
      <View className={'p-4 flex-1 space-y-4'}>
        {AboutList.map((item) => (
          <View
            className={
              'bg-white rounded-lg py-10 px-6 items-center justify-center space-y-4'
            }
            key={item.title}
          >
            {item.showArrow ? (
              <View
                className={'absolute right-6 top-10'}
                style={{ transform: [{ rotate: '145deg' }] }}
              >
                <ArrowBackIcon color={'#000'} size={6} />
              </View>
            ) : (
              <></>
            )}
            {item.svg ? (
              <Svg SvgComponent={item.svg} size={50} />
            ) : (
              <Avatar.Image source={item.image} size={50} />
            )}
            <Text variant={'titleLarge'} className={'font-bold'}>
              {item.title}
            </Text>
            <Text selectable>{item.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
