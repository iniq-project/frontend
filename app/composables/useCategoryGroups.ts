import { ref, computed, toValue, type MaybeRefOrGetter } from "vue"

export interface CategoryGroup {
  name: string
  count: number
}

function categoryName(item: object, categoryKey: string): string {
  const raw = (item as Record<string, unknown>)[categoryKey]
  return typeof raw === "string" && raw.length > 0 ? raw : "Sem categoria"
}

export function useCategoryGroups<T extends object>(
  source: MaybeRefOrGetter<T[]>,
  categoryKey: string = "categoria",
) {
  const list = computed(() => toValue(source))

  const groups = computed<CategoryGroup[]>(() => {
    const counts = new Map<string, number>()
    for (const item of list.value) {
      const name = categoryName(item, categoryKey)
      counts.set(name, (counts.get(name) || 0) + 1)
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  const selectedCategory = ref<string | null>(null)

  const itemsInCategory = computed(() =>
    selectedCategory.value
      ? list.value.filter((item) => categoryName(item, categoryKey) === selectedCategory.value)
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
