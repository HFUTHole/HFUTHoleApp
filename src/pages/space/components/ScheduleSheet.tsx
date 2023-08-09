import { ScheduleSheetContent } from '@/pages/space/components/ScheduleSheetContent'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import React, { forwardRef, MutableRefObject } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSpaceCourseRoute } from '@/shared/hooks/route/useSpaceCourseRoute'
import type { UnitSchedule } from '@/pages/space/@utils/types'

interface Props {
  schedule?: UnitSchedule
}

export const ScheduleSheet = forwardRef<BottomSheetModal, Props>(
  ({ schedule }, ref) => {
    const sheetRef = ref as MutableRefObject<BottomSheetModal>

    const route = useSpaceCourseRoute()

    const closeSheet = () => {
      sheetRef.current.close()
    }

    const goCourseFailureRatePage = () => {
      route.goCourseFailureRatePage(schedule?.courseName)
      closeSheet()
    }

    return (
      <BottomActionSheet
        ref={ref}
        snapPoints={['60%', '80%']}
        backgroundStyle={{ backgroundColor: 'white' }}
        footerText={'查看挂科率'}
      >
        {schedule ? (
          <>
            <ScheduleSheetContent schedule={schedule} />
            <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
              <TouchableRipple onPress={goCourseFailureRatePage}>
                <View className={'p-4'}>
                  <Text className={'text-center text-white font-[800]'}>
                    查看挂科率
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          </>
        ) : null}
      </BottomActionSheet>
    )
  }
)
