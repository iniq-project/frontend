<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/registro-cadastro/index.gql"
import requisitosQuery from "@/gql/registro-cadastro/requisitos.gql"

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

    <CustomArcrtRegulamentosTecnicos v-if="activeTab === 'regulamentos-tecnicos'" />

    <CustomArcrtRegistroCadastro
      v-if="activeTab === 'registro-cadastro'"
      :requisitos-description="requisitosDescription"
      :requisitos-list="requisitosList"
      :download-info="downloadInfo"
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
