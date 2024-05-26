import { PlainObject } from '@/shared/types/utils'
import { HelperText, useTheme } from 'react-native-paper'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  get,
  UseControllerProps,
} from 'react-hook-form'
import { TextInput, TextInputProps, View, Text } from 'react-native'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  rules?: UseControllerProps<T>['rules']
  transparent?: boolean
  icon?: React.ReactNode
} & TextInputProps

export const NativeInput = <T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
  textAlignVertical,
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
            onChangeText={field.onChange}
            value={field.value}
            placeholderTextColor={theme.colors.surfaceVariant}
            cursorColor={theme.colors.primary}
            textAlignVertical={textAlignVertical ?? 'center'}
            ref={inputRef as MutableRefObject<TextInput>}
            {...props}
            style={{
              fontSize: 16,
              textAlignVertical: textAlignVertical ?? 'center',
              ...(props.style as object),
            }}
          />
        </>
      )}
    />
  )
}

export const NativeTextInput = <T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
  ...props
}: Props<T>) => {
  const theme = useTheme()
  const inputRef = useRef<TextInput>()
  const error = get(control._formState.errors, name)

  console.log(error)

  useEffect(() => {
    if (props.autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [props.autoFocus])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <View>
            <TextInput
              className={clsx(['bg-[#f5f5f5] rounded-lg p-3'])}
              onChangeText={field.onChange}
              value={field.value}
              placeholderTextColor={theme.colors.surfaceVariant}
              cursorColor={theme.colors.primary}
              textAlignVertical={'top'}
              ref={inputRef as MutableRefObject<TextInput>}
              {...props}
              style={{
                fontSize: 16,
                textAlignVertical: 'center',
                ...(props.style as object),
              }}
              autoFocus={false}
              focusable={false}
            />
            {props.icon}
          </View>
          {error?.message && (
            <HelperText
              type="error"
              visible={error}
              style={{ color: theme.colors.error }}
            >
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  )
}

export interface TextInputHighlightRule {
  match: RegExp
  style: object
}

const HighlightInput = <T extends object = PlainObject>({
  highlightRules,
  value,
  textAlignVertical,
  onChangeText,
  ...props
}: {
  highlightRules: TextInputHighlightRule[]
} & TextInputProps) => {
  const theme = useTheme()
  const inputRef = useRef<TextInput>()

  const [highlightedText, setHighlightedText] = useState<React.JSX.Element[]>(
    [],
  )

  const highlight = (inputText: string) => {
    const highlightedText = []
    let highlightMap: [string, object | null][] = [[inputText, null]]
    for (const rule of highlightRules) {
      const newHighlightMap: [string, object | null][] = []
      for (const [text, style] of highlightMap) {
        if (style === null) {
          const matches = text.matchAll(rule.match)
          let index = 0
          for (const match of matches) {
            newHighlightMap.push([text.slice(index, match.index), null])
            newHighlightMap.push([match[0], rule.style])
            index = match.index + match[0].length
          }
          newHighlightMap.push([text.slice(index), null])
        } else {
          newHighlightMap.push([text, style])
        }
      }
      highlightMap = newHighlightMap
    }
    for (const [i, [text, style]] of highlightMap.entries()) {
      if (style) {
        highlightedText.push(
          <Text key={i} style={style}>
            {text}
          </Text>,
        )
      } else {
        highlightedText.push(<Text key={i}>{text}</Text>)
      }
    }
    setHighlightedText(highlightedText)
  }

  useEffect(() => {
    highlight(value ?? '')
  }, [value])

  return (
    <>
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.surfaceVariant}
        cursorColor={theme.colors.primary}
        textAlignVertical={textAlignVertical ?? 'center'}
        // ref={inputRef as MutableRefObject<TextInput>}
        {...props}
        style={{
          fontSize: 16,
          textAlignVertical: textAlignVertical ?? 'center',
          ...(props.style as object),
        }}
      >
        {highlightedText}
      </TextInput>
    </>
  )
}

export const NativeHighlightInput = <T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
  textAlignVertical,
  highlightRules,
  ...props
}: Props<T> & {
  highlightRules: TextInputHighlightRule[]
}) => {
  const theme = useTheme()
  const inputRef = useRef<TextInput>()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        // highlight(field.value ?? '')
        return (
          <>
            <HighlightInput
              onChangeText={field.onChange}
              value={field.value}
              placeholderTextColor={theme.colors.surfaceVariant}
              cursorColor={theme.colors.primary}
              textAlignVertical={textAlignVertical ?? 'center'}
              highlightRules={highlightRules}
              // ref={inputRef as MutableRefObject<TextInput>}
              {...props}
              style={{
                fontSize: 16,
                textAlignVertical: textAlignVertical ?? 'center',
                ...(props.style as object),
              }}
            />
          </>
        )
      }}
    />
  )
}
