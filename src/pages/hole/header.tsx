import { Text, useTheme } from 'react-native-paper'
import { Alert, Pressable, TouchableOpacity, View } from 'react-native'
import { SearchIcon } from '@/components/icon'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import React, { useCallback } from 'react'
import { useHoleListContext } from '@/shared/context/hole'
import { HoleListMode } from '@/shared/enums'
import { useLinkTo } from '@react-navigation/native'
import { useUserProfile } from '@/swr/user/profile'
import { UserAvatar } from '@/components/UserAvatar'
import { Box, Popover } from 'native-base'
import { Button } from '@/components/button'
import { observer } from 'mobx-react-lite'
import { useAuth } from '@/shared/hooks/useAuth'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { greetingText } from '@/shared/utils/utils'

const SearchBar = () => {
  const linkTo = useLinkTo()
  const theme = useTheme()

  return (
    <Pressable onPress={() => linkTo('/search')}>
      <View
        className={
          'rounded-full w-full py-2 px-3 flex flex-row space-x-2 items-center'
        }
        style={{ backgroundColor: theme.colors.onBackground }}
      >
        <SearchIcon size={20} />
        <Text className={'text-gray-500'}>搜索</Text>
      </View>
    </Pressable>
  )
}

const Animation = {
  active: {
    color: '#00AB55',
    fontSize: 24,
  },
  inactive: {
    color: '#86D0A8',
    fontSize: 16,
  },
}

const SelectListHoleListMode = () => {
  const { mode, setMode } = useHoleListContext()

  const randomFontsizeShared = useDerivedValue(() => {
    return mode === HoleListMode.random
      ? Animation.active.fontSize
      : Animation.inactive.fontSize
  }, [mode])
  const randomColorShared = useDerivedValue(() => {
    return mode === HoleListMode.random
      ? Animation.active.color
      : Animation.inactive.color
  }, [mode])
  const timelineFontsizeShared = useDerivedValue(() => {
    return mode === HoleListMode.timeline
      ? Animation.active.fontSize
      : Animation.inactive.fontSize
  }, [mode])
  const timelineColorShared = useDerivedValue(() => {
    return mode === HoleListMode.timeline
      ? Animation.active.color
      : Animation.inactive.color
  }, [mode])

  const randomStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(randomFontsizeShared.value),
      color: withSpring(randomColorShared.value),
      fontWeight: mode === HoleListMode.random ? 'bold' : 'normal',
    }
  })

  const timelineStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(timelineFontsizeShared.value),
      color: withSpring(timelineColorShared.value),
      fontWeight: mode === HoleListMode.timeline ? 'bold' : 'normal',
    }
  })

  const handleToggle = useCallback(
    (received: HoleListMode) => {
      if (received === mode) {
        return
      }

      setMode(received)
    },
    [mode]
  )

  return (
    <View className={'flex flex-row space-x-1 items-center'}>
      <TouchableOpacity onPress={() => handleToggle(HoleListMode.random)}>
        <Animated.Text style={[randomStyle]}>随机漫步</Animated.Text>
      </TouchableOpacity>
      <Text className={'text-2xl text-[#00AB55]/70 font-bold'}>/</Text>
      <TouchableOpacity>
        <Animated.Text
          onPress={() => handleToggle(HoleListMode.timeline)}
          style={[timelineStyle]}
        >
          时间轴
        </Animated.Text>
      </TouchableOpacity>
    </View>
  )
}

const UserProfile = observer(() => {
  const { data, isSuccess } = useUserProfile()
  const initialFocusRef = React.useRef(null)

  const { logout } = useAuth()

  return (
    isSuccess && (
      <View>
        <Box w="100%" alignItems="center">
          <Popover
            initialFocusRef={initialFocusRef}
            trigger={(triggerProps) => {
              return (
                <TouchableOpacity {...triggerProps}>
                  <UserAvatar url={data?.avatar} size={40} />
                </TouchableOpacity>
              )
            }}
          >
            <Popover.Content width="56" borderWidth={0}>
              <Popover.Arrow borderWidth={0} />
              <Popover.Body>
                <View className={'flex gap-2'}>
                  <View className={'flex'}>
                    <Text>{data.username},</Text>
                    <SecondaryText>{greetingText()}</SecondaryText>
                  </View>
                  <View
                    className={
                      'border-dashed border-t-[1px] border-black/20 w-full'
                    }
                  ></View>
                  <Button mode={'text'} onPress={logout}>
                    注销
                  </Button>
                </View>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Box>
      </View>
    )
  )
})

export function HoleHeader() {
  return (
    <View className={'bg-transparent grid space-y-2 px-2'}>
      <View className={'flex flex-row justify-between'}>
        <SelectListHoleListMode />
        <UserProfile />
      </View>
      <View>
        <SearchBar />
      </View>
    </View>
  )
}
