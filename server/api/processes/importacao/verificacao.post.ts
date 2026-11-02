import { backendFetch } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const backendFormData = new FormData()

  for (const [key, value] of formData.entries()) {
    backendFormData.append(key, value)
  }

  return backendFetch<{
    process?: { id: string; referenceNumber: string }
    referenceNumber: string
  }>(event, '/process/importacao/verificacao', {
    method: 'POST',
    body: backendFormData,
    auth: false,
    timeout: 180_000,
  })
})
