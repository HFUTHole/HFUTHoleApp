import { useTheme } from 'react-native-paper'
import { CopyIcon, DangerIcon } from '@/components/icon'
import React, { useMemo } from 'react'
import { ReportType } from '@/shared/validators/report'
import { MoreActionWithSheet } from '@/pages/hole/components/sheet/MoreActionWithSheet'
import { copyToClipboard } from '@/shared/utils/keyboard'

interface Props {
  data: IHole
}

export function HoleBottomAction({ data }: Props) {
  const actions = useMemo(
    () => [
      {
        text: '复制帖子',
        icon: CopyIcon,
        onPress: () => {
          copyToClipboard(data?.body)
        },
      },
    ],
    [],
  )

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
