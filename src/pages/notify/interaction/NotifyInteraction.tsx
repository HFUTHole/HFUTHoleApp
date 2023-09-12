import { useInteractiveNotificationsQuery } from '@/swr/notify/useInteractiveNotifications'
import { LoadingScreen } from '@/components/LoadingScreen'
import { StatusBar, View } from 'react-native'
import { RefreshingInteractiveNotifications } from '@/pages/notify/interaction/components/RefreshingInteractiveNotifications'
import { useReadNotifications } from '@/pages/notify/utils'
import { PageWithSafeArea } from '@/layouts/layout'

export function InteractiveNotificationScreen() {
  const { isLoading } = useInteractiveNotificationsQuery()
  useReadNotifications('interaction')

  return (
    <>
      <LoadingScreen isLoading={isLoading}>
        <View className={'h-full w-full bg-white'}>
          <RefreshingInteractiveNotifications />
        </View>
      </LoadingScreen>
    </>
  )
}
