import { View } from 'react-native'
import { AllEmoji } from './AllEmoji'
import { RecentEmoji } from './RecentEmoji'
import Animated, { ZoomInDown, ZoomInUp } from 'react-native-reanimated'

export const EmojiCard = ({
  onPress,
}: {
  onPress?: (emoji: string) => void
}) => {
  return (
    <Animated.View entering={ZoomInDown} exiting={ZoomInUp}>
      <View
        className={
          'absolute z-[2] top-[-20] left-4 right-4 bg-white rounded-lg p-2'
        }
        style={{
          shadowColor: '#888',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <RecentEmoji onPress={onPress} />
        <AllEmoji onPress={onPress} />
      </View>
    </Animated.View>
  )
}
