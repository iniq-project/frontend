<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/metrologia/index.gql"
import requisitosQuery from "@/gql/metrologia/requisitos.gql"
import servicosQuery from "@/gql/metrologia/servicos.gql"
import Requisitos from "@/components/custom/Requisitos.vue"
import ServicosMetrologia from "@/components/custom/metrologia/ServicosMetrologia.vue"
import MetrologiaForm from "@/components/custom/metrologia/MetrologiaForm.vue"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Metrologia",
})

const { query } = useSquidex()
const data = await query(home, { key: "metrologia-home" })
const requisitosData = await query(requisitosQuery, { key: "metrologia-requisitos" })
const servicosData = await query(servicosQuery, { key: "metrologia-servicos" })

const leader = computed(
  () => data.value?.data.queryHomemetrologyContents?.[0]?.data?.leader,
)

// Requisitos data
const requisitosContent = computed(() => {
  const result = requisitosData.value?.data?.queryRequirementmetrologyContents?.[0]?.data?.rules
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

// Servicos data
const servicosContent = computed(() => {
  return servicosData.value?.data?.queryServicesmetrologyContents?.[0]?.data
})
const servicosTitle = computed(() => servicosContent.value?.title)
const servicosList = computed(() => servicosContent.value?.services || [])
const servicosCardTitle = computed(() => servicosContent.value?.cardTitle)
const servicosCardDescription = computed(() => servicosContent.value?.cardDescription)
const servicosCtaTitle = computed(() => servicosContent.value?.ctaTitle)
const servicosCtaDescription = computed(() => servicosContent.value?.ctaDescription)
const servicosCtaButtonText = computed(() => servicosContent.value?.ctaButtonText)
const servicosRequisitosButtonText = computed(() => servicosContent.value?.requisitosButtonText)

const activeSubItemId = inject("activeSubItemId")

const isSubItemSelected = ref(false)
const showRequisitos = ref(false)
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
      <CustomHero :data="leader" />
    </template>

    <template v-if="isSubItemSelected">
      <template v-if="!showRequisitos && !showForm">
        <ServicosMetrologia
          :title="servicosTitle"
          :services="servicosList"
          :card-title="servicosCardTitle"
          :card-description="servicosCardDescription"
          :cta-title="servicosCtaTitle"
          :cta-description="servicosCtaDescription"
          :cta-button-text="servicosCtaButtonText"
          :requisitos-button-text="servicosRequisitosButtonText"
          @ver-requisitos="showRequisitos = true"
        />
      </template>

      <template v-if="showRequisitos && !showForm">
        <Requisitos
          :requisitos="requisitosList"
          :download-info="downloadInfo"
          :title="requisitosTitle"
          :description="requisitosDescription"
          :show-submit-button="true"
          submit-button-text="Submeter Carta ao DG"
          @submit="(showForm = true), (showRequisitos = false)"
        />
        <section class="mt-12">
          <div class="container">
            <div class="button-group">
              <button @click="showRequisitos = false" class="btn btn--ghost">
                Voltar
              </button>
            </div>
          </div>
        </section>
      </template>

      <MetrologiaForm
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
  position: relative;
  z-index: 1;
}

.mt-12 {
  margin-top: 3rem;
}

.container {
  padding: 0 2rem 2rem 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 1rem;
}

.btn--ghost {
  background: white;
  color: #0a3a63;
  border: 1px solid #e6eff6;
}

.btn--ghost:hover {
  background: #f8fafc;
  border-color: #2ba9e0;
}
</style>
