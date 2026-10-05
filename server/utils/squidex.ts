type TokenResponse = {
  access_token: string
  expires_in: number
}

type TokenCacheEntry = {
  accessToken: string
  expiresAt: number
  pending?: Promise<string>
}

const tokenCache = new Map<string, TokenCacheEntry>()
const TOKEN_SAFETY_MARGIN_MS = 60_000

export const getSquidexToken = async (url: string, clientId: string, clientSecret: string) => {
  const cacheKey = `${url}:${clientId}`
  const cached = tokenCache.get(cacheKey)
  const now = Date.now()

  if (cached?.accessToken && cached.expiresAt > now) {
    return cached.accessToken
  }

  if (cached?.pending) {
    return cached.pending
  }

  const pending = (async () => {
    const response = await $fetch<TokenResponse>(`${url}/identity-server/connect/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'squidex-api',
      }).toString(),
    })

    const expiresInMs = (response.expires_in || 3600) * 1000
    tokenCache.set(cacheKey, {
      accessToken: response.access_token,
      expiresAt: Date.now() + expiresInMs - TOKEN_SAFETY_MARGIN_MS,
    })

    return response.access_token
  })()

  tokenCache.set(cacheKey, {
    accessToken: cached?.accessToken ?? '',
    expiresAt: cached?.expiresAt ?? 0,
    pending,
  })

  try {
    return await pending
  } catch (error) {
    tokenCache.delete(cacheKey)
    throw error
  }
}


interface SquidexRuntimeConfig {
  public: {
    url?: string
    appName?: string
  }
  squidex: {
    clientId?: string
    clientSecret?: string
  }
}

export const getSquidexInstances = (config: SquidexRuntimeConfig) => ({
  squidex: {
    url: config.public.url,
    appName: config.public.appName,
    clientId: config.squidex.clientId,
    clientSecret: config.squidex.clientSecret,
  },
})
