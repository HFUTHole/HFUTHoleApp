import { SvgProps } from 'react-native-svg'
import { Svg } from '@/components/svg/Svg'
import AppDenoSvg from '@/assets/svg/app_deno.svg'
import TagSvg from '@/assets/svg/icons/tag.svg'

export function AppDenoIcon({ size, ...props }: SvgProps & { size?: number }) {
  return <Svg SvgComponent={AppDenoSvg} size={size || 50} {...props} />
}

export function TagIcon({ size, ...props }: SvgProps & { size?: number }) {
  return <Svg SvgComponent={TagSvg} size={size || 25} {...props} />
}
