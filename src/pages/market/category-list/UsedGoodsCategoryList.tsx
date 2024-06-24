import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '@/components/Header'
import { useCategoryParams } from '@/shared/hooks/route/useUsedGoodsRoute'
import { useUsedGoodsCategoryORAreaQuery } from '@/swr/market/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Text, TouchableOpacity, View } from 'react-native'
import { UsedGoodsColumnList } from '@/pages/market/components/UsedGoodsColumnList'
import { AntdIcon } from '@/components/icon'
import Popover from 'react-native-popover-view'
import { SchoolAreaEnum } from '@/shared/enums/school-area.enum'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { CheckIcon } from 'react-native-heroicons/solid'
import { useBoolean } from 'ahooks'
import { Else, If, Then } from 'react-if'

export const UsedGoodsCategoryListScreen: React.FC = () => {
  const [showPopover, showPopoverActions] = useBoolean(false)
  const [area, setArea] = useState<SchoolAreaEnum>(SchoolAreaEnum.xc)

  const params = useCategoryParams()
  const query = useUsedGoodsCategoryORAreaQuery({
    area,
  })

  const theme = useTheme()

  return (
    <SafeAreaView className={'flex-1 bg-white'}>
      <BackHeader
        title={params.category}
        rightChild={
          <Popover
            arrowSize={{
              width: 0,
              height: 0,
            }}
            from={
              <TouchableOpacity
                activeOpacity={0.8}
                className={
                  'pr-[2.5vw] flex-row space-x-1 items-center justify-center'
                }
                onPress={() => {
                  showPopoverActions.setTrue()
                }}
              >
                <Text className={'font-bold text-black'}>校区 {area}</Text>
                <AntdIcon.caredown color={'#000'} size={12} />
              </TouchableOpacity>
            }
            onRequestClose={showPopoverActions.setFalse}
            isVisible={showPopover}
          >
            <View className={'rounded-lg w-40'}>
              {Object.keys(SchoolAreaEnum).map((key) => {
                const schoolArea =
                  SchoolAreaEnum[key as keyof typeof SchoolAreaEnum]

                return (
                  <TouchableRipple
                    key={key}
                    className={'p-4 border-b-[1px] border-b-black/5'}
                    onPress={() => {
                      setArea(schoolArea)
                      showPopoverActions.setFalse()
                    }}
                  >
                    <View
                      className={'flex-1 flex-row items-center justify-between'}
                    >
                      <Text>{schoolArea}</Text>
                      <If condition={schoolArea === area}>
                        <Then>
                          <CheckIcon size={18} color={theme.colors.primary} />
                        </Then>
                        <Else>
                          <></>
                        </Else>
                      </If>
                    </View>
                  </TouchableRipple>
                )
              })}
            </View>
          </Popover>
        }
      />
      <LoadingScreen isLoading={query.isLoading}>
        <View className={'flex-1 bg-[#efefef]'}>
          <UsedGoodsColumnList {...query} />
        </View>
      </LoadingScreen>
    </SafeAreaView>
  )
}
