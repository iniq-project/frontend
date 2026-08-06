import { backendFetch } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return backendFetch(event, '/process/normalizacao/purchase', {
    method: 'POST',
    body,
    auth: false,
  })
})
