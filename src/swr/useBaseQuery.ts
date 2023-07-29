import {
  InfiniteData,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { Updater } from 'react-query/types/core/utils'
import { SetDataOptions } from 'react-query/types/core/types'

interface Options<T> extends UseQueryOptions<T> {}

export function useBaseQuery<T>(options: Options<T>) {
  const query = useQuery<T>(options)

  const client = useQueryClient()

  const setData = async (
    updater: Updater<T | undefined, T>,
    setOptions?: SetDataOptions
  ) => {
    await client.setQueryData<T>(options.queryKey!, updater, setOptions)
  }

  const invalidateData = () => client.invalidateQueries(options.queryKey)

  return {
    ...query,
    setData,
    client,
    invalidateData,
  }
}
