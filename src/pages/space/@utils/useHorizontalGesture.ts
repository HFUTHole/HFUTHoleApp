import { useCallback, useRef, useState } from 'react'
import { GestureResponderEvent } from 'react-native'

const interactiveBoundary = 120

interface Params {
  onPrev?: () => void
  onNext?: () => void
}

export const useHorizontalGesture = ({ onPrev, onNext }: Params) => {
  const [enable, setEnable] = useState(true)
  const startX = useRef(0)

  const onTouchStart = useCallback((e: GestureResponderEvent) => {
    startX.current = e.nativeEvent.pageX
  }, [])

  const onTouchEnd = useCallback(
    (e: GestureResponderEvent) => {
      const translationX = e.nativeEvent.pageX - startX.current
      const absoluteTranslationX = Math.abs(translationX)

      if (!enable || absoluteTranslationX < interactiveBoundary) {
        return
      }
      if (translationX > 0) {
        onPrev?.()
      } else {
        onNext?.()
      }
    },
    [enable, onPrev, onNext]
  )

  return {
    setEnable,
    onTouchStart,
    onTouchEnd,
  }
}
