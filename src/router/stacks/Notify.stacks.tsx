import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { InteractiveNotificationScreen } from '@/pages/notify/interaction/NotifyInteraction'
import { Header } from '@/components/Header'
import { SystemNotificationScreen } from '@/pages/notify/system/SystemNotification'
import { useEffect, useRef } from 'react'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'

const Stack = createNativeStackNavigator()

export function NotifyStacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: Header,
      }}
    >
      <Stack.Screen
        name={'interaction'}
        options={{
          title: '互动消息',
        }}
        component={InteractiveNotificationScreen}
      />
      <Stack.Screen
        name={'system'}
        options={{
          title: '系统通知',
        }}
        component={SystemNotificationScreen}
      />
    </Stack.Navigator>
  )
}
