import { createStore } from 'hox'
import { useImmer } from 'use-immer'
import { useForm } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { useEffect, useMemo, useState } from 'react'
import { ImagePickerResult } from 'expo-image-picker'
import { HolePostVoteClassValidator } from '@/shared/validators/hole/post'
import { HoleClassification } from '@/shared/enums/category.enum'
import { getCategoryByName } from '@/shared/constants/category'

export const [useHolePostContext, HolePostContextProvider] = createStore(() => {
  // TODO write a array useImmer with splice
  const [tags, setTags] = useImmer<string[]>([])
  const [imgs, setImgs] = useImmer<ImagePickerResult['assets']>([])
  const [bilibili, setBilibili] = useState<string | null>(null)

  const [category, setCategory] = useState<HoleClassification>(
    HoleClassification.life,
  )

  const [votes, setVotes] = useState<HolePostVoteClassValidator>({
    items: [],
  })

  // 光标选择位置
  const [cursor, setCursor] = useState({start: 0, end: 0})
  // 是否在将 cursor 位置更新到输入框
  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false)

  const {
    formState: { errors },
    ...form
  } = useForm<PostHoleValidator>({
    resolver: classValidatorResolver(PostHoleValidator),
  })

  return {
    form,
    tags,
    setTags,
    imgs,
    setImgs,
    votes,
    setVotes,
    bilibili,
    setBilibili,
    category,
    setCategory,
    cursor,
    setCursor,
    shouldUpdateCursor,
    setShouldUpdateCursor,
  }
})
