import { Page } from '@/pages/space/components/Page'
import { ScoreScrollWrapper } from '@/pages/space/components/ScoreScrollWrapper'
import { ScoreCard } from '@/pages/space/score/components/ScoreCard'
import { ServiceList } from '@/pages/space/score/components/ServiceList'
import { View } from 'react-native'
import { SemesterScoreChart } from '@/pages/space/score/components/SemesterScoreChart'

export const Score = () => {
  return (
    <Page>
      <ScoreScrollWrapper>
        <ScoreCard />
        <View className="mt-6">
          <ServiceList />
        </View>
        <View className="w-full h-[300px] mt-10">
          <SemesterScoreChart />
        </View>
      </ScoreScrollWrapper>
    </Page>
  )
}
