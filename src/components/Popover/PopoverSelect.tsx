import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AntdIcon } from '@/components/icon'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { Else, If, Then } from 'react-if'
import { CheckIcon } from 'react-native-heroicons/solid'
import Popover from 'react-native-popover-view'
import { useBoolean } from 'ahooks'
import clsx from 'clsx'

interface PopoverSelectProps<T> {
  enum: Record<any, any>

  state: string

  setState: (value: T) => void

  fromText: string

  textClassName?: string

  iconColor?: string

  iconSize?: number
}

export function PopoverSelect<T>(_props: PopoverSelectProps<T>) {
  const theme = useTheme()

  const { state, setState, ...props } = _props

  const [showPopover, showPopoverActions] = useBoolean(false)

  return (
    <Popover
      arrowSize={{
        width: 0,
        height: 0,
      }}
      from={
        <TouchableOpacity
          activeOpacity={0.8}
          className={'pr-[2.5vw] flex-row space-x-1 items-center'}
          onPress={() => {
            showPopoverActions.setTrue()
          }}
        >
          <Text className={clsx(['font-bold text-black', props.textClassName])}>
            {props.fromText}
          </Text>
          <AntdIcon.caredown
            color={props.iconColor || '#000'}
            size={props.iconSize || 12}
          />
        </TouchableOpacity>
      }
      onRequestClose={showPopoverActions.setFalse}
      isVisible={showPopover}
    >
      <View className={'rounded-lg w-40'}>
        {Object.keys(props.enum).map((key) => {
          const val = props.enum[key as keyof typeof props.enum]

          return (
            <TouchableRipple
              key={key}
              className={'p-4 border-b-[1px] border-b-black/5'}
              onPress={() => {
                setState(val as any)
                showPopoverActions.setFalse()
              }}
            >
              <View className={'flex-1 flex-row items-center justify-between'}>
                <Text>{val}</Text>
                <If condition={state === val}>
                  <Then>
                    <CheckIcon size={18} color={theme.colors.primary} />
                  </Then>
                  <Else>
                    <></>
                  </Else>
                </If>
              </View>
            </TouchableRipple>
          )
        })}
      </View>
    </Popover>
  )
}
