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
  const [subCategory, setSubCategory] = useState<string>(
    getCategoryByName(category).children[0],
  )
  const subCategories = useMemo(
    () => getCategoryByName(category).children,
    [category],
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

  useEffect(() => {
    setSubCategory(getCategoryByName(category).children[0])
  }, [category])

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
    subCategory,
    setSubCategory,
    subCategories,
  }
})
