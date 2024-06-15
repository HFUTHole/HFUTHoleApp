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
import { useTheme } from 'react-native-paper'
import { Func } from '@/shared/types'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

interface Props extends Partial<BottomSheetModalProps> {
  children: React.ReactNode
  footerText?: string
  onFooterPress?: Func
}

export const BottomActionSheet = forwardRef<BottomSheetModalMethods, Props>(
  (
    { snapPoints, backgroundStyle, footerText, onFooterPress, ...props },
    ref,
  ) => {
    const memoSnapPoints = useMemo(
      () => snapPoints || ['25%', '50%'],
      [snapPoints],
    )

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    )

    const close = () =>
      (ref as MutableRefObject<BottomSheetModal>).current?.close()

    return (
      <BottomSheetModal
        onDismiss={close}
        ref={ref}
        index={1}
        snapPoints={memoSnapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          ...(backgroundStyle as object),
        }}
        {...props}
      >
        {props.children}
      </BottomSheetModal>
    )
  },
)
