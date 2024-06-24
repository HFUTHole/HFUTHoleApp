import { useTheme } from 'react-native-paper'
import { CopyIcon, DangerIcon, DeleteIcon } from '@/components/icon'
import React, { useMemo } from 'react'
import { ReportType } from '@/shared/validators/report'
import { MoreActionWithSheet } from '@/pages/hole/components/sheet/MoreActionWithSheet'
import { copyToClipboard } from '@/shared/utils/keyboard'
import { Alert } from 'react-native'
import { useMutation } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { Apis } from '@/request/apis'
import { Toast } from '@/shared/utils/toast'
import { useUserProfile } from '@/swr/user/profile'
import { match } from 'ts-pattern'

interface Props {
  data: IHole
}

export function HoleBottomAction({ data }: Props) {
  const { data: userData } = useUserProfile()
  const mutation = useMutation({
    mutationKey: [SWRKeys.hole.delete, data.id],
    mutationFn: (data: { id: number }) => {
      return Apis.hole.delete(data)
    },
    onSuccess() {
      Toast.success({
        text1: '删除成功！',
      })
    },
  })

  const isOwner = data.user.id === userData?.id

  const actions = [
    {
      text: '复制帖子',
      icon: CopyIcon,
      onPress: () => {
        copyToClipboard(data?.body)
      },
    },
    {
      text: '删除帖子',
      icon: DeleteIcon,
      hidden: !isOwner,
      onPress: () => {
        Alert.alert('删除？', '确定要删除帖子么？', [
          {
            text: '确定',
            onPress() {
              mutation.mutate({
                id: data.id,
              })
            },
          },
          {
            text: '取消',
            onPress() {},
          },
        ])
      },
    },
  ].filter((item) => !item.hidden)

  return (
    <>
      <MoreActionWithSheet
        list={actions}
        report={{
          type: ReportType.hole,
          id: data?.id,
        }}
      />
    </>
  )
}
