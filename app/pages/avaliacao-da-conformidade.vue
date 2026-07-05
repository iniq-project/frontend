<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import avaliacaoConformidade from "@/gql/avaliacao-conformidade/index.gql"
import requisitosQuery from "@/gql/avaliacao-conformidade/requisitos.gql"
import Requisitos from "@/components/custom/Requisitos.vue"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Avaliação da Conformidade",
})


const { query } = useSquidex()
const data = await query(avaliacaoConformidade, { key: "queryHomeevaluationContents" })
const requisitosData = await query(requisitosQuery, { key: "queryRequirementContents" })


const evaluation = computed(
  () => data.value?.data.queryHomeevaluationContents?.[0]?.data?.leader,
)
const requisitosContent = computed(() => {
  const result = requisitosData.value?.data?.queryRequirementContents?.[0]?.data?.rules
  return result
})
const requisitosTitle = computed(() => requisitosContent.value?.title)
const requisitosDescription = computed(() => requisitosContent.value?.description)
const requisitosList = computed(() => {
  const rules = requisitosContent.value?.rules || []
  return rules.map((rule: any, index: number) => ({
    num: index + 1,
    text: rule?.title
  }))
})
const downloadInfo = computed(() => {
  const model = requisitosContent.value?.model?.[0]
  if (!model) return null
  return {
    title: model.title,
    description: model.description,
    link: model.url?.[0]?.url,
    buttonText: "Baixar"
  }
})

const activeSubItemId = inject("activeSubItemId")

const isSubItemSelected = ref(false)
const showForm = ref(false)

function handleFormSubmit(formData: any) {
  console.log("Form submitted with data:", formData)
}

if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId) => {
      isSubItemSelected.value = !!newId
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
     <CustomHero :data="evaluation" />
    </template>

    <template v-if="isSubItemSelected">
      <template v-if="!showForm">
        <Requisitos
          :requisitos="requisitosList"
          :download-info="downloadInfo"
          :title="requisitosTitle"
          :description="requisitosDescription"
          submit-button-text="Submeter Processo"
          @submit="showForm = true"
        />
      </template>
      <CustomRequisitosConformidadeForm
        :show="showForm"
        @close="showForm = false"
        @submit="handleFormSubmit"
      />
    </template>
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}
</style>
