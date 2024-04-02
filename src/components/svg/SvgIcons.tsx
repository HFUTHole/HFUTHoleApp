import { SvgProps } from 'react-native-svg'
import { Svg } from '@/components/svg/Svg'
import AppDenoSvg from '@/assets/svg/app_deno.svg'
import TagSvg from '@/assets/svg/icons/tag.svg'
import CommentSvg from '@/assets/svg/icons/comment.svg'
import ShareSvg from '@/assets/svg/icons/share.svg'
import React from 'react'
import { CopyIcon } from '@/components/icon'

type SvgIconProps = SvgProps & { size?: number }

export function AppDenoIcon({ size, ...props }: SvgProps & { size?: number }) {
  return <Svg SvgComponent={AppDenoSvg} size={size || 50} {...props} />
}

export function TagIcon({ size, ...props }: SvgProps & { size?: number }) {
  return <Svg SvgComponent={TagSvg} size={size || 25} {...props} />
}

const CommentIcon: React.FC<SvgIconProps> = (props) => {
  return <Svg SvgComponent={CommentSvg} size={props.size || 25} {...props} />
}

const ShareIcon: React.FC<SvgIconProps> = (props) => {
  return <Svg SvgComponent={ShareSvg} size={props.size || 25} {...props} />
}

export const Icons = {
  AppDenoIcon,
  TagIcon,
  CommentIcon,
  CopyIcon,
  ShareIcon,
}
