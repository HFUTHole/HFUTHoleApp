import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { IconProps } from 'react-native-vector-icons/Icon'
import React from 'react'
import { useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

export const Icons = (props: IconProps) => <MaterialIcon {...props} />

const Material = Animated.createAnimatedComponent(MaterialIcon)

const withIconProps = (
  WrappedIconComponent: React.ComponentType<IconProps>,
  name: string,
) => {
  return (
    props: Omit<IconProps, 'name'> & {
      name?: string
      active?: boolean
      activeColor?: string
    },
  ) => {
    const theme = useTheme()

    return (
      <WrappedIconComponent
        name={name}
        color={
          props.active
            ? props.activeColor || theme.colors.primary
            : theme.colors.surfaceVariant
        }
        size={20}
        {...props}
      />
    )
  }
}

export type IconComponentType = ReturnType<ReturnType<typeof withIconProps>>

const withFontAV5Icon = (name: string) => withIconProps(FontAwesome5Icon, name)
const withMaterialIcon = (name: string) => withIconProps(MaterialIcon, name)
const withAntDesignIcon = (name: string) => withIconProps(AntDesignIcon, name)

export const AntdIcon = {
  caredown: withAntDesignIcon('caretdown'),
  careup: withAntDesignIcon('careup'),
}

// export type

export const LoveIcon = withAntDesignIcon('heart')

export const PulsIcon = withAntDesignIcon('plus')

export const LikeIcon = withMaterialIcon('thumb-up')

export const MenuIcon = withMaterialIcon('menu')

export const CommentIcon = withMaterialIcon('chat')

export const SearchIcon = withMaterialIcon('search')

export const DeleteIcon = withMaterialIcon('delete')

export const CloseIcon = withMaterialIcon('close')

export const RightIcon = withMaterialIcon('chevron-right')

export const AddIcon = withMaterialIcon('add')

export const VotedIcon = withMaterialIcon('where-to-vote')

export const MoreVerticalIcon = withMaterialIcon('more-vert')

export const MoreHorizontalIcon = withMaterialIcon('more-horiz')

export const NotifyIcon = withMaterialIcon('notifications')

export const HomeIcon = withFontAV5Icon('home')

export const DangerIcon = withFontAV5Icon('exclamation-triangle')

export const CopyIcon = withFontAV5Icon('copy')

export const CameraIcon = withFontAV5Icon('camera')

export const AtIcon = withFontAV5Icon('at')

export const EmojiIcon = withFontAV5Icon('grin-beam')

export const TagIcon = withFontAV5Icon('tag')

export const AngleLeftIcon = withFontAV5Icon('angle-left')

export const AngleRightIcon = withFontAV5Icon('angle-right')

export const LogoutIcon = withMaterialIcon('login')

export const ArrowLeftIcon = withMaterialIcon('arrow-back')

export const UserIcon = withFontAV5Icon('user')

export const UserFriendsIcon = withFontAV5Icon('user-friends')

export const FireIcon = withFontAV5Icon('fire-alt')

export const AwardIcon = withFontAV5Icon('award')

export const ChartBar = withFontAV5Icon('chart-bar')

export const LocationIcon = withFontAV5Icon('map-marker-alt')

export const GradeIcon = withFontAV5Icon('tag')

export const ClassIcon = withFontAV5Icon('users-class')

export const FaClockIcon = withFontAV5Icon('clock')

export const StarIcon = withFontAV5Icon('star')
