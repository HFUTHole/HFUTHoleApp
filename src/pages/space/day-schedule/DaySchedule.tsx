import { KeyboardAvoidingView } from 'react-native'
import { PlainPage } from '@/components/Page'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { Header } from '@/pages/space/day-schedule/components/Header'
import { ScheduleList } from '@/pages/space/day-schedule/components/ScheduleList'
import { useSpaceUserInfo } from '@/swr/space/user'
import { useSemesters } from '@/swr/space/chore'
import { ScheduleScrollWrapper } from '@/pages/space/components/ScheduleScrollWrapper'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useInitializeSpace } from '@/pages/space/@utils/useInitializeSpace'

export const DaySchedule = () => {
  const { isLogin } = useAuth()
  useInitializeSpace()

  const isFocused = useIsFocused()

  const [isDialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    if (!isLogin && isFocused) {
      setDialogVisible(true)
    } else {
      setDialogVisible(false)
    }
  }, [isLogin, isFocused])

  return (
    <KeyboardAvoidingView behavior="padding">
      <PlainPage>
        <ScheduleScrollWrapper>
          <Header />
          <ScheduleList />
        </ScheduleScrollWrapper>
      </PlainPage>
    </KeyboardAvoidingView>
  )
}
