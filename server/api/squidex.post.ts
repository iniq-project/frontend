import { getSquidexToken, getSquidexInstances } from '../utils/squidex'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { instance = 'squidex', query, variables } = await readBody(event)


  const instances = getSquidexInstances(config)
  const selected = instances[instance as keyof typeof instances] ?? instances.squidex
  const { url, appName, clientId, clientSecret } = selected

  if (!url || !appName || !clientId || !clientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Squidex configuration is incomplete',
    })
  }

  const token = await getSquidexToken(url, clientId, clientSecret)

  return $fetch(`${url}/api/content/${appName}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  })
})
