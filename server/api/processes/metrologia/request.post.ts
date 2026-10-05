import { backendFetch, setToken } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const backendFormData = new FormData()

  for (const [key, value] of formData.entries()) {
    backendFormData.append(key, value)
  }

  const response = await backendFetch<{
    process: { id: string; referenceNumber: string }
    user: { user: { id: string; email: string; role: string }; token: string }
    referenceNumber: string
  }>(event, '/process/metrologia/request', {
    method: 'POST',
    body: backendFormData,
    auth: false,
    timeout: 180_000,
  })

  if (response.user?.token) {
    setToken(event, response.user.token)
  }

  return response
})
