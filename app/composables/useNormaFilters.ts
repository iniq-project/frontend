import { ref, computed, toValue, type MaybeRefOrGetter } from "vue"
import type { Norma } from "@/data/normalizacao-mocks"

export function useNormaFilters(source: MaybeRefOrGetter<Norma[]>) {
  const searchTerm = ref("")
  const categoria = ref("")
  const ano = ref("")
  const comissaoTecnica = ref("")

  const list = computed(() => toValue(source))

  const categorias = computed(() =>
    [...new Set(list.value.map((n) => n.categoria))].sort(),
  )
  const anos = computed(() =>
    [...new Set(list.value.map((n) => n.ano))].sort((a, b) => b - a),
  )
  const comissoes = computed(() =>
    [...new Set(list.value.map((n) => n.comissaoTecnica))].sort(),
  )

  const filteredNormas = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()

    return list.value.filter((norma) => {
      const matchesSearch =
        !term ||
        norma.title.toLowerCase().includes(term) ||
        norma.ics.toLowerCase().includes(term)
      const matchesCategoria = !categoria.value || norma.categoria === categoria.value
      const matchesAno = !ano.value || String(norma.ano) === String(ano.value)
      const matchesComissao =
        !comissaoTecnica.value || norma.comissaoTecnica === comissaoTecnica.value

      return matchesSearch && matchesCategoria && matchesAno && matchesComissao
    })
  })

  const seedSearch = (term: string) => {
    searchTerm.value = term
    categoria.value = ""
    ano.value = ""
    comissaoTecnica.value = ""
  }

  const resetFilters = () => {
    searchTerm.value = ""
    categoria.value = ""
    ano.value = ""
    comissaoTecnica.value = ""
  }

  return {
    searchTerm,
    categoria,
    ano,
    comissaoTecnica,
    categorias,
    anos,
    comissoes,
    filteredNormas,
    seedSearch,
    resetFilters,
  }
}
