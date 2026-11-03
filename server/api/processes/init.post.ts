import { backendFetch, setToken } from '../../utils/backend'

export default defineEventHandler(async (event) => {
  // Reencaminha o multipart original (com o boundary do browser) sem reconstruir o FormData
  const body = await readRawBody(event, false)
  const contentType = getRequestHeader(event, 'content-type')

  const response = await backendFetch<{
    process: { id: string; referenceNumber: string }
    user: { user: { id: string; email: string; role: string }; token: string }
    referenceNumber: string
    receiptNote?: { referenceNumber: string; message: string }
  }>(event, '/process/init', {
    method: 'POST',
    body,
    headers: contentType ? { 'Content-Type': contentType } : {},
    auth: false,
  })

  if (response.user?.token) {
    setToken(event, response.user.token)
  }

  return response
})
