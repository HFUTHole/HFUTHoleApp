import { SvgProps } from 'react-native-svg'
import React from 'react'
import { useTheme } from 'react-native-paper'

type Props = {
  SvgComponent: React.ComponentType<SvgProps>
  size: number
  active?: boolean
} & SvgProps

export function Svg({ active, SvgComponent, size, ...props }: Props) {
  const theme = useTheme()

  return (
    <SvgComponent
      color={active ? theme.colors.primary : theme.colors.surfaceVariant}
      width={size}
      height={size}
      {...props}
    />
  )
}
