import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import HobbySvg from '@/assets/svg/home/hobby.svg'
import { ArticleCategoryEnum } from '@/shared/enums'
import { View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'

export const Categories = [
  {
    name: ArticleCategoryEnum.hfutLife,
    description: '学习已经很苦了，来看看水贴娱乐放松一下吧',
    children: ['工大杂谈', '身边趣事', '镜头下的工大'],
    color: { primary: '#619E68', secondary: '#E3F6E0' },
    svg: HFUTLifeSvg,
  },
  {
    name: ArticleCategoryEnum.littleCreature,
    description: '校园的猫猫狗狗，蛇蛇，鼠鼠多可爱',
    children: ['屯', '翠', '宣'],
    color: { primary: '#BE7AAC', secondary: '#FFECF5' },
    svg: CatSvg,
  },
  {
    name: ArticleCategoryEnum.loveStory,
    description: '分享一下你的情感/小丑故事',
    color: { primary: '#CA7792', secondary: '#FFEDF0' },
    svg: YourNameSvg,
  },
  {
    name: ArticleCategoryEnum.hobby,
    description:
      '在这里你可以分享音乐，书籍，电影，游戏，动漫, whatever you are interested!',
    children: ['游戏', '动漫', '音乐', '好书', '电影'],
    color: { primary: '#5297C3', secondary: '#DCF6F2' },
    svg: HobbySvg,
  },
  {
    name: ArticleCategoryEnum.study,
    description: '学习',
    children: ['学习交流', '考研', '竞赛', '书籍资料'],
    color: { primary: '#369F97', secondary: '#DCF6F2' },
    svg: StudySvg,
  },
  {
    name: ArticleCategoryEnum.lostAndFound,
    description: '哎呀，谁的东西丢了，快来看看有没有被别人捡到',
    children: ['屯', '翠', '宣'],
    color: { primary: '#CB7D4B', secondary: '#FFEDE4' },
    svg: LostAndFoundSvg,
  },
  {
    name: ArticleCategoryEnum.taoSecondHand,
    description: '一手太贵，还是来看看二手吧',
    children: ['屯', '翠', '宣'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
    svg: SecondHandSvg,
  }
]

export function HomeCategories() {
  const { go } = useHoleCategoryRoute()

  return (
    <View className={'bg-white p-2 rounded-lg'}>
      <View className={'flex flex-row flex-wrap space-y-6 items-center'}>
        {Categories.map((category) => {
          return (
            <View
              className={'overflow-hidden rounded-lg w-1/5'}
              key={category.name}
            >
              <TouchableRipple onPress={() => go(category.name)}>
                <View
                  className={
                    'flex flex-col justify-center items-center space-y-2 py-2'
                  }
                >
                  <Svg size={30} SvgComponent={category.svg} />
                  <Text variant={'bodySmall'}>{category.name}</Text>
                </View>
              </TouchableRipple>
            </View>
          )
        })}
      </View>
    </View>
  )
}
