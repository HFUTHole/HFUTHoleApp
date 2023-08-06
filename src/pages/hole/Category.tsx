import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { ArticleCategoryEnum } from '@/shared/enums'
import { View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'

export const Categories = [
  {
    name: ArticleCategoryEnum.hfutLife,
    svg: HFUTLifeSvg,
    color: { primary: '#619E68', secondary: '#E3F6E0' },
  },
  {
    name: ArticleCategoryEnum.taoSecondHand,
    svg: SecondHandSvg,
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
  {
    name: ArticleCategoryEnum.lostAndFound,
    svg: LostAndFoundSvg,
    color: { primary: '#CB7D4B', secondary: '#FFEDE4' },
  },
  {
    name: ArticleCategoryEnum.study,
    svg: StudySvg,
    color: { primary: '#369F97', secondary: '#DCF6F2' },
  },
  {
    name: ArticleCategoryEnum.cat,
    svg: CatSvg,
    color: { primary: '#BE7AAC', secondary: '#FFECF5' },
  },
  {
    name: ArticleCategoryEnum.love,
    svg: YourNameSvg,
    color: { primary: '#619E68', secondary: '#E3F6E0' },
  },
  {
    name: ArticleCategoryEnum.ACG,
    svg: BilibiliSvg,
    color: { primary: '#619E68', secondary: '#E3F6E0' },
  },
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
