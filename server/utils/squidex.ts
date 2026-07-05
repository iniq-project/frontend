export const getSquidexToken = async (url: string, clientId: string, clientSecret: string) => {
  const response = await $fetch<{ access_token: string }>(`${url}/identity-server/connect/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'squidex-api',
    }).toString(),
  })
  return response.access_token
}


export const getSquidexInstances = (config: any) => ({
  squidex: {
    url: config.public.url,
    appName: config.public.appName,
    clientId: config.squidex.clientId,
    clientSecret: config.squidex.clientSecret,
  },
})
