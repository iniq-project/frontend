import { backendFetch, setToken } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  // Reencaminha o multipart original (com o boundary do browser) sem reconstruir o FormData
  const body = await readRawBody(event, false)
  const contentType = getRequestHeader(event, 'content-type')

  const response = await backendFetch<{
    process: { id: string; referenceNumber: string }
    user: { user: { id: string; email: string; role: string }; token: string }
    referenceNumber: string
  }>(event, '/process/metrologia/request', {
    method: 'POST',
    body,
    headers: contentType ? { 'Content-Type': contentType } : {},
    auth: false,
    timeout: 180_000,
  })

  if (response.user?.token) {
    setToken(event, response.user.token)
  }

  return response
})
