<script setup>
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/normalizacao/index.gql"
import vendaNormasQuery from "@/gql/normalizacao/vendaNormas.gql"
import catalogoNormasQuery from "@/gql/normalizacao/catalogoNormas.gql"
import normasQuery from "@/gql/normalizacao/normas.gql"
import comissaoTecnicaQuery from "@/gql/normalizacao/comissaoTecnica.gql"
import comissaoTecnicaIntroQuery from "@/gql/normalizacao/comissaoTecnicaIntro.gql"
import consultasPublicasQuery from "@/gql/normalizacao/consultasPublicas.gql"
import { formatDate } from "@/utils/formatDate"
import { stripHtml } from "@/utils/stripHtml"

useHead({
  title: "INIQ » Normalização",
})

const { query } = useSquidex()
const data = await query(home, { key: "normalization" })

const leader = computed(
  () => data.value?.data.queryHomenormalizationContents?.[0]?.data?.leader,
)

const vendaNormasData = await query(vendaNormasQuery, { key: "salesrules" })
const salesrulesIntro = computed(
  () => vendaNormasData.value?.data?.querySalesrulesContents?.[0]?.data,
)

const catalogoNormasData = await query(catalogoNormasQuery, { key: "nationalcatalog" })
const catalogoNormasIntro = computed(
  () => catalogoNormasData.value?.data?.queryNationalcatalogContents?.[0]?.data,
)

const normasData = await query(normasQuery, { key: "standard" })
const rawNormas = computed(() => normasData.value?.data?.queryStandardContents || [])

const comissaoTecnicaData = await query(comissaoTecnicaQuery, { key: "technicalcommittee" })
const rawComissoes = computed(
  () => comissaoTecnicaData.value?.data?.queryTechnicalcommitteeContents || [],
)

const comissaoTecnicaIntroData = await query(comissaoTecnicaIntroQuery, {
  key: "technicalcommitteeintro",
})
const comissaoTecnicaIntro = computed(
  () => comissaoTecnicaIntroData.value?.data?.queryTechnicalcommitteeintroContents?.[0]?.data,
)

const comissaoDeNorma = computed(() => {
  const map = {}
  for (const item of rawComissoes.value) {
    for (const norma of item.data?.normas || []) {
      map[norma.data.reference] = item.data.nome
    }
  }
  return map
})

const normas = computed(() =>
  rawNormas.value.map((item) => {
    const n = item.data
    return {
      reference: n.reference,
      title: n.title,
      categoria: n.category?.[0]?.flatData?.title || "",
      price: n.price || 0,
      ics: n.ics || "",
      ano: n.ano || 0,
      comissaoTecnica: comissaoDeNorma.value[n.reference] || "",
      estado: (n.estado || "Em vigor").toLowerCase(),
    }
  }),
)

const normasEmVigor = computed(() => normas.value.filter((n) => n.estado === "em vigor"))

const comissoesTecnicas = computed(() =>
  rawComissoes.value.map((item) => ({
    id: item.id,
    nome: item.data.nome,
    sector: item.data.sector?.[0]?.flatData?.title || "",
    presidente: item.data.presidente,
    secretarioTecnico: item.data.secretarioTecnico,
    normaReferences: (item.data.normas || []).map((n) => n.data.reference),
  })),
)

const consultasPublicasData = await query(consultasPublicasQuery, { key: "publicconsultation" })
const consultaPublicaIntro = computed(
  () => consultasPublicasData.value?.data?.queryPublicconsultationContents?.[0]?.data,
)
const projetosConsulta = computed(() =>
  (consultaPublicaIntro.value?.rules || []).map(
    (p) => ({
      code: p.reference,
      title: p.title,
      sector: p.category?.[0]?.flatData?.title || "",
      description: stripHtml(p.description),
      documento: stripHtml(p.description),
      documentUrl: p.document?.[0]?.url || "",
      deadline: formatDate(p.deadline),
      urgent: !!p.urgent,
    }),
  ),
)

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
  const norma = normas.value.find((n) => n.reference === reference)
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
      :title="comissaoTecnicaIntro?.title"
      :description="comissaoTecnicaIntro?.description"
      :informacoes-gerais="comissaoTecnicaIntro?.informacoesGerais"
      @view-norma="handleViewNorma"
    />

    <CustomNormalizacaoVendaNormas
      v-if="activeTab === 'venda-normas'"
      :normas="normasEmVigor"
      :seed-search="seedSearchTerm"
      :title="salesrulesIntro?.title"
      :description="stripHtml(salesrulesIntro?.description)"
      @open-modal="openModal"
      @back-to-comissoes="backToComissoes"
    />

    <CustomNormalizacaoConsultaPublica
      v-if="activeTab === 'consulta-publica'"
      :projects="projetosConsulta"
      :title="consultaPublicaIntro?.title"
      :description="stripHtml(consultaPublicaIntro?.description)"
      @open-modal="openModal"
    />

    <CustomNormalizacaoCatalogoNormas
      v-if="activeTab === 'catalogo-livro'"
      :normas="normas"
      :seed-search="seedSearchTerm"
      :title="catalogoNormasIntro?.title"
      :description="stripHtml(catalogoNormasIntro?.description)"
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
