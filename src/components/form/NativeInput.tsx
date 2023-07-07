import { PlainObject } from '@/shared/types/utils'
import { useTheme } from 'react-native-paper'
import {
  Control,
  Controller,
  FieldPath,
  get,
  UseControllerProps,
} from 'react-hook-form'
import { isNotEmptyObject } from 'class-validator'
import { TextInput, TextInputProps } from 'react-native'
import { forwardRef, useEffect, useRef } from 'react'

type Props<T> = {
  name: FieldPath<T>
  control: Control<T>
  rules?: UseControllerProps<T>['rules']
  transparent?: boolean
} & TextInputProps

export const NativeInput = <T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
  ...props
}: Props<T>) => {
  const theme = useTheme()
  const inputRef = useRef<TextInput>()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholderTextColor={theme.colors.surfaceVariant}
            cursorColor={theme.colors.primary}
            textAlignVertical={'top'}
            ref={inputRef}
            {...props}
            style={{
              fontSize: 16,
              ...(props.style as object),
            }}
          />
        </>
      )}
    />
  )
}