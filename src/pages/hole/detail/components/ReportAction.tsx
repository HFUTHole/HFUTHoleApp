import React from 'react'
import { Dialog, Portal } from 'react-native-paper'
import { Button } from '@/components/button'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { ReportValidator } from '@/shared/validators/report'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ScreenHeight } from '@/shared/utils/utils'
import { useMutation } from 'react-query'
import { ReportRequest } from '@/request/apis/report'
import { Toast } from '@/shared/utils/toast'

export interface ReportActionProps {
  type: ReportValidator['type']
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id: string | number
}

// TODO 重构Dialog为白色或者暗黑色
export function ReportAction({
  visible,
  setVisible,
  ...props
}: ReportActionProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReportValidator>({
    mode: 'all',
    resolver: classValidatorResolver(ReportValidator),
  })

  const mutation = useMutation(
    (reason: string) => {
      const params = {}

      if (props.type === 'comment') {
        params['commentId'] = props.id
      } else if (props.type === 'reply') {
        params['replyId'] = props.id
      } else {
        params['holeId'] = props.id
      }

      return ReportRequest({
        reason,
        type: props.type,
        ...params,
      })
    },
    {
      onSuccess() {
        Toast.success({
          text1: '举报成功',
        })
        closeDialog()
      },
    }
  )

  const openDialog = () => setVisible(true)

  const closeDialog = () => setVisible(false)

  const onSubmit = (data: Pick<ReportValidator, 'reason'>) => {
    mutation.mutate(data.reason)
  }

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={closeDialog}
          style={{ backgroundColor: '#fff' }}
        >
          <Dialog.Title>举报</Dialog.Title>
          <Dialog.Content>
            <Input
              name={'reason'}
              style={{ height: ScreenHeight * 0.2 }}
              control={control}
              placeholder={'请输入举报理由'}
              transparent
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={mutation.isLoading}
            >
              确定
            </Button>
            <Button onPress={closeDialog}>取消</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
