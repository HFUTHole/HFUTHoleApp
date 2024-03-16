import { Control, Controller, FieldPath } from 'react-hook-form'
import { PlainObject } from '@/shared/types/utils'
import { TextInput, TextInputProps } from 'react-native-paper'
import { useState } from 'react'
import { NativeInput, NativeTextInput } from '@/components/form/NativeInput'
import { View } from 'react-native'

type Props<T> = {
  name: FieldPath<T>
  control: Control<T>
} & TextInputProps

export function PasswordInput<T extends object = PlainObject>({
  name,
  control,
  ...props
}: Props<T>) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <View>
      <NativeTextInput<T>
        name={name}
        control={control}
        secureTextEntry={!isShowPassword}
        icon={
          <View className={'absolute right-10 h-full justify-center'}>
            <TextInput.Icon
              onPress={(e) => setIsShowPassword((prev) => !prev)}
              icon={isShowPassword ? 'eye' : 'eye-off'}
            />
          </View>
        }
        {...props}
      />
    </View>
  )
}
