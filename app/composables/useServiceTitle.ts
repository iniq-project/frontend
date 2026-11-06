import { services } from "~/data/services"

/** Keep service page titles aligned with the menu names published in Squidex. */
export async function useServiceTitle(serviceId: string) {
  const nuxtApp = useNuxtApp()
  const { getMenuTitle } = await useMenuTitles()
  const fallback = services.find((service) => service.id === serviceId)?.title || ""
  const title = computed(() => getMenuTitle(serviceId, fallback))

  nuxtApp.runWithContext(() => {
    useHead({ title: () => `INIQ » ${title.value}` })
  })

  return title
}
