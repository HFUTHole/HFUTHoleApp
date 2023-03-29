import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useHolePostContext } from '@/shared/context/hole'
import { Tags } from '@/components/tags'
import { MyAvatar } from '@/components/MyAvatar'

export function HolePostBody() {
  const {
    tags,
    form: { control },
  } = useHolePostContext()

  return (
    <View
      className={'rounded-lg bg-white p-3 grid space-y-3 mt-3 relative'}
      style={{ height: ScreenHeight * 0.8 }}
    >
      <MyAvatar />
      <Tags tags={tags} />
      <View>
        <Input
          name={'body'}
          control={control}
          multiline={true}
          style={{
            height: ScreenHeight * 0.6,
          }}
        />
      </View>
      <BottomActions />
    </View>
  )
}
