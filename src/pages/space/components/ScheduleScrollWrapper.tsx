import { ScreenWrapper } from '@/components/ScrollWrapper'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { ReactNode } from 'react'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'

interface ScheduleScrollWrapperProps {
  children: ReactNode
  isFetching: boolean
  onRefresh?: () => void
}

export const ScheduleScrollWrapper = ({
  children,
  isFetching,
  onRefresh,
}: ScheduleScrollWrapperProps) => {
  const { isLogin } = useSpaceAuth()

  return (
    <ScreenWrapper
      contentContainerStyle={{
        minHeight: '100%',
      }}
      refreshControl={
        <RefreshIndicatorControl
          refreshing={isFetching}
          enabled={isLogin}
          onRefresh={onRefresh}
        />
      }
    >
      {children}
    </ScreenWrapper>
  )
}
