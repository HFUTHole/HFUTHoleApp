import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { View } from 'react-native'
import { FieldErrors, useForm } from 'react-hook-form'
import { SearchValidator } from '@/shared/validators/hole/search'
import { useParams } from '@/shared/hooks/useParams'
import { useTheme } from 'react-native-paper'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { AntdIcon, CloseIcon, SearchIcon } from '@/components/icon'
import { SearchInput } from '@/components/form/Search'
import { Toast } from '@/shared/utils/toast'
import { useEffect } from 'react'
import { BackHeaderBackButton } from '@/components/Header'
import { Button } from '@/components/button'

export interface SearchHeaderProps {
  placeholder?: string
  autoFocus?: boolean
  onSubmit: (data: SearchValidator) => void
  onDeleteInput?: () => void
  onChange?: (value: string) => void
}

export function SearchHeader({
  placeholder,
  autoFocus = true,
  onSubmit,
  onDeleteInput,
  onChange,
}: SearchHeaderProps) {
  const theme = useTheme()
  const params = useParams<ISearchResultParams>()

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { dirtyFields },
  } = useForm<SearchValidator>({
    defaultValues: {
      keywords: params?.keywords || '',
    },
  })

  const keywords = watch('keywords')

  useEffect(() => {
    onChange?.(keywords)
  }, [keywords])

  const onError = (error: FieldErrors<SearchValidator>) => {
    Toast.error({
      text1: error.keywords!.message,
    })
  }

  const deleteInput = () => {
    setValue('keywords', '', { shouldDirty: true })
    onDeleteInput?.()
  }

  const onHandleSubmit = handleSubmit(onSubmit, onError)

  return (
    <View className={'bg-white flex-row items-center'}>
      <BackHeaderBackButton />
      <View
        className={
          'flex bg-[#f1f1f1] flex-[5] flex-row space-x-2 rounded-md items-center px-3 py-1'
        }
      >
        <AntdIcon.search size={18} />
        <View className={'h-6 flex-1 justify-center'}>
          <SearchInput
            name={'keywords'}
            control={control}
            className={'text-xs'}
            cursorColor={theme.colors.primary}
            placeholder={placeholder}
            maxLength={100}
            onSubmitEditing={onHandleSubmit}
            autoFocus={autoFocus}
          />
        </View>
        {dirtyFields.keywords && <CloseIcon size={16} onPress={deleteInput} />}
      </View>
      <Button mode={'text'} onPress={onHandleSubmit}>
        搜索
      </Button>
    </View>
  )
}
