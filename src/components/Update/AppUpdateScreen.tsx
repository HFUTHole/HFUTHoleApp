import { View } from 'react-native'
import * as Updates from 'expo-updates'
import React, { useCallback, useEffect } from 'react'
import { Dialog } from '@/components/Dialog'
import { Text } from 'react-native-paper'
import { useBoolean } from 'ahooks'
import { Toast } from '@/shared/utils/toast'

interface Props {
  children: React.ReactNode
}

export function AppUpdater({ children }: Props) {
  const [visible, visibleActions] = useBoolean(false)

  const fetchUpdateAsync = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        visibleActions.setTrue()
        setTimeout(async () => {
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync()
        }, 5000)
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      Toast.error({
        text1: '更新失败了',
        text2: (error as Error).toString(),
      })
      visibleActions.setFalse()
    }
  }, [])

  useEffect(() => {
    fetchUpdateAsync()
  }, [])

  return (
    <>
      <Dialog title={'有更新啦~'} visible={visible}>
        <View>
          <Text>将在5秒后自动更新哦</Text>
        </View>
      </Dialog>
      {children}
    </>
  )
}
