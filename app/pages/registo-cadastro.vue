<script setup lang="ts">
import { inject, watch, ref, nextTick } from "vue"
import home from "@/gql/registro-cadastro/index.gql"
import type { DocumentsType } from "~/constants/document-requirements"
import { flattenDocumentSlots } from "~/constants/document-requirements"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ — Registo e Cadastro",
})

const { query } = useSquidex()
const data = await query(home, { key: "home" })

const leader = computed(
  () => data.value?.data.queryHomeregisterContents?.[0]?.data?.leader,
)

const documentSlots = flattenDocumentSlots("REGISTO_CADASTRO")

// Inject active sub-item from layout
const activeSubItemId = inject("activeSubItemId")

// Track if sub-item is selected
const isSubItemSelected = ref(false)
const showForm = ref(false)
const formSubmitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref("")
const referenceNumber = ref("")
const errors = ref<Record<string, boolean>>({})

// Ref for first input
const nomeInput = ref<HTMLInputElement | null>(null)

// Form data
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
}

// Watch for showForm to focus and scroll
watch(showForm, async (newValue) => {
  if (newValue) {
    await nextTick()
    if (nomeInput.value) {
      const formSection = document.querySelector(".form-section") as HTMLElement
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      // Small delay to let the section scroll, then focus
      setTimeout(() => {
        nomeInput.value?.focus()
      }, 300)
    }
  }
})

// Sync with layout
if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId) => {
      isSubItemSelected.value = !!newId
    },
    { immediate: true },
  )
}

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

function handleBackFromForm() {
  showForm.value = false
  resetForm()
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <template v-if="isSubItemSelected">
      <template v-if="!showForm">
        <section class="mt-12">
          <div class="container">
            <div class="panel-head">
              <span class="eyebrow">Requisitos</span>
              <h2>Documentação Necessária</h2>
              <p>
                Lista de documentos que deverá preparar para submeter o seu
                pedido de registo e cadastro.
              </p>
            </div>

            <div class="requisitos-list">
              <div class="requisito-item">
                <span class="requisito-num">1</span>
                <span class="requisito-text"
                  >Ofício dirigido ao INIQ (modelo Anexo 1)</span
                >
              </div>
              <div class="requisito-item">
                <span class="requisito-num">2</span>
                <span class="requisito-text"
                  >Relatório de Análise Técnica e Diagnóstico</span
                >
              </div>
              <div class="requisito-item">
                <span class="requisito-num">3</span>
                <span class="requisito-text"
                  >Formulários preenchidos + documentos de identificação + CV do
                  técnico responsável</span
                >
              </div>
              <div class="requisito-item">
                <span class="requisito-num">4</span>
                <span class="requisito-text"
                  >Cópias da documentação legal (Certidão de Registo Comercial,
                  Alvará Comercial, NIF)</span
                >
              </div>
              <div class="requisito-item">
                <span class="requisito-num">5</span>
                <span class="requisito-text">Apresentação da organização</span>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-12">
          <div class="container">
            <div class="download-section">
              <div class="download-info">
                <h3>Modelo do Ofício (Anexo 1)</h3>
                <p>
                  Faça o download do modelo de ofício para apresentar o seu
                  pedido.
                </p>
              </div>
              <a
                href="/docs/Modelo do Ofício.pdf"
                download
                class="btn btn--download"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Baixar
              </a>
            </div>
          </div>
        </section>

        <section class="mt-12">
          <div class="container">
            <button @click="showForm = true" class="btn btn--primary">
              Submeter Processo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
          </div>
        </section>
      </template>

      <template v-if="showForm">
        <section class="mt-12">
          <div class="container">
            <div class="form-section">
              <div class="form-header">
                <h3>Submeter Processo de Registo e Cadastro</h3>
                <button
                  type="button"
                  @click="handleBackFromForm"
                  class="btn btn--ghost"
                >
                  Voltar
                </button>
              </div>

              <div v-if="formSubmitted" class="success-message">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>
                  <b>Processo submetido com sucesso!</b>
                  Referência: <strong>{{ referenceNumber }}</strong
                  >. A equipa do INIQ irá analisar o seu pedido.
                </span>
              </div>

              <form v-else @submit.prevent="handleSubmit" novalidate>
                <div v-if="submitError" class="error-banner">
                  {{ submitError }}
                </div>
                <div class="field">
                  <label for="nome"
                    >Nome completo <span class="req">*</span></label
                  >
                  <div
                    class="input-wrapper"
                    :class="{ 'has-error': errors.nome }"
                  >
                    <input
                      ref="nomeInput"
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      placeholder="O seu nome completo"
                      v-model="formData.nome"
                      @input="errors.nome = false"
                    />
                  </div>
                  <span v-if="errors.nome" class="error-message"
                    >Por favor, informe seu nome completo</span
                  >
                </div>

                <div class="field">
                  <label for="email">E-mail <span class="req">*</span></label>
                  <div
                    class="input-wrapper"
                    :class="{ 'has-error': errors.email }"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="nome@exemplo.ao"
                      v-model="formData.email"
                      @input="errors.email = false"
                    />
                  </div>
                  <span v-if="errors.email" class="error-message"
                    >Por favor, informe um e-mail válido</span
                  >
                </div>

                <div
                  v-for="slot in documentSlots"
                  :key="slot.type"
                  class="field"
                >
                  <label :for="slot.type"
                    >{{ slot.label }} <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors[slot.type] }"
                  >
                    <input
                      type="file"
                      :id="slot.type"
                      :name="slot.type"
                      required
                      :accept="
                        slot.pdfOnly
                          ? 'application/pdf'
                          : '.pdf,.jpg,.jpeg,.png'
                      "
                      @change="handleFileChange($event, slot.type)"
                    />
                    <span class="file-label">{{
                      formData.files[slot.type]?.name ?? "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors[slot.type]" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="form-actions">
                  <button
                    type="button"
                    @click="handleBackFromForm"
                    class="btn btn--ghost"
                    :disabled="isSubmitting"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    class="btn btn--primary"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? "A enviar…" : "Enviar Processo" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}

.requisitos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.requisito-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  align-items: center;
}

