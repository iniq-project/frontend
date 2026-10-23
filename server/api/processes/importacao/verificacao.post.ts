import { backendFetch } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return backendFetch<{
    process?: { id: string; referenceNumber: string }
    referenceNumber: string
  }>(event, '/process/importacao/verificacao', {
    method: 'POST',
    body,
    auth: false,
    timeout: 180_000,
  })
})
