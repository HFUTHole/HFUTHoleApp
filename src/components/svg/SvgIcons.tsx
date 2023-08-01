import { SvgProps } from 'react-native-svg'
import { Svg } from '@/components/svg/Svg'
import AppDenoSvg from '@/assets/svg/app_deno.svg'

export function AppDenoIcon({ size, ...props }: SvgProps & { size?: number }) {
  return <Svg SvgComponent={AppDenoSvg} size={size || 50} {...props} />
}
