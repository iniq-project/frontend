import { print, type DocumentNode } from 'graphql'

// Squidex GraphQL responses stay open until a schema is generated.
type SquidexResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useSquidex = () => {
  const query = async <T = SquidexResult>(
    graphqlQuery: string | DocumentNode,
    options: {
      instance?: 'squidex'
      variables?: Record<string, unknown>
      key?: string
    } = {}
  ): Promise<Ref<T | null>> => {
    const { instance = 'squidex', variables, key = '' } = options

    const queryString = typeof graphqlQuery === 'string'
      ? graphqlQuery
      : print(graphqlQuery)

    const { data } = await useAsyncData<T>(key, () =>
      $fetch('/api/squidex', {
        method: 'POST',
        body: { instance, query: queryString, variables },
      })
    )
    return data
  }

  return { query }
}
