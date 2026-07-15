<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/metrologia/index.gql"
import {
  servicosMetrologia,
  operacoesControloLegal,
  cooperacoesInternacionais,
  leiTaxasDownloadInfo,
} from "@/data/metrologia-mocks"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Metrologia",
})

const { query } = useSquidex()
const data = await query(home, { key: "metrologia-home" })

const leader = computed(
  () => data.value?.data.queryHomemetrologyContents?.[0]?.data?.leader,
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

const modalOpen = ref(false)
const modalService = ref<(typeof servicosMetrologia)[number] | undefined>(undefined)

function openSolicitarModal(servicoId: string) {
  const svc = servicosMetrologia.find((s) => s.id === servicoId)
  if (!svc) return
  modalService.value = svc
  modalOpen.value = true
}

function closeSolicitarModal() {
  modalOpen.value = false
}

function handleLinkThroughServico(servicoId: string) {
  activeTab.value = "servicos"
  openSolicitarModal(servicoId)
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <CustomMetrologiaServicos
      v-if="activeTab === 'servicos'"
      :services="servicosMetrologia"
      @solicitar="openSolicitarModal"
    />

    <CustomMetrologiaControloLegal
      v-if="activeTab === 'controlo-metrologico-legal'"
      :operacoes="operacoesControloLegal"
      :servicos="servicosMetrologia"
      @pedir-servico="handleLinkThroughServico"
    />

    <CustomMetrologiaTaxas
      v-if="activeTab === 'taxas-metrologia-legal'"
      :servicos="servicosMetrologia"
      :lei-download-info="leiTaxasDownloadInfo"
    />

    <CustomMetrologiaCooperacaoInternacional
      v-if="activeTab === 'cooperacao-regional-internacional'"
      :cooperacoes="cooperacoesInternacionais"
    />

    <CustomMetrologiaEmDesenvolvimento
      v-if="activeTab === 'metrologia-industrial'"
      eyebrow="Metrologia Industrial"
      title="Metrologia Industrial"
    />

    <CustomMetrologiaEmDesenvolvimento
      v-if="activeTab === 'metrologia-cientifica'"
      eyebrow="Metrologia Científica"
      title="Metrologia Científica"
    />
  </div>

  <CustomMetrologiaSolicitarServicoModal
    :open="modalOpen"
    :service="modalService"
    @close="closeSolicitarModal"
  />
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
  position: relative;
  z-index: 1;
}
</style>
