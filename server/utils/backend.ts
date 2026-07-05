import type { H3Event } from 'h3'

export const TOKEN_COOKIE = 'iniq_token'

export function getToken(event: H3Event): string | undefined {
  return getCookie(event, TOKEN_COOKIE)
}

export function setToken(event: H3Event, token: string) {
  setCookie(event, TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

function extractErrorMessage(error: unknown): string {
  const fetchError = error as {
    data?: { message?: string | string[] | { message?: string; missingDocuments?: string[] } }
    statusMessage?: string
    message?: string
  }

  const message = fetchError.data?.message ?? fetchError.statusMessage ?? fetchError.message

  if (typeof message === 'string') return message
  if (Array.isArray(message)) return message.join(', ')
  if (message && typeof message === 'object') {
    if ('missingDocuments' in message && Array.isArray(message.missingDocuments)) {
      return `Documentos em falta: ${message.missingDocuments.join('; ')}`
    }
    if ('message' in message && typeof message.message === 'string') {
      return message.message
    }
  }

  return 'Erro ao comunicar com o servidor'
}

export async function backendFetch<T>(
  event: H3Event,
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    body?: BodyInit | Record<string, unknown> | null
    auth?: boolean
    timeout?: number
  } = {},
): Promise<T> {
  const config = useRuntimeConfig(event)
  const { method = 'GET', body, auth = true, timeout } = options

  const headers: Record<string, string> = {}

  if (auth) {
    const token = getToken(event)
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
    }
    headers.Authorization = `Bearer ${token}`
  }

  const isJsonBody = body !== undefined && body !== null && !(body instanceof FormData)

  if (isJsonBody) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    return await $fetch<T>(`${config.backendUrl}${path}`, {
      method,
      headers,
      body: body as BodyInit,
      timeout: timeout ?? (body instanceof FormData ? 120_000 : 30_000),
    }) as T
  } catch (error: unknown) {
    const fetchError = error as { statusCode?: number; status?: number }
    throw createError({
      statusCode: fetchError.statusCode ?? fetchError.status ?? 500,
      statusMessage: extractErrorMessage(error),
    })
  }
}
