<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(["close"])

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NIF_PATTERN = /^\d{9,10}$/

const emptyForm = () => ({
  tipoInstrumento: "",
  marca: "",
  modelo: "",
  numeroSerie: "",
  quantidade: "",
  email: "",
  nif: "",
})

const formData = ref(emptyForm())
const errors = ref<Record<string, string>>({})
const formSubmitted = ref(false)
const submitError = ref("")
const isSubmitting = ref(false)
const processRef = ref("")

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    formData.value = emptyForm()
    errors.value = {}
    formSubmitted.value = false
    submitError.value = ""
    isSubmitting.value = false
    processRef.value = ""
  },
)

const textValue = (value: unknown) => String(value ?? "").trim()

const validateForm = () => {
  const next: Record<string, string> = {}

  if (!textValue(formData.value.tipoInstrumento)) {
    next.tipoInstrumento = "Por favor, informe o tipo de instrumento"
  }
  if (!textValue(formData.value.marca)) {
    next.marca = "Por favor, informe a marca"
  }
  if (!textValue(formData.value.modelo)) {
    next.modelo = "Por favor, informe o modelo"
  }
  if (!textValue(formData.value.numeroSerie)) {
    next.numeroSerie = "Por favor, informe o número de série"
  }

  const quantidade = textValue(formData.value.quantidade)
  if (!quantidade) {
    next.quantidade = "Por favor, informe a quantidade de instrumentos a certificar"
  } else if (!/^\d+$/.test(quantidade) || Number(quantidade) < 1) {
    next.quantidade = "A quantidade deve ser um número inteiro igual ou superior a 1"
  }

  const email = textValue(formData.value.email)
  if (!email) {
    next.email = "Por favor, informe o e-mail"
  } else if (!EMAIL_PATTERN.test(email)) {
    next.email = "Introduza um e-mail válido"
  }

  const nif = textValue(formData.value.nif).replace(/\s/g, "")
  if (!nif) {
    next.nif = "Por favor, informe o NIF"
  } else if (!NIF_PATTERN.test(nif)) {
    next.nif = "O NIF deve ter 9 ou 10 dígitos"
  }

  errors.value = next
  return Object.keys(next).length === 0
}

const handleSubmit = async () => {
  submitError.value = ""
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const response = await $fetch<{
      referenceNumber?: string
      process?: { referenceNumber?: string }
    }>("/api/processes/importacao/verificacao", {
      method: "POST",
      body: {
        instrumentType: textValue(formData.value.tipoInstrumento),
        brand: textValue(formData.value.marca),
        model: textValue(formData.value.modelo),
        serialNumber: textValue(formData.value.numeroSerie),
        quantity: Number(textValue(formData.value.quantidade)),
        email: textValue(formData.value.email),
        nif: textValue(formData.value.nif).replace(/\s/g, ""),
      },
    })

    processRef.value = response.referenceNumber ?? response.process?.referenceNumber ?? ""
    formSubmitted.value = true
  } catch (error: unknown) {
    const fetchError = error as {
      data?: { statusMessage?: string; message?: string }
      statusMessage?: string
    }
    submitError.value =
      fetchError.data?.statusMessage ??
      fetchError.statusMessage ??
      fetchError.data?.message ??
      "Não foi possível submeter a candidatura. Tente novamente."
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  emit("close")
}
</script>

