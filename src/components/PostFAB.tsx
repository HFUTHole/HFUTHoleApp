import { FAB, FABProps, useTheme } from 'react-native-paper'

export function PostFAB(props: Partial<FABProps>) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: theme.colors.primary,
      }}
      icon={'plus'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`absolute right-0 rounded-full ${props.className}`}
    />
  )
}
