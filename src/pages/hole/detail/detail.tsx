import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { LoadingScreen } from '@/components/LoadingScreen'
import { HoleDetailComment } from '@/pages/hole/detail/components/Comment'
import { StatusBar, View } from 'react-native'
import { CommentMaskModal } from '@/pages/hole/detail/components/CommentMaskModal'
import { CommentEventBusProvider } from '@/shared/context/comment/eventBus'

export function HoleDetail() {
  const { isSuccess: isCommentSuccess } = useHoleComment()

  const { isSuccess } = useHoleDetail()

  const isAllSuccess = isCommentSuccess && isSuccess

  return (
    <>
      <LoadingScreen isLoading={!isAllSuccess}>
        <CommentEventBusProvider>
          <View className={'bg-white'}>
            <HoleDetailComment />
          </View>
          <CommentMaskModal />
        </CommentEventBusProvider>
      </LoadingScreen>
    </>
  )
}
