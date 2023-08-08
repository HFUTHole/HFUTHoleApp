import { Appbar, Text, TouchableRipple, useTheme } from 'react-native-paper'
import React, { useMemo, useRef, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { GestureResponderEvent, Vibration, View } from 'react-native'
import {
  ReportAction,
  ReportActionProps,
} from '@/pages/hole/detail/components/ReportAction'
import { Func, PartialExcludeField } from '@/shared/types'
import { ReportType } from '@/shared/validators/report'
import { DangerIcon } from '@/components/icon'

interface Props {
  list: {
    text: string
    icon: React.JSXElementConstructor<any>
    onPress: Func
    keepAliveAfterClick?: boolean
    color?: string
  }[]

  report: PartialExcludeField<ReportActionProps, 'type' | 'id'>
}

export function MoreActionWithSheet(props: Props) {
  const theme = useTheme()
  const [reportVisible, setReportVisible] = useState(false)

  const sheetRef = useRef<BottomSheetModal>()

  const list = useMemo(
    () => [
      ...props.list,
      {
        color: theme.colors.error,
        text: '举报',
        icon: DangerIcon,
        onPress: () => {
          setReportVisible(true)
        },
        keepAliveAfterClick: true,
      },
    ],
    []
  )

  const openSheet = () => {
    Vibration.vibrate(3)

    sheetRef.current?.present()
  }

  return (
    <>
      <Appbar.Action
        icon={'dots-vertical'}
        onPress={openSheet}
        size={15}
        className={'mr-0 items-end'}
        iconColor={theme.colors.surfaceVariant}
      />
      <BottomActionSheet ref={sheetRef}>
        <View className={'flex p-4 space-y-4'}>
          {list.map((Item) => {
            const onPress = async (e: GestureResponderEvent) => {
              await Item.onPress(e)

              if (!Item.keepAliveAfterClick) {
                sheetRef.current?.dismiss()
              }
            }

            return (
              <View
                key={Item.text}
                className={'bg-white rounded-lg overflow-hidden'}
              >
                <TouchableRipple onPress={onPress}>
                  <View className={'p-4 flex-row items-center space-x-4'}>
                    <Item.icon
                      size={20}
                      color={Item.color || theme.colors.surfaceVariant}
                    />
                    <Text
                      style={{
                        color: Item.color || theme.colors.surfaceVariant,
                      }}
                    >
                      {Item.text}
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            )
          })}
        </View>
        {props.report && (
          <ReportAction
            visible={reportVisible}
            setVisible={setReportVisible}
            {...props.report}
          />
        )}
      </BottomActionSheet>
    </>
  )
}
