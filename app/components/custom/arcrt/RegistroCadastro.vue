<script setup lang="ts">
import { ref, nextTick, watch, type PropType } from "vue"
import type { DocumentsType } from "~/constants/document-requirements"
import { flattenDocumentSlots } from "~/constants/document-requirements"
import type { TipologiaRegistro } from "@/data/regulamentos-mocks"

interface RequisitoItem {
  num: number
  text: string
}

defineProps({
  requisitosTitle: {
    type: String,
    default: "O que é?",
  },
  requisitosDescription: {
    type: String,
    default: "",
  },
  requisitosList: {
    type: Array as PropType<RequisitoItem[]>,
    default: () => [],
  },
  downloadInfo: {
    type: Object as PropType<{ title: string; description: string; link: string; buttonText: string } | undefined>,
    default: undefined,
  },
  tipologias: {
    type: Array as PropType<TipologiaRegistro[]>,
    default: () => [],
  },
})

const documentSlots = flattenDocumentSlots("REGISTO_CADASTRO")

const step = ref<"typology" | "form">("typology")
const selectedTypology = ref<TipologiaRegistro | null>(null)

const formSubmitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref("")
const referenceNumber = ref("")
const errors = ref<Record<string, boolean>>({})

const nomeInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  nome: "",
  email: "",
  files: Object.fromEntries(
    documentSlots.map((slot) => [slot.type, null]),
  ) as Record<DocumentsType, File | null>,
})

function resetForm() {
  formData.value = {
    nome: "",
    email: "",
    files: Object.fromEntries(
      documentSlots.map((slot) => [slot.type, null]),
    ) as Record<DocumentsType, File | null>,
  }
  errors.value = {}
  submitError.value = ""
  referenceNumber.value = ""
  formSubmitted.value = false
  step.value = "typology"
  selectedTypology.value = null
}

function chooseTypology(tipologia: TipologiaRegistro) {
  selectedTypology.value = tipologia
  step.value = "form"
}

function backToTypology() {
  step.value = "typology"
}

watch(step, async (newStep) => {
  if (newStep === "form") {
    await nextTick()
    const formSection = document.querySelector(".form-section") as HTMLElement
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setTimeout(() => {
      nomeInput.value?.focus()
    }, 300)
  }
})

function handleFileChange(event: Event, docType: DocumentsType) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.value.files[docType] = target.files[0]
    if (errors.value[docType]) {
      errors.value[docType] = false
    }
  }
}

function validateForm(): boolean {
  const newErrors: Record<string, boolean> = {}

  if (!formData.value.nome.trim()) {
    newErrors.nome = true
  }

  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  ) {
    newErrors.email = true
  }

  for (const slot of documentSlots) {
    if (!formData.value.files[slot.type]) {
      newErrors[slot.type] = true
    }
  }

  errors.value = newErrors

  if (Object.keys(newErrors).length > 0) {
    const firstErrorField = Object.keys(newErrors)[0]
    const fieldElement = document.querySelector(
      `[name="${firstErrorField}"]`,
    ) as HTMLElement
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: "smooth", block: "center" })
      fieldElement.focus()
    }
    return false
  }

  return true
}

