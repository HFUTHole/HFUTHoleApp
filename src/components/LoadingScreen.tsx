import React, { useEffect, useMemo, useRef, useState } from 'react'
import Lottie from 'lottie-react-native'
import { View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useBoolean } from 'ahooks'

interface Props {
  isLoading: boolean
  children: React.ReactNode
  isError?: boolean
  displayOriginalPageOnError?: boolean
  id?: number
}

export function LoadingScreen(props: Props) {
  const animationRef = useRef<Lottie>(null)
  const [loading, loadingActions] = useBoolean(props.isLoading)

  const lottieSource = useMemo(() => {
    const id = props.id || 0

    if (id === 0) {
      return require('@/assets/lottie/loading.json')
    } else if (id === 1) {
      return require('@/assets/lottie/loading-1.json')
    }
  }, [props.id])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (!props.isLoading) {
      timer = setTimeout(() => {
        loadingActions.setFalse()
      }, 500)
    }

    return () => {
      clearInterval(timer!)
    }
  }, [props.isLoading])

  return (
    <>
      {props.isError && props.displayOriginalPageOnError ? (
        props.children
      ) : loading ? (
        <View
          className={
            'bg-white w-full h-screen flex-row items-center justify-center'
          }
        >
          <View className={'flex space-y-1 items-center'}>
            <Lottie
              ref={animationRef}
              source={lottieSource}
              style={{
                width: 200,
                height: 200,
              }}
              autoPlay
            />
            <SecondaryText>加载中...</SecondaryText>
          </View>
        </View>
      ) : (
        props.children
      )}
    </>
  )
}
