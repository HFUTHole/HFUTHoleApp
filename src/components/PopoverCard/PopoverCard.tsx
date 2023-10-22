/**
 * @author prixii
 * @date 2023-09-19 19
 */

import { useMemo, PropsWithChildren } from 'react'
import { View, ViewStyle } from 'react-native'
import { WindowHeight } from '@/shared/utils/utils'

interface PopoverCardProps {
  coordinateY: number
  isVisible?: boolean
}

export const PopoverCard = ({
  children,
  coordinateY,
  isVisible,
}: PropsWithChildren<PopoverCardProps>) => {
  const customPointerEvents = useMemo(
    () => (isVisible ? 'box-none' : 'none'),
    [isVisible]
  )

  const positionStyle = useMemo<ViewStyle>(() => {
    if (coordinateY > WindowHeight / 2) {
      return {
        bottom: WindowHeight - coordinateY,
      }
    } else {
      return {
        top: coordinateY,
      }
    }
  }, [coordinateY])

  return (
    <View
      pointerEvents={customPointerEvents}
      className="absolute w-full h-full z-10"
    >
      <View className="absolute w-full left-1" style={positionStyle}>
        {isVisible && children}
      </View>
    </View>
  )
}
