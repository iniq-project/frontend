<script setup>
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/normalizacao/index.gql"
import {
  normas,
  comissoesTecnicas,
  projetosConsulta,
} from "@/data/normalizacao-mocks"

useHead({
  title: "INIQ » Normalização",
})

const { query } = useSquidex()
const data = await query(home, { key: "normalization" })

const leader = computed(
  () => data.value?.data.queryHomenormalizationContents?.[0]?.data?.leader,
)

const normasEmVigor = computed(() => normas.filter((n) => n.estado === "em vigor"))

const activeSubItemId = inject("activeSubItemId")
const activeTab = ref(null)
const isSubItemSelected = ref(false)
const seedSearchTerm = ref("")

if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId) => {
      isSubItemSelected.value = !!newId
      activeTab.value = newId
      seedSearchTerm.value = ""
    },
    { immediate: true },
  )
}

const modalMode = ref(null)
const modalItem = ref(null)

const openModal = (mode, item) => {
  modalMode.value = mode
  modalItem.value = item
}

const closeModal = () => {
  modalMode.value = null
  modalItem.value = null
}

const handleViewNorma = (reference) => {
  const norma = normas.find((n) => n.reference === reference)
  if (!norma) return

  activeTab.value = norma.estado === "em vigor" ? "venda-normas" : "catalogo-livro"
  seedSearchTerm.value = norma.title
}

const backToComissoes = () => {
  activeTab.value = "comissao-tecnica"
  seedSearchTerm.value = ""
}
</script>
<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <CustomNormalizacaoComissaoTecnica
      v-if="activeTab === 'comissao-tecnica'"
      :comissoes="comissoesTecnicas"
      :normas="normas"
      @view-norma="handleViewNorma"
    />

    <CustomNormalizacaoVendaNormas
      v-if="activeTab === 'venda-normas'"
      :normas="normasEmVigor"
      :seed-search="seedSearchTerm"
      @open-modal="openModal"
      @back-to-comissoes="backToComissoes"
    />

    <CustomNormalizacaoConsultaPublica
      v-if="activeTab === 'consulta-publica'"
      :projects="projetosConsulta"
      @open-modal="openModal"
    />

    <CustomNormalizacaoCatalogoNormas
      v-if="activeTab === 'catalogo-livro'"
      :normas="normas"
      :seed-search="seedSearchTerm"
      @back-to-comissoes="backToComissoes"
    />
  </div>

  <CustomNormalizacaoPurchaseModal
    :open="modalMode === 'venda'"
    :norma="modalItem"
    @close="closeModal"
  />

  <CustomNormalizacaoCommentModal
    :open="modalMode === 'contrib'"
    :project="modalItem"
    @close="closeModal"
  />
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}
</style>