.requisito-num {
  flex-shrink: 0;
  font-family: "Archivo", system-ui, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #5cb947;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e6eff6;
}

.requisito-text {
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 500;
}

.download-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  color: #0a3a63;
  font-weight: 700;
}

.download-info p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
}

.btn--download {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(92, 185, 71, 0.2);
}

.btn--download:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 185, 71, 0.3);
}

.btn--download svg {
  width: 22px;
  height: 22px;
}

.dg-top {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid #e6eff6;
}

.dg-photo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}

.dg-photo {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #5cb947;
  box-shadow: 0 4px 10px rgba(92, 185, 71, 0.15);
}

.dg-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}

.dg-details h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}

.dg-details .role {
  margin: 0;
  font-size: 1rem;
  color: #5cb947;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.dg-message {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: flex-start;
}

.dg-message h4 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
}

.dg-message p {
  margin: 0;
  font-size: 1.15rem;
  color: #334155;
  line-height: 1.7;
  font-style: italic;
  font-weight: 500;
}

.quality-policy-section {
  padding: 1.5rem 2rem 0 2rem;
  border-top: 1px solid #e6eff6;
}

.quality-policy-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #2ba9e0;
  padding-left: 0.75rem;
}

.quality-policy-section p {
  margin: 0;
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.8;
}

.mt-12 {
  margin-top: 3rem;
}

.container {
  padding: 0 2rem 2rem 2rem;
}

.panel-head {
  margin-bottom: 1.5rem;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
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
  transform: translateY(-1px);
}

.btn--ghost {
  background: white;
  color: #0a3a63;
  border: 1px solid #e6eff6;
}

.btn--ghost:hover {
  background: #f8fafc;
}

.download-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #eff6fc 0%, #e6f3f9 50%, #f0f7f2 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  box-shadow: 0 4px 16px rgba(10, 58, 99, 0.06);
  border: 1px solid #e6eff6;
}

.form-section {
  margin-top: 2rem;
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(10, 58, 99, 0.08);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f7f2;
}

.form-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #0a3a63;
  font-weight: 700;
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

.btn--primary:disabled,
.btn--ghost:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
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
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.1s;
  box-sizing: border-box;
}

.field input[type="text"]:focus,
.field input[type="email"]:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 4px rgba(43, 169, 224, 0.1);
}

.field input[type="text"]:hover,
.field input[type="email"]:hover {
  border-color: #cfe0ee;
}

/* Error states */
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
  transform: translateY(-1px);
}

.file-input-wrapper .file-label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232ba9e0'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' /%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.file-name {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
</style>
