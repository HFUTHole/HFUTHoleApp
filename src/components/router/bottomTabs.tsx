import { View } from 'react-native'
import { RipplePressable } from '@/components/RipplePressable'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomTabBarIcon } from '@/components/router/bottomTabBarIcon'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useTheme } from 'react-native-paper'
import { Badge } from '@/components/Badge'
import { useRef } from 'react'
import { useMount } from 'ahooks'

// TODO: Theming
export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { totalCount, refetch } = useBaseNotificationsQuery()
  const timer = useRef<ReturnType<typeof setInterval>>()
  const theme = useTheme()

  useMount(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setInterval(refetch, 5000)
  })

  return (
    <View
      className={
        'flex-row bottom-0 bg-white border-t-[1px] border-t-black/5 h-16 items-center'
      }
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const isNotifyRoute = route.name === 'notify'

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <RipplePressable
            key={index}
            onPress={onPress}
            className={'flex-1'}
            rippleColor={theme.colors.onBackground}
          >
            <View
              className={'flex flex-1 items-center justify-center rounded-full'}
            >
              <View className={'relative'}>
                <BottomTabBarIcon route={route.key} isFocused={isFocused} />
                {isNotifyRoute && totalCount > 0 && (
                  <View className={'absolute top-[-10] right-[-20]'}>
                    <Badge>{totalCount}</Badge>
                  </View>
                )}
              </View>
            </View>
          </RipplePressable>
        )
      })}
    </View>
  )
}
