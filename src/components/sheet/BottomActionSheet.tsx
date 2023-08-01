import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useMemo,
} from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { Text, useTheme } from 'react-native-paper'
import { Func } from '@/shared/types'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Modal, StatusBar, View } from 'react-native'

interface Props extends BottomSheetModalProps {
  children: React.ReactNode
  footerText?: string
  onFooterPress?: Func
}

export const BottomActionSheet = forwardRef<BottomSheetModalMethods, Props>(
  (
    { snapPoints, backgroundStyle, footerText, onFooterPress, ...props },
    ref
  ) => {
    const theme = useTheme()

    const memoSnapPoints = useMemo(
      () => snapPoints || ['25%', '50%'],
      [snapPoints]
    )

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    )

    const close = () =>
      (ref as MutableRefObject<BottomSheetModal>).current?.close()

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={memoSnapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          ...(backgroundStyle as object),
        }}
        {...props}
      >
        {props.children}
      </BottomSheetModal>
    )
  }
)
