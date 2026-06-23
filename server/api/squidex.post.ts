import { getSquidexToken, getSquidexInstances } from '../utils/squidex'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { instance = 'squidex', query, variables } = await readBody(event)


  const instances = getSquidexInstances(config)
  const selected = instances['squidex']

  const token = await getSquidexToken(selected.url, selected.clientId, selected.clientSecret)

  return $fetch(`${selected.url}/api/content/${selected.appName}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  })
})
