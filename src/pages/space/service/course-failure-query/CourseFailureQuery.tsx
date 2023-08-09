import { LoadingScreen } from '@/components/LoadingScreen'
import { View } from 'react-native'
import { useSpaceCourseFailureQuery } from '@/swr/space/course/failure'
import { DataTable, Text } from 'react-native-paper'
import { formatSemester } from '@/pages/space/@utils/utils'
import { CourseFailureRateQueryChart } from '@/pages/space/service/course-failure-query/Chart'

export function CourseFailureQuery() {
  const { data, isLoading, courseName } = useSpaceCourseFailureQuery()

  return (
    <LoadingScreen isLoading={isLoading}>
      <View className={'p-2'}>
        <View className={'px-2 py-4 bg-white rounded-lg space-y-5'}>
          <DataTable>
            <Text className={'text-center'} variant={'titleMedium'}>
              {courseName}
            </Text>
            <DataTable.Header>
              <DataTable.Title>学年</DataTable.Title>
              <DataTable.Title>统计人数</DataTable.Title>
              <DataTable.Title>平均分</DataTable.Title>
              <DataTable.Title>挂科人数</DataTable.Title>
              <DataTable.Title>挂科率</DataTable.Title>
            </DataTable.Header>
            {data?.map((item) => (
              <DataTable.Row key={item.semesterName}>
                <DataTable.Cell>
                  {formatSemester(item.semesterName)}
                </DataTable.Cell>
                <DataTable.Cell>{item.totalCount}</DataTable.Cell>
                <DataTable.Cell>{item.avgScore.toFixed(2)}</DataTable.Cell>
                <DataTable.Cell>{item.failCount}</DataTable.Cell>
                <DataTable.Cell>
                  {(item.failRate * 100).toFixed(2)}%
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <View className={'w-full h-80'}>
            <CourseFailureRateQueryChart />
          </View>
        </View>
      </View>
    </LoadingScreen>
  )
}