<template>
  <div v-if="open" class="modal open" @click.self="handleClose">
    <div class="modal__scrim" @click="handleClose"></div>
    <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="candidaturaTitle">
      <div class="modal__head">
        <div>
          <span class="eyebrow">Verificação</span>
          <h3 id="candidaturaTitle">Candidatar-me</h3>
        </div>
        <button class="modal__close" type="button" aria-label="Fechar" @click="handleClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>

      <div class="modal__body">
        <form v-if="!formSubmitted" novalidate @submit.prevent="handleSubmit">
          <h4 class="section-title">Dados do instrumento</h4>
          <div class="field">
            <label for="v-tipo">Tipo de instrumento <span class="req">*</span></label>
            <input
              id="v-tipo"
              v-model="formData.tipoInstrumento"
              type="text"
              name="tipoInstrumento"
              placeholder="Ex.: Balança, bomba de combustível, contador de água"
              :class="{ error: errors.tipoInstrumento }"
            />
            <span v-if="errors.tipoInstrumento" class="error-text">{{ errors.tipoInstrumento }}</span>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="v-marca">Marca <span class="req">*</span></label>
              <input
                id="v-marca"
                v-model="formData.marca"
                type="text"
                name="marca"
                placeholder="Ex.: Mettler Toledo, Endress+Hauser"
                :class="{ error: errors.marca }"
              />
              <span v-if="errors.marca" class="error-text">{{ errors.marca }}</span>
            </div>
            <div class="field">
              <label for="v-modelo">Modelo <span class="req">*</span></label>
              <input
                id="v-modelo"
                v-model="formData.modelo"
                type="text"
                name="modelo"
                placeholder="Ex.: XPR205, PROline Promag W400"
                :class="{ error: errors.modelo }"
              />
              <span v-if="errors.modelo" class="error-text">{{ errors.modelo }}</span>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="v-serie">Número de série <span class="req">*</span></label>
              <input
                id="v-serie"
                v-model="formData.numeroSerie"
                type="text"
                name="numeroSerie"
                placeholder="Ex.: SN-20481-AO"
                :class="{ error: errors.numeroSerie }"
              />
              <span v-if="errors.numeroSerie" class="error-text">{{ errors.numeroSerie }}</span>
            </div>
            <div class="field">
              <label for="v-qtd">Quantidade de instrumentos a certificar <span class="req">*</span></label>
              <input
                id="v-qtd"
                v-model="formData.quantidade"
                type="number"
                min="1"
                step="1"
                name="quantidade"
                placeholder="Ex.: 3"
                :class="{ error: errors.quantidade }"
              />
              <span v-if="errors.quantidade" class="error-text">{{ errors.quantidade }}</span>
            </div>
          </div>

          <h4 class="section-title">Dados da empresa</h4>
          <div class="field-row">
            <div class="field">
              <label for="v-email">E-mail <span class="req">*</span></label>
              <input
                id="v-email"
                v-model="formData.email"
                type="email"
                name="email"
                placeholder="Ex.: qualidade@empresa.co.ao"
                :class="{ error: errors.email }"
              />
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>
            <div class="field">
              <label for="v-nif">NIF <span class="req">*</span></label>
              <input
                id="v-nif"
                v-model="formData.nif"
                type="text"
                inputmode="numeric"
                name="nif"
                placeholder="Ex.: 5417123456"
                :class="{ error: errors.nif }"
              />
              <span v-if="errors.nif" class="error-text">{{ errors.nif }}</span>
            </div>
          </div>

          <p v-if="submitError" class="error-text">{{ submitError }}</p>

          <div class="modal__foot">
            <button type="button" class="btn btn--ghost" @click="handleClose">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
              {{ isSubmitting ? "A submeter..." : "Submeter candidatura" }}
            </button>
          </div>
        </form>

        <div v-else class="modal-success show">
          <div class="ok">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <h3>Candidatura submetida</h3>
          <p>
            A candidatura à Verificação foi registada. Receberá um e-mail com o estado Submetida
            e o pedido segue para o responsável do departamento.
          </p>
          <div v-if="processRef" class="order-ref">{{ processRef }}</div>
          <div class="modal__foot" style="justify-content: center">
            <button type="button" class="btn btn--primary" @click="handleClose">Concluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal__head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba9e0;
  margin-bottom: 0.5rem;
}

.modal__head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.section-title {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.65rem;
}

.section-title:not(:first-child) {
  margin-top: 1.5rem;
}

.field input.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-text {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 500;
}

.modal-success.show {
  display: block;
}
</style>
