<script setup>
import { inject, watch, ref, computed } from "vue"
import home from "@/gql/normalizacao/index.gql"
import vendaNormasQuery from "@/gql/normalizacao/vendaNormas.gql"
import consultasPublicasQuery from "@/gql/normalizacao/consultasPublicas.gql"


useHead({
  title: "INIQ » Normalização",
})

const { query } = useSquidex()

const data = await query(home, { key: "normalization" })
const leader = computed(
  () => data.value?.data.queryHomenormalizationContents?.[0]?.data?.leader,
)

const vendaNormasData = await query(vendaNormasQuery, { key: "vendaNormas" })
const vendaNormasTitle = computed(() => vendaNormasData.value?.data.querySalesrulesContents?.[0]?.data?.title || "")
const vendaNormasDescription = computed(() => vendaNormasData.value?.data.querySalesrulesContents?.[0]?.data?.description || "")
const normas = computed(() => {
  const rules = vendaNormasData.value?.data.querySalesrulesContents?.[0]?.data?.rules || []
  return rules.map(rule => ({
    code: rule.reference,
    title: rule.title,
    sector: rule.category?.id || "Geral",
    price: rule.price || 0,
  }))
})

const consultasPublicasData = await query(consultasPublicasQuery, { key: "consultasPublicas" })
const consultasPublicasTitle = computed(() => consultasPublicasData.value?.data.queryPublicconsultationContents?.[0]?.data?.title || "")
const consultasPublicasDescription = computed(() => consultasPublicasData.value?.data.queryPublicconsultationContents?.[0]?.data?.description || "")

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const projetosConsulta = computed(() => {
  const rules = consultasPublicasData.value?.data.queryPublicconsultationContents?.[0]?.data?.rules || []
  return rules.map(rule => ({
    code: rule.reference,
    title: rule.title,
    sector: rule.category?.id || "Geral",
    description: rule.description || "",
    deadline: formatDate(rule.date || ""),
  }))
})

const activeSubItemId = inject("activeSubItemId")
const activeTab = ref("venda")
const isSubItemSelected = ref(false)

if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId) => {
      isSubItemSelected.value = !!newId

      if (newId === "venda-normas") {
        activeTab.value = "venda"
      } else if (newId === "consulta-publica") {
        activeTab.value = "consulta"
      }
    },
    { immediate: true },
  )
}

const modalOpen = ref(false)
const modalMode = ref("venda")
const modalEyebrow = ref("Venda de Normas")
const modalTitle = ref("Solicitar Norma")
const modalRef = ref("")
const formSubmitted = ref(false)
const successTitle = ref("Pedido submetido com sucesso")
const successMsg = ref(
  "Receberá por e-mail os dados de pagamento (Referência Multicaixa). Após confirmação, a norma fica imediatamente disponível na sua área reservada.",
)
const orderRef = ref("")
const errors = ref({})

const formData = ref({
  nomeEntidade: "",
  nif: "",
  email: "",
  telefone: "",
  contribuicao: "",
})

const openModal = (mode, item) => {
  modalMode.value = mode
  formSubmitted.value = false
  errors.value = {}

  if (mode === "venda") {
    modalEyebrow.value = "Venda de Normas"
    modalTitle.value = "Solicitar Norma"
    modalRef.value = `${item.code} — ${item.title}`
    successTitle.value = "RUPE gerado com sucesso"
    successMsg.value =
      "Utilize o RUPE abaixo para efetuar o pagamento. Após confirmação do pagamento, o técnico/administrador irá validar e liberar o acesso à norma."
  } else {
    modalEyebrow.value = "Consulta Pública"
    modalTitle.value = "Submeter Contribuição"
    modalRef.value = `${item.code} — ${item.title}`
    successTitle.value = "Contribuição enviada com sucesso"
    successMsg.value =
      "A sua contribuição foi registada e será analisada pela Comissão Técnica responsável. Receberá por e-mail o resultado do tratamento."
  }

  formData.value = {
    nomeEntidade: "",
    nif: "",
    email: "",
    telefone: "",
    contribuicao: "",
  }

  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const validateForm = () => {
  if (modalMode.value === "venda") {
    const newErrors = {}

    if (!formData.value.nomeEntidade.trim()) {
      newErrors.nomeEntidade = true
    }

    if (!formData.value.nif.trim()) {
      newErrors.nif = true
    }

    if (
      !formData.value.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
    ) {
      newErrors.email = true
    }

    if (!formData.value.telefone.trim()) {
      newErrors.telefone = true
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
  }
  return true
}

const generateRUPE = () => {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(100000 + Math.random() * 899999)
  return `RUPE-${year}-${randomNum}`
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  if (modalMode.value === "venda") {
    orderRef.value = generateRUPE()
  } else {
    const refNumber = Math.floor(10000 + Math.random() * 89999)
    orderRef.value = `REF: INIQ-2026-${refNumber}`
  }

  formSubmitted.value = true
}
</script>
<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <CustomNormalizacaoVendaNormas
      v-if="isSubItemSelected && activeTab === 'venda'"
      :normas="normas"
      :title="vendaNormasTitle"
      :description="vendaNormasDescription"
      @open-modal="openModal"
    />

    <CustomNormalizacaoConsultaPublica
      v-if="isSubItemSelected && activeTab === 'consulta'"
      :projects="projetosConsulta"
      :title="consultasPublicasTitle"
      :description="consultasPublicasDescription"
      @open-modal="openModal"
    />
  </div>

  <CustomNormalizacaoModal
    :open="modalOpen"
    :eyebrow="modalEyebrow"
    :title="modalTitle"
    :ref="modalRef"
    :mode="modalMode"
    :form-submitted="formSubmitted"
    :success-title="successTitle"
    :success-msg="successMsg"
    :order-ref="orderRef"
    :form-data="formData"
    :errors="errors"
    @close="closeModal"
    @submit="handleSubmit"
  />
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}
</style>
