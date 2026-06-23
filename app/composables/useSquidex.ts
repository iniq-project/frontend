import { print, type DocumentNode } from 'graphql'

export const useSquidex = () => {
  const query = async <T = any>(
    graphqlQuery: string | DocumentNode,
    options: {
      instance?: 'squidex'
      variables?: Record<string, any>
      key?: string
    } = {}
  ): Promise<Ref<T | null>> => {
    const { instance = 'squidex', variables, key = '' } = options

    const queryString = typeof graphqlQuery === 'string'
      ? graphqlQuery
      : print(graphqlQuery)

    const { data, error } = await useAsyncData<T>(key, () =>
      $fetch('/api/squidex', {
        method: 'POST',
        body: { instance, query: queryString, variables },
      })
    )
    return data
  }

  return { query }
}
