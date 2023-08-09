import { FAB, FABProps, useTheme } from 'react-native-paper'

interface PostFabProps {
  bgColor: string
}

export function PostFAB(props: Partial<FABProps> & PostFabProps) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: props.bgColor,
      }}
      icon={'plus'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`absolute bottom-5 right-2 rounded-full ${props.className}`}
    />
  )
}
