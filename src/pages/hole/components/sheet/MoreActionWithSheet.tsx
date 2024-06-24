import { Appbar, Text, TouchableRipple, useTheme } from 'react-native-paper'
import React, { MutableRefObject, useMemo, useRef, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import {
  ReportAction,
  ReportActionProps,
} from '@/pages/hole/detail/components/ReportAction'
import { Func, PartialExcludeField } from '@/shared/types'
import { DangerIcon } from '@/components/icon'
import * as Haptics from 'expo-haptics'

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
    [props.list, theme.colors.error],
  )

  const openSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    sheetRef.current?.present()
  }

  return (
    <>
      <TouchableOpacity onPress={openSheet}>
        <Appbar.Action
          icon={'dots-horizontal'}
          size={20}
          color={'rgba(0,0,0,.5)'}
        />
      </TouchableOpacity>
      <BottomActionSheet
        backgroundStyle={{
          backgroundColor: '#efefef',
        }}
        ref={sheetRef as MutableRefObject<BottomSheetModal>}
      >
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
