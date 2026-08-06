import { backendFetch } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return backendFetch(event, '/process/regulamentos/purchase', {
    method: 'POST',
    body,
    auth: false,
  })
})
