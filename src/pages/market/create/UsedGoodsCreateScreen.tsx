import React, { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeaderBackButton } from '@/components/Header'
import { Button } from '@/components/button'
import { NativeInput } from '@/components/form/NativeInput'
import { FieldError, FieldErrors, useForm } from 'react-hook-form'
import { ScreenHeight } from '@/shared/utils/utils'
import { MapPinIcon, PlusIcon } from 'react-native-heroicons/solid'
import { useImagePicker } from '@/shared/hooks/useImagePicker'
import { Image } from 'expo-image'
import clsx from 'clsx'
import { Closeable } from '@/components/Closeable'
import { Portal, Switch, TouchableRipple, useTheme } from 'react-native-paper'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import { Else, If, Then } from 'react-if'
import BottomSheet from '@gorhom/bottom-sheet'
import { DefaultBottomSheetBackdrop } from '@/components/sheet/DefaultBottomSheetBackdrop'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { useBoolean } from 'ahooks'
import { UsedGoodsCreateValidator } from '@/shared/validators/used-goods/validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Toast } from '@/shared/utils/toast'
import { UploadHoleImgRequest } from '@/request/apis/hole'
import { useMutation } from 'react-query'
import { Apis } from '@/request/apis'
import { useNavigation } from '@react-navigation/native'
import { useUsedGoodsDetail } from '@/swr/market/goods'
import { useImmer } from 'use-immer'
import { useParams } from '@/shared/hooks/useParams'

