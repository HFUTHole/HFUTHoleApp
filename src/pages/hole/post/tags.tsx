import { useForm } from 'react-hook-form'
import { useHolePostContext } from '@/shared/context/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Limit } from '@/shared/config'
import { Button, Dialog, IconButton, Portal } from 'react-native-paper'
import { Input } from '@/components/form/Input'
import React, { useState } from 'react'
import { IsString, MaxLength } from 'class-validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Tags } from '@/components/tags'
import { getQAQFont } from '@/shared/utils/utils'
import { TagIcon } from '@/components/icon'

enum InputError {
  MaximumExceeded = 'MaximumExceeded',
  Duplicate = 'Duplicate',
}

class Validator {
  @MaxLength(Limit.holeVoteOptionLength, {
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @IsString()
  tag: string
}

// TODO 抽象成基础组件
export function HolePostAddTags() {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<Validator>({
    resolver: classValidatorResolver(Validator),
  })

  const [visible, setVisible] = useState(false)

  const {
    tags,
    setTags,
    form: { setValue: setRootValue },
  } = useHolePostContext()

  const handleTagsInput = useDebounce(
    () => {
      if (errors?.tag?.type === InputError.MaximumExceeded) {
        clearErrors('tag')
      }

      const tagValue = getValues('tag')
      const matchedAllIterator = Array.from(tagValue.matchAll(/(\S+)\s{1}/g))

      for (const matched of matchedAllIterator) {
        const matchedVal = matched[1]
        if (tags.length < Limit.holeTagsMaxLength) {
          if (!tags.includes(matchedVal)) {
            setTags((prev) => prev.concat(matchedVal))
            setValue('tag', '')
            clearErrors('tag')
          } else {
            setError('tag', {
              message: `标签#${matchedVal}重复了哦`,
              type: InputError.Duplicate,
            })
          }
        }
      }
    },
    { wait: 100 },
  )

  const handleTagClose = useDebounce(
    (index: number) => {
      setTags((draft) => {
        draft.splice(index, 1)
      })
    },
    { wait: 50 },
  )

  const closeDialog = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    closeDialog()
    setRootValue('tags', tags)
  }

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Title>添加标签</Dialog.Title>
          <Dialog.Content>
            <Tags tags={tags} onTagClick={handleTagClose} icon={'close'} />
            <Input
              name={'tag'}
              control={control}
              mode={'flat'}
              onTextInput={handleTagsInput}
              placeholder={`输入标签按空格就能添加了哦${getQAQFont('happy')}`}
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <IconButton icon={() => <TagIcon />} onPress={() => setVisible(true)} />
    </>
  )
}
