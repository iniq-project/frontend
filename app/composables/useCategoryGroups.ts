import { ref, computed, toValue, type MaybeRefOrGetter } from "vue"

export interface CategoryGroup {
  name: string
  count: number
}

export function useCategoryGroups<T extends Record<string, any>>(
  source: MaybeRefOrGetter<T[]>,
  categoryKey: string = "categoria",
) {
  const list = computed(() => toValue(source))

  const groups = computed<CategoryGroup[]>(() => {
    const counts = new Map<string, number>()
    for (const item of list.value) {
      const name = item[categoryKey] || "Sem categoria"
      counts.set(name, (counts.get(name) || 0) + 1)
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  const selectedCategory = ref<string | null>(null)

  const itemsInCategory = computed(() =>
    selectedCategory.value
      ? list.value.filter((item) => item[categoryKey] === selectedCategory.value)
      : [],
  )

  const selectCategory = (name: string) => {
    selectedCategory.value = name
  }

  const backToCategories = () => {
    selectedCategory.value = null
  }

  return {
    groups,
    selectedCategory,
    itemsInCategory,
    selectCategory,
    backToCategories,
  }
}
