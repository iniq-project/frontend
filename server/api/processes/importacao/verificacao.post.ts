import { backendFetch } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  // Reencaminha o multipart original (com o boundary do browser) sem reconstruir o FormData
  const body = await readRawBody(event, false)
  const contentType = getRequestHeader(event, 'content-type')

  return backendFetch<{
    process?: { id: string; referenceNumber: string }
    referenceNumber: string
  }>(event, '/process/importacao/verificacao', {
    method: 'POST',
    body,
    headers: contentType ? { 'Content-Type': contentType } : {},
    auth: false,
    timeout: 180_000,
  })
})
