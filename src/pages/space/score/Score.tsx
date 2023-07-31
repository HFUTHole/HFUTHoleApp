import { ScoreScrollWrapper } from '@/pages/space/components/ScoreScrollWrapper'
import { ScoreCard } from '@/pages/space/score/components/ScoreCard'
import { ServiceList } from '@/pages/space/score/components/ServiceList'
import { View } from 'react-native'
import { SemesterScoreChart } from '@/pages/space/score/components/SemesterScoreChart'

export const Score = () => {
  return (
    <ScoreScrollWrapper>
      <View className={'w-screen px-4'}>
        <View className={'rounded-lg space-y-4'}>
          <ScoreCard />
          <View className={'bg-white px-4 py-2 rounded-lg'}>
            <View className="mt-6">
              <ServiceList />
            </View>
            <View className="w-full h-[300px] mt-10">
              <SemesterScoreChart />
            </View>
          </View>
        </View>
      </View>
    </ScoreScrollWrapper>
  )
}
