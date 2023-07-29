import { createStore } from 'hox'
import { useImmer } from 'use-immer'
import { useForm } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { useState } from 'react'
import { ArticleCategoryEnum } from '@/shared/enums'
import { ImagePickerResult } from 'expo-image-picker'
import { HolePostVoteClassValidator } from '@/shared/validators/hole/post'

export const [useHolePostContext, HolePostContextProvider] = createStore(() => {
  // TODO write a array useImmer with splice
  const [tags, setTags] = useImmer<string[]>([])
  const [imgs, setImgs] = useImmer<ImagePickerResult['assets']>([])
  const [bilibili, setBilibili] = useState<string | null>(null)
  const [category, setCategory] = useState<ArticleCategoryEnum>(
    ArticleCategoryEnum.hfutLife
  )
  const [votes, setVotes] = useState<HolePostVoteClassValidator>({
    items: [],
  })

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
  }
})
