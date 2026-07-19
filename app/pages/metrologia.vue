<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/metrologia/index.gql"
import servicosQuery from "@/gql/metrologia/servicos.gql"
import legalControlQuery from "@/gql/metrologia/legalControl.gql"
import internationalCooperationQuery from "@/gql/metrologia/internationalCooperation.gql"
import legalFeeQuery from "@/gql/metrologia/legalFee.gql"
import modeloCartaQuery from "@/gql/metrologia/modeloCarta.gql"
import { slugify } from "@/utils/slugify"
import { stripHtml } from "@/utils/stripHtml"

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

const servicosData = await query(servicosQuery, { key: "servicesmetrology" })
const servicosIntro = computed(
  () => servicosData.value?.data?.queryServicesmetrologyContents?.[0]?.data,
)
const servicosMetrologia = computed(() =>
  (servicosIntro.value?.services || []).map(
    (s: any) => ({
      id: slugify(s.title),
      title: s.title,
      fee: s.fee || 0,
      requiresFichaTecnica: !!s.requiresFichaTecnica,
    }),
  ),
)

const modeloCartaData = await query(modeloCartaQuery, { key: "requirementmetrology" })
const modeloCarta = computed(() => {
  const d = modeloCartaData.value?.data?.queryRequirementmetrologyContents?.[0]?.data
  return {
    title: d?.title || "",
    description: stripHtml(d?.description),
    documentUrl: d?.document?.[0]?.url || "",
  }
})

const legalControlData = await query(legalControlQuery, { key: "legalcontrol" })
const legalControlIntro = computed(
  () => legalControlData.value?.data?.queryLegalcontrolContents?.[0]?.data,
)
const operacoesControloLegal = computed(() =>
  (legalControlIntro.value?.operations || []).map((o: any) => ({
    id: slugify(o.title),
    title: o.title,
    description: stripHtml(o.description),
    servicoId: slugify(o.servicoTitle),
  })),
)

const internationalCooperationData = await query(internationalCooperationQuery, {
  key: "internationalcooperation",
})
const internationalCooperationIntro = computed(
  () => internationalCooperationData.value?.data?.queryInternationalcooperationContents?.[0]?.data,
)
const cooperacoesInternacionais = computed(() =>
  (internationalCooperationIntro.value?.cooperations || []).map((c: any) => ({
    id: slugify(c.acronym),
    nomeCompleto: c.fullName,
    sigla: c.acronym,
    tipoParticipacao: c.participationType,
    link: c.link,
  })),
)

const legalFeeData = await query(legalFeeQuery, { key: "legalfee" })
const leiTaxasDownloadInfo = computed(() => {
  const d = legalFeeData.value?.data?.queryLegalfeeContents?.[0]?.data
  if (!d) return { title: "", description: "", buttonText: "", documentUrl: "" }
  return {
    title: d.title,
    description: stripHtml(d.description),
    buttonText: d.buttonText,
    documentUrl: d.document?.[0]?.url || "",
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

const modalOpen = ref(false)
const modalService = ref<(typeof servicosMetrologia.value)[number] | undefined>(undefined)

function openSolicitarModal(servicoId: string) {
  const svc = servicosMetrologia.value.find((s: { id: string }) => s.id === servicoId)
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
      :title="servicosIntro?.title"
      :description="stripHtml(servicosIntro?.description)"
      :modelo-carta="modeloCarta"
      @solicitar="openSolicitarModal"
    />

    <CustomMetrologiaControloLegal
      v-if="activeTab === 'controlo-metrologico-legal'"
      :operacoes="operacoesControloLegal"
      :servicos="servicosMetrologia"
      :title="legalControlIntro?.title"
      :description="stripHtml(legalControlIntro?.description)"
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
      :title="internationalCooperationIntro?.title"
      :description="stripHtml(internationalCooperationIntro?.description)"
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
