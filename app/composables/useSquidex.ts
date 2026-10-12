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

    const { data } = await useAsyncData<T>(key, async () => {
      const response = await $fetch<any>('/api/squidex', {
        method: 'POST',
        body: { instance, query: queryString, variables },
      })

      // Squidex answers GraphQL schema errors with HTTP 200 + { errors: [...] }
      // and no `data`. Surface them instead of letting `undefined` propagate
      // into the pages (which would crash SSR on the first field access).
      if (response && Array.isArray(response.errors) && response.errors.length) {
        console.warn(
          `[squidex] GraphQL errors for key "${key || 'anonymous'}":`,
          response.errors.map((e: any) => e.message).join(' | ')
        )
      }

      return response
    })
    return data
  }

  return { query }
}
