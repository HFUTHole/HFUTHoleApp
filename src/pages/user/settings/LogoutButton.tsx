import React from 'react'
import { Portal, Text } from 'react-native-paper'
import { Dialog } from '@/components/Dialog'
import { BeautifulButton } from '@/components/button/BeautifulButton'
import { useBoolean } from 'ahooks'
import { useAuth } from '@/shared/hooks/useAuth'
import { View } from 'react-native'
import { Button } from '@/components/button'

export const LogoutButton: React.FC = () => {
  const [visible, visibleActions] = useBoolean(false)
  const { logout } = useAuth()

  const actionsBody = (
    <View className={'flex-row space-x-2'}>
      <Button onPress={visibleActions.setFalse}>取消</Button>
      <Button onPress={logout}>确定</Button>
    </View>
  )

  return (
    <>
      <Portal>
        <Dialog
          title={'退出登录'}
          visible={visible}
          onDismiss={visibleActions.setFalse}
          actionsBody={actionsBody}
        >
          <Text>退出也包括课表的账号哦，确定要退出登录么？</Text>
        </Dialog>
      </Portal>
      <BeautifulButton text={'退出登录'} onPress={visibleActions.setTrue} />
    </>
  )
}
