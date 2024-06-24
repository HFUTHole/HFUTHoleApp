import React from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'

export const DefaultBottomSheetBackdrop: React.FC<BottomSheetBackdropProps> = (
  props,
) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)