export const UsedGoodsCreateScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const bottomSheetRef = useRef<BottomSheetMethods>(null)

  const params = useParams<{ id: string; isEditable?: boolean }>()

  const { data } = useUsedGoodsDetail({
    enabled: !!params.isEditable,
  })

  const [width, setWidth] = useState(0)
  const [area, setArea] = useState<SchoolAreaEnum | null>(data?.area || null)
  const [category, setCategory] = useState<string>(
    data?.category?.name || '数码',
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UsedGoodsCreateValidator>({
    defaultValues: {
      price: data?.price.toFixed(2).toString(),
    },
    resolver: classValidatorResolver(UsedGoodsCreateValidator),
    mode: 'onChange',
  })

  const { imgs, setImgs, onImageSelect, removeImage } = useImagePicker({
    selectionLimit: 9,
    quality: 0.9,
    allowsMultipleSelection: true,
    onSuccess(asset) {
      // console.log(asset)
    },
  })

  const mutation = useMutation({
    mutationKey: ['used-goods-create', imgs, category, area, params.isEditable],
    mutationFn: async (data: UsedGoodsCreateValidator) => {
      let result: (never | string)[]

      try {
        result = await UploadHoleImgRequest(
          // 过滤已经上传了的图片，防止重复上传，拉取下来的图片只有一个uri属性，本地图片会有 .length > 1的特性
          imgs.filter((img) => Object.keys(img).length > 1),
        )
      } catch (err) {
        Toast.error({
          text1: '上传图片失败了~',
        })

        return
      }

      const dto = {
        imgs: result!,
        category: category!,
        area: area!,
        price: +data.price,
        body: data.body,
      }

      return params.isEditable
        ? Apis.usedGoods.editUsedGoods({
            ...dto,
            id: params.id,
            imgs: result!.concat(
              imgs
                .filter((img) => Object.keys(img).length === 1)
                .map((item) => item.uri),
            ),
          })
        : Apis.usedGoods.createUsedGoods(dto)
    },
    onSuccess() {
      Toast.success({
        text1: '商品发布成功！',
      })
      navigation.goBack()
    },
  })

  useEffect(() => {
    if (data) {
      const price = data.price.toFixed(2).toString()
      const dataImgs = data.imgs

      const body = data.body

      setImgs((draft) => {
        return dataImgs.map((item) => {
          return {
            uri: item,
          }
        })
      })

      setValue('body', body)

      setValue('price', price)
    }
  }, [data?.price])

  const onSubmit = (data: UsedGoodsCreateValidator) => {
    if (imgs.length > 9 || imgs.length === 0) {
      Toast.error({
        text1: '图片数量错误',
        text2: '请确保图片在1-9张之间哦',
      })
    }

    mutation.mutate(data)
  }

  const onError = (error: FieldErrors<UsedGoodsCreateValidator>) => {
    const key = Object.keys(
      error,
    )[0] as keyof FieldErrors<UsedGoodsCreateValidator>

    Toast.error({
      text1: error[key]?.message,
    })
  }

  const onSubmitPress = () => {
    setValue('area', area!)
    handleSubmit(onSubmit, onError)()
  }

  return (
    <SafeAreaView className={'flex-1 bg-background px-[2.5vw]'}>
      <View className={'w-full flex-row justify-between items-center'}>
        <BackHeaderBackButton />
        <Button
          mode={'text'}
          onPress={onSubmitPress}
          loading={mutation.isLoading}
        >
          发布
        </Button>
      </View>
      <View className={'px-3 py-2 item bg-white rounded-lg'}>
        <NativeInput
          name={'body'}
          control={control}
          placeholder={'描述一下宝贝哦，记得附上联系方式~'}
          style={{
            fontSize: 15,
            height: ScreenHeight * 0.15,
            maxHeight: ScreenHeight * 0.25,
          }}
          multiline={true}
        />

        <View className={'w-full items-center mt-2'}>
          <View
            className={clsx([
              'flex-row flex-wrap w-full space-x-2',
              {
                'justify-between space-x-0': imgs.length > 1,
              },
            ])}
            onLayout={(e) => {
              setWidth((e.nativeEvent.layout.width - 10) / 3)
            }}
          >
            {imgs.map((asset) => {
              return (
                <View>
                  <View className={'z-[2]'}>
                    <Closeable
                      onPress={() => {
                        removeImage(asset)
                      }}
                    />
                  </View>
                  <Image
                    className={'rounded-lg mt-2'}
                    source={{ uri: asset.uri }}
                    key={asset.uri}
                    style={{
                      width,
                      height: width,
                    }}
                  />
                </View>
              )
            })}
            <Pressable onPress={onImageSelect}>
              <View
                className={
                  'mt-2 flex-row rounded-lg bg-background p-2 items-center justify-center'
                }
                style={{
                  width,
                  height: width,
                }}
              >
                <PlusIcon size={16} color={'#a9a9ab'} fontWeight={'bold'} />
                <Text className={'text-tertiary-label font-bold'}>
                  宝贝图片
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className={'w-full justify-between flex-row'}>
          <TouchableOpacity
            activeOpacity={0.8}
            className={
              'flex-row items-center mt-2 bg-background pl-1 pr-2 py-1 rounded-full'
            }
            onPress={() => {
              bottomSheetRef.current?.expand?.()
            }}
          >
            <MapPinIcon size={18} color={theme.colors.backdrop} />
            <Text className={'text-tertiary-label text-xs'}>
              <If condition={area}>
                <Then>{area}</Then>

                <Else>请选择宝贝所在地</Else>
              </If>
            </Text>

            <Portal>
              <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['50%']}
                backdropComponent={DefaultBottomSheetBackdrop}
              >
                <View className={'bg-white p-4'}>
                  <Text className={'text-lg font-bold'}>选择宝贝所在地</Text>
                  <View className={'mt-2'}>
                    {Object.values(SchoolAreaEnum).map((item) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={item}
                        onPress={() => {
                          setArea(item)
                          bottomSheetRef.current?.close()
                        }}
                      >
                        <View
                          className={clsx([
                            'rounded-lg p-2',
                            {
                              'bg-primary': area === item,
                            },
                          ])}
                        >
                          <Text
                            className={clsx([
                              'text-lg text-primary-label font-bold',
                              {
                                'text-white': area === item,
                              },
                            ])}
                          >
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </BottomSheet>
            </Portal>
          </TouchableOpacity>
        </View>
      </View>

      <View className={'p-3 rounded-lg bg-white mt-4'}>
        <View className={'py-2 flex-row space-x-2 items-center'}>
          <Text className={'text-lg font-bold'}>分类</Text>
          <ScrollView horizontal={true}>
            {[
              '数码',
              '手机平板',
              '电脑设备',
              '图书/教科书',
              '美妆个护',
              '小零食',
              '小玩具/手办',
              '电器家具',
              '代步工具',
              '服饰鞋帽',
              '运动健身',
              '寝室家具',
              '其它',
            ].map((item) => {
              // 咸鱼那种横向的分类，ScrollView horization
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setCategory(item)
                  }}
                >
                  <View
                    className={clsx([
                      'rounded-md p-1 px-2',
                      {
                        'bg-primary': category === item,
                      },
                    ])}
                  >
                    <Text
                      className={clsx([
                        'text-sm text-primary-label',
                        {
                          'text-white font-bold': category === item,
                        },
                      ])}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <View className={'py-2 flex-row items-center justify-between'}>
          <Text className={'text-lg font-bold'}>价格</Text>
          <View className={'flex-row space-x-1 items-center'}>
            <Text className={'flex-row font-bold text-primary text-lg'}>¥</Text>
            <View>
              <NativeInput
                name={'price'}
                control={control}
                placeholder={'请输入价格'}
                style={{
                  color: theme.colors.primary,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                keyboardType={'numeric'}
                defaultValue={'0.00'}
              />
            </View>
          </View>
        </View>
      </View>

      <View className={'p-3 rounded-lg mt-2 bg-white'}>
        <View className={'flex-row justify-between'}>
          <Text className={'text-md font-bold text-primary-label text-lg'}>
            平台协议
          </Text>
        </View>

        <View className={'mt-2 bg-[#efefef] p-2 rounded-md'}>
          <Text className={'text-tertiary-label font-bold whitespace-pre-wrap'}>
            {`欢迎使用本校内二手交易平台。本平台仅提供商品上架展示和用户交流功能，所有交易行为均在线下进行，与平台无关。请用户自行核实商品信息，谨慎交易。
平台责任：本平台不对交易过程及结果承担任何责任，如有疑问请自行联系交易双方，若发现虚假信息或违规行为，请及时举报。
用户行为：用户需对自身行为负责，不得发布虚假信息或侵犯他人权益。
争议处理：如发生争议，用户应自行协商解决。`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
