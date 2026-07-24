<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/registro-cadastro/index.gql"
import requisitosQuery from "@/gql/registro-cadastro/requisitos.gql"
import tipologiasQuery from "@/gql/registro-cadastro/tipologias.gql"
import orgaoLegisladorQuery from "@/gql/regulamentos/orgaoLegislador.gql"
import acervoNacionalQuery from "@/gql/regulamentos/acervoNacional.gql"
import consultaPublicaQuery from "@/gql/regulamentos/consultaPublica.gql"
import equivalentesQuery from "@/gql/regulamentos/equivalentes.gql"
import { formatDate } from "@/utils/formatDate"
import { stripHtml } from "@/utils/stripHtml"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Acreditação, Registro e Cadastro, Regulamentos Técnicos",
})

const { query } = useSquidex()
const data = await query(home, { key: "home" })

const leader = computed(
  () => data.value?.data.queryHomeregisterContents?.[0]?.data?.leader,
)

const requisitosData = await query(requisitosQuery, { key: "queryRequirementregisterContents" })
const requisitosContent = computed(() => {
  return requisitosData.value?.data?.queryRequirementregisterContents?.[0]?.data?.requirement
})
const requisitosTitle = computed(() => requisitosContent.value?.title)
const requisitosDescription = computed(() => requisitosContent.value?.description)
const requisitosList = computed(() => {
  const rules = requisitosContent.value?.rules || []
  return rules.map((rule: any, index: number) => ({
    num: index + 1,
    text: rule?.title,
  }))
})
const downloadInfo = computed(() => {
  const model = requisitosContent.value?.model?.[0]
  if (!model) return undefined
  return {
    title: model.title,
    description: model.description,
    link: model.url?.[0]?.url,
    buttonText: "Baixar",
  }
})

const tipologiasData = await query(tipologiasQuery, { key: "registrationtype" })
const tipologias = computed(() => {
  const types = tipologiasData.value?.data?.queryRegistrationtypeContents?.[0]?.data?.types || []
  return types.map((t: any) => ({ id: t.title, title: t.title }))
})

const orgaoLegisladorData = await query(orgaoLegisladorQuery, { key: "inforegulation" })
const orgaoLegislador = computed(
  () => orgaoLegisladorData.value?.data?.queryInforegulationContents?.[0]?.data,
)

const acervoNacionalData = await query(acervoNacionalQuery, { key: "regulations" })
const acervoNacional = computed(() =>
  (acervoNacionalData.value?.data?.queryRegulationsContents || []).map((item: any) => {
    const d = item.data
    return {
      code: d.reference,
      title: d.title,
      areaTecnica: d.category?.[0]?.flatData?.title || "",
      estado: (d.estado || "Em vigor").toLowerCase(),
      price: d.price || 0,
      documentUrl: d.document?.[0]?.url || "",
    }
  }),
)

const consultaPublicaData = await query(consultaPublicaQuery, { key: "regulationconsultation" })
const consultaPublicaIntro = computed(
  () => consultaPublicaData.value?.data?.queryRegulationconsultationContents?.[0]?.data,
)
const consultaPublicaProjects = computed(() =>
  (consultaPublicaIntro.value?.projects || []).map((p: any) => ({
    code: p.reference,
    title: p.title,
    areaTecnica: p.category?.[0]?.flatData?.title || "",
    description: stripHtml(p.description),
    deadline: formatDate(p.deadline),
    documentUrl: p.document?.[0]?.url || "",
  })),
)

const equivalentesData = await query(equivalentesQuery, { key: "regulationequivalent" })
const equivalentesIntro = computed(
  () => equivalentesData.value?.data?.queryRegulationequivalentContents?.[0]?.data,
)
const equivalentes = computed(() =>
  (equivalentesIntro.value?.equivalents || []).map((e: any) => ({
    code: e.reference,
    title: e.title,
    areaTecnica: e.category?.[0]?.flatData?.title || "",
    paisOrigem: e.country,
    organismoOrigem: e.organism,
    estado: (e.estado || "Em vigor").toLowerCase(),
  })),
)

const activeSubItemId = inject("activeSubItemId")
const activeTab = ref<string | null>(null)
const isSubItemSelected = ref(false)

if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId) => {
      isSubItemSelected.value = !!newId
      activeTab.value = newId as string | null
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <CustomArcrtPontoFocalSadcas
      v-if="activeTab === 'acreditacao'"
      eyebrow="Acreditação"
      title="Acreditação"
    />

    <CustomArcrtRegulamentosTecnicos
      v-if="activeTab === 'regulamentos-tecnicos'"
      :orgao-legislador-title="orgaoLegislador?.title"
      :orgao-legislador-description="stripHtml(orgaoLegislador?.description)"
      :acervo-nacional="acervoNacional"
      :consulta-publica-title="consultaPublicaIntro?.title"
      :consulta-publica-description="stripHtml(consultaPublicaIntro?.description)"
      :consulta-publica-projects="consultaPublicaProjects"
      :equivalentes-title="equivalentesIntro?.title"
      :equivalentes-description="stripHtml(equivalentesIntro?.description)"
      :equivalentes="equivalentes"
    />

    <CustomArcrtRegistroCadastro
      v-if="activeTab === 'registro-cadastro'"
      :requisitos-title="requisitosTitle"
      :requisitos-description="requisitosDescription"
      :requisitos-list="requisitosList"
      :download-info="downloadInfo"
      :tipologias="tipologias"
    />

    <CustomArcrtPontoFocalSadcas
      v-if="activeTab === 'ponto-focal-sadcas'"
      eyebrow="Ponto Focal SADCAS"
      title="Ponto Focal para o SADCAS"
    />
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}
</style>
