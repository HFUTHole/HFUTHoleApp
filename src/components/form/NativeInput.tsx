import { PlainObject } from '@/shared/types/utils'
import { useTheme } from 'react-native-paper'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'
import { useEffect, useRef } from 'react'
import { TextInputMask } from 'react-native-masked-text'

type Props<T extends FieldValues> = {
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

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextInput
            type={'custom'}
            onBlur={() => false}
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
