import React, { ReactNode } from 'react'
import { Modal, Pressable, StatusBar, View } from 'react-native'
import { ModalProps } from 'react-native/Libraries/Modal/Modal'
import { Func } from '@/shared/types'
import UseKeyboardHeight from '@/shared/hooks/useKeyboardHeight'

type Props = {
  children: ReactNode
  visible: boolean
  onClose: Func
} & ModalProps

// TODO 重构，覆盖StatusBar
export function MaskModal({ children, visible, onClose, ...props }: Props) {
  const height = UseKeyboardHeight()
  return (
    <>
      <Modal
        visible={visible}
        animationType={'slide'}
        transparent={true}
        {...props}
      >
        <View className={'relative h-full flex-1'}>
          <Pressable
            className={'absolute w-full h-full bg-black/20 z-[0]'}
            onPress={onClose}
          />
          <View className={'z-[1] absolute bottom-0'}>{children}</View>
        </View>
      </Modal>
    </>
  )
}
