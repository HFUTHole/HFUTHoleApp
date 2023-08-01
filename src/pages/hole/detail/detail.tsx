import { useStatusBarContext } from '@/shared/context/statusbar'
import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { LoadingScreen } from '@/components/LoadingScreen'
import { HoleDetailComment } from '@/pages/hole/detail/components/Comment'
import { StatusBar, View } from 'react-native'
import { CommentMaskModal } from '@/pages/hole/detail/components/CommentMaskModal'

export function HoleDetail() {
  const { setWhiteColor } = useStatusBarContext()

  const { isSuccess: isCommentSuccess } = useHoleComment()

  const { isSuccess } = useHoleDetail()

  const isAllSuccess = isCommentSuccess && isSuccess

  setWhiteColor()

  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <LoadingScreen isLoading={!isAllSuccess}>
        <View className={'bg-white'}>
          <HoleDetailComment />
        </View>
        <CommentMaskModal />
      </LoadingScreen>
    </>
  )
}