async function handleSubmit() {
  submitError.value = ""

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const payload = new FormData()
    payload.append("name", formData.value.nome.trim())
    payload.append("email", formData.value.email.trim())
    payload.append("serviceType", "REGISTO_CADASTRO")
    payload.append("typology", selectedTypology.value?.title ?? "")

    for (const slot of documentSlots) {
      const file = formData.value.files[slot.type]
      if (file) {
        payload.append("types", slot.type)
        payload.append("files", file)
      }
    }

    const response = await $fetch<{
      referenceNumber: string
      receiptNote?: { message: string }
    }>("/api/processes/init", {
      method: "POST",
      body: payload,
      timeout: 120_000,
    })

    referenceNumber.value = response.referenceNumber
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
      "Não foi possível submeter o processo. Tente novamente."
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Registro e Cadastro</span>
      <h2>{{ requisitosTitle }}</h2>
      <div v-if="requisitosDescription" v-html="requisitosDescription"></div>
      <p v-else>
        O INIQ assegura o registo e o cadastro dos operadores económicos e entidades técnicas que
        actuam no Sistema Nacional da Qualidade, nas categorias abaixo.
      </p>
    </div>

    <template v-if="step === 'typology'">
      <div class="tipologias">
        <article class="tipologia-item" v-for="tipologia in tipologias" :key="tipologia.id">
          <h3>{{ tipologia.title }}</h3>
          <button type="button" class="btn btn--primary" @click="chooseTypology(tipologia)">
            Registrar-se
          </button>
        </article>
      </div>
    </template>

    <template v-if="step === 'form'">
      <section class="mt-12">
        <div class="form-section">
          <div class="form-header">
            <div>
              <h3>Submeter Processo de Registo e Cadastro</h3>
              <div class="tipologia-chip">
                Tipologia seleccionada: <strong>{{ selectedTypology?.title }}</strong>
                <button type="button" class="link-btn" @click="backToTypology">Alterar</button>
              </div>
            </div>
          </div>

          <div v-if="formSubmitted" class="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span>
              <b>Processo submetido com sucesso!</b>
              Referência: <strong>{{ referenceNumber }}</strong>. A equipa do INIQ irá analisar o seu pedido.
            </span>
          </div>

          <template v-else>
            <div v-if="requisitosList.length || downloadInfo" class="requisitos-summary">
              <h4>Documentos necessários</h4>
              <ul v-if="requisitosList.length" class="requisitos-list">
                <li v-for="req in requisitosList" :key="req.num">{{ req.text }}</li>
              </ul>
              <a v-if="downloadInfo?.link" :href="downloadInfo.link" download class="btn--download-link">
                Baixar modelo — {{ downloadInfo.title }}
              </a>
            </div>

            <form @submit.prevent="handleSubmit" novalidate>
              <div v-if="submitError" class="error-banner">{{ submitError }}</div>
              <div class="field">
                <label for="nome">Nome completo <span class="req">*</span></label>
                <div class="input-wrapper" :class="{ 'has-error': errors.nome }">
                  <input ref="nomeInput" type="text" id="nome" name="nome" required placeholder="O seu nome completo"
                    v-model="formData.nome" @input="errors.nome = false" />
                </div>
                <span v-if="errors.nome" class="error-message">Por favor, informe seu nome completo</span>
              </div>

              <div class="field">
                <label for="email">E-mail <span class="req">*</span></label>
                <div class="input-wrapper" :class="{ 'has-error': errors.email }">
                  <input type="email" id="email" name="email" required placeholder="nome@exemplo.ao"
                    v-model="formData.email" @input="errors.email = false" />
                </div>
                <span v-if="errors.email" class="error-message">Por favor, informe um e-mail válido</span>
              </div>

              <div v-for="slot in documentSlots" :key="slot.type" class="field">
                <label :for="slot.type">{{ slot.label }} <span class="req">*</span></label>
                <div class="file-input-wrapper" :class="{ 'has-error': errors[slot.type] }">
                  <input type="file" :id="slot.type" :name="slot.type" required
                    :accept="slot.pdfOnly ? 'application/pdf' : '.pdf,.jpg,.jpeg,.png'"
                    @change="handleFileChange($event, slot.type)" />
                  <span class="file-label">{{ formData.files[slot.type]?.name ?? "Escolher arquivo" }}</span>
                </div>
                <span v-if="errors[slot.type]" class="error-message">Por favor, selecione este arquivo</span>
              </div>

              <div class="form-actions">
                <button type="button" @click="backToTypology" class="btn btn--ghost" :disabled="isSubmitting">
                  Voltar
                </button>
                <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
                  {{ isSubmitting ? "A enviar…" : "Enviar Processo" }}
                </button>
              </div>
            </form>
          </template>

          <div v-if="formSubmitted" class="form-actions">
            <button type="button" class="btn btn--primary" @click="resetForm">Concluir</button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.tab-panel {
  display: block !important;
  padding: 1.5rem 2rem 2rem 2rem;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.panel-head {
  margin-bottom: 1.5rem;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba9e0;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.panel-head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.panel-head h2 {
  font-size: 1.5rem;
  color: #0a3a63;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.panel-head p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
}

.tipologias {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tipologia-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.25rem 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s;
}

.tipologia-item:hover {
  border-color: #2ba9e0;
}

.tipologia-item h3 {
  margin: 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
}

.mt-12 {
  margin-top: 2rem;
}

.form-section {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(10, 58, 99, 0.08);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f7f2;
}

.form-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #0a3a63;
  font-weight: 700;
}

.tipologia-chip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #475569;
}

.tipologia-chip strong {
  color: #0a3a63;
}

.link-btn {
  background: none;
  border: none;
  color: #2ba9e0;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0;
}

.requisitos-summary {
  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
}

.requisitos-summary h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 700;
}

.requisitos-list {
  margin: 0 0 0.75rem 0;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.7;
}

.btn--download-link {
  display: inline-block;
  color: #2ba9e0;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: underline;
}

.success-message {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: rgba(92, 185, 71, 0.1);
  border-radius: 10px;
  color: #2e7d32;
}

.success-message svg {
  width: 2rem;
  height: 2rem;
  flex: none;
}

.success-message b {
  display: block;
  font-size: 1.1rem;
}

.error-banner {
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid rgba(192, 57, 43, 0.25);
  color: #c0392b;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.field {
  margin-bottom: 1.25rem;
}

.field label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.6rem;
  color: #0a3a63;
}

.field label .req {
  color: #c0392b;
}

.input-wrapper {
  position: relative;
}

.field input[type="text"],
.field input[type="email"] {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #e6eff6;
  border-radius: 10px;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 0.9375rem;
  color: #0a3a63;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.field input[type="text"]:focus,
.field input[type="email"]:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 4px rgba(43, 169, 224, 0.1);
}

.input-wrapper.has-error input[type="text"],
.input-wrapper.has-error input[type="email"] {
  border-color: #c0392b;
  box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.1);
}

.file-input-wrapper.has-error .file-label {
  border-color: #c0392b;
  background: rgba(192, 57, 43, 0.05);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #c0392b;
  font-weight: 500;
}

.file-input-wrapper {
  position: relative;
  width: 100%;
}

.file-input-wrapper input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
}

.file-input-wrapper .file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px dashed #cfe0ee;
  border-radius: 10px;
  background: linear-gradient(135deg, #f8fafc 0%, #eff6fc 100%);
  color: #0a3a63;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.file-input-wrapper:hover .file-label {
  border-color: #2ba9e0;
  background: linear-gradient(135deg, #eff6fc 0%, #e6f3f9 100%);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
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

.btn--primary {
  background: #0a3a63;
  color: white;
}

.btn--primary:hover {
  background: #082e4f;
}

.btn--ghost {
  background: white;
  color: #0a3a63;
  border: 1px solid #e6eff6;
}

.btn--ghost:hover {
  background: #f8fafc;
}

.btn--primary:disabled,
.btn--ghost:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .form-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .tipologia-item {
    flex-direction: column;
    align-items: stretch;
  }

  .tipologia-item .btn--primary {
    width: 100%;
    justify-content: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
