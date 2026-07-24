import menuQuery from "@/gql/menu/index.gql"

const MENU_FIELD_BY_SERVICE_ID: Record<string, string> = {
  normalizacao: "normalizacao",
  metrologia: "metrologia",
  "registo-cadastro": "registoCadastro",
  importacao: "importacao",
  formacao: "formacao",
  rotulos: "rotulos",
  "premio-qualidade": "premioQualidade",
  eventos: "eventos",
  forum: "forum",
}

export async function useMenuTitles() {
  const { query } = useSquidex()
  const menuData = await query(menuQuery, { key: "menu-service" })

  const getMenuTitle = (serviceId: string, fallback: string) => {
    const field = MENU_FIELD_BY_SERVICE_ID[serviceId]
    const value = field
      ? menuData.value?.data?.queryMenuserviceContents?.[0]?.data?.[field]
      : undefined
    return value || fallback
  }

  return { getMenuTitle }
}
