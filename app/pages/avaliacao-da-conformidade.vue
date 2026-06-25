<script setup lang="ts">
import { inject, watch, ref, nextTick } from "vue"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Avaliação da Conformidade",
})

const activeSubItemId = inject("activeSubItemId")

const isSubItemSelected = ref(false)
const showForm = ref(false)
const formSubmitted = ref(false)
const errors = ref<Record<string, boolean>>({})

const nomeInput = ref<HTMLInputElement | null>(null)

const formData = ref({
  nome: "",
  email: "",
  doc1: null as File | null,
  doc2: null as File | null,
  doc3: null as File | null,
  doc4: null as File | null,
  doc5: null as File | null,
  doc6: null as File | null,
  doc7: null as File | null,
})

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

function handleFileChange(event: Event, docKey: keyof typeof formData) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.value[docKey] = target.files[0]
    // Clear error for this field
    if (errors.value[docKey]) {
      errors.value[docKey] = false
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

  if (!formData.value.doc1) {
    newErrors.doc1 = true
  }

  if (!formData.value.doc2) {
    newErrors.doc2 = true
  }

  if (!formData.value.doc3) {
    newErrors.doc3 = true
  }

  if (!formData.value.doc4) {
    newErrors.doc4 = true
  }

  if (!formData.value.doc5) {
    newErrors.doc5 = true
  }

  if (!formData.value.doc6) {
    newErrors.doc6 = true
  }

  if (!formData.value.doc7) {
    newErrors.doc7 = true
  }

  errors.value = newErrors

  // Focus on first error field
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

function handleSubmit() {
  if (!validateForm()) {
    return
  }

  formSubmitted.value = true
  setTimeout(() => {
    formSubmitted.value = false
    showForm.value = false
    formData.value = {
      nome: "",
      email: "",
      doc1: null,
      doc2: null,
      doc3: null,
      doc4: null,
      doc5: null,
      doc6: null,
      doc7: null,
    }
    errors.value = {}
  }, 3000)
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <div class="dg-top">
        <div class="dg-photo-wrapper">
          <img
            class="dg-photo"
            src="/director-geral.png"
            alt="Director-Geral"
          />
          <div class="dg-details">
            <h3>Carmo Adriana dos Santos</h3>
            <p class="role">Direcção-Geral</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Responsável</h4>
          <p>
            “A rotulagem e as embalagens são o primeiro ponto de contacto entre
            o produto e o consumidor, devendo ser claras, precisas e conformes
            aos requisitos aplicáveis.”
          </p>
        </div>
      </div>

      <div class="quality-policy-section mb-10">
        <h4>Política de Avaliação da Conformidade</h4>
        <p>
          O INIQ compromete-se a garantir que a rotulagem e as embalagens dos
          produtos comercializados no mercado nacional cumpram os requisitos
          técnicos e regulamentares aplicáveis, proporcionando informação clara
          e precisa aos consumidores.
        </p>
      </div>
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
                pedido de avaliação de conformidade.
              </p>
            </div>

            <div class="requisitos-list">
              <div class="requisito-item">
                <span class="requisito-num">1</span>
                <span class="requisito-text">Carta/Ofício</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">2</span>
                <span class="requisito-text">NIF</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">3</span>
                <span class="requisito-text">Fatura Comercial</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">4</span>
                <span class="requisito-text">Certificado de Origem</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">5</span>
                <span class="requisito-text">Teste de Ensaio</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">6</span>
                <span class="requisito-text">Especificações Técnicas</span>
              </div>
              <div class="requisito-item">
                <span class="requisito-num">7</span>
                <span class="requisito-text">Documento de Transporte</span>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-12">
          <div class="container">
            <div class="download-section">
              <div class="download-info">
                <h3>Modelo do Ofício</h3>
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
                <h3>Submeter Processo de Avaliação de Conformidade</h3>
                <button @click="showForm = false" class="btn btn--ghost">
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
                <span
                  ><b>Processo submetido com sucesso!</b> A equipa do INIQ irá
                  analisar o seu pedido.</span
                >
              </div>

              <form v-else @submit.prevent="handleSubmit" novalidate>
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

                <div class="field">
                  <label for="doc1"
                    >Doc. 1 — Carta/Ofício <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc1 }"
                  >
                    <input
                      type="file"
                      id="doc1"
                      name="doc1"
                      required
                      @change="handleFileChange($event, 'doc1')"
                    />
                    <span class="file-label">{{
                      formData.doc1 ? formData.doc1.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc1" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc2"
                    >Doc. 2 — NIF <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc2 }"
                  >
                    <input
                      type="file"
                      id="doc2"
                      name="doc2"
                      required
                      @change="handleFileChange($event, 'doc2')"
                    />
                    <span class="file-label">{{
                      formData.doc2 ? formData.doc2.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc2" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc3"
                    >Doc. 3 — Fatura Comercial <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc3 }"
                  >
                    <input
                      type="file"
                      id="doc3"
                      name="doc3"
                      required
                      @change="handleFileChange($event, 'doc3')"
                    />
                    <span class="file-label">{{
                      formData.doc3 ? formData.doc3.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc3" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc4"
                    >Doc. 4 — Certificado de Origem
                    <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc4 }"
                  >
                    <input
                      type="file"
                      id="doc4"
                      name="doc4"
                      required
                      @change="handleFileChange($event, 'doc4')"
                    />
                    <span class="file-label">{{
                      formData.doc4 ? formData.doc4.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc4" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc5"
                    >Doc. 5 — Teste de Ensaio <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc5 }"
                  >
                    <input
                      type="file"
                      id="doc5"
                      name="doc5"
                      required
                      @change="handleFileChange($event, 'doc5')"
                    />
                    <span class="file-label">{{
                      formData.doc5 ? formData.doc5.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc5" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc6"
                    >Doc. 6 — Especificações Técnicas
                    <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc6 }"
                  >
                    <input
                      type="file"
                      id="doc6"
                      name="doc6"
                      required
                      @change="handleFileChange($event, 'doc6')"
                    />
                    <span class="file-label">{{
                      formData.doc6 ? formData.doc6.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc6" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="field">
                  <label for="doc7"
                    >Doc. 7 — Documento de Transporte
                    <span class="req">*</span></label
                  >
                  <div
                    class="file-input-wrapper"
                    :class="{ 'has-error': errors.doc7 }"
                  >
                    <input
                      type="file"
                      id="doc7"
                      name="doc7"
                      required
                      @change="handleFileChange($event, 'doc7')"
                    />
                    <span class="file-label">{{
                      formData.doc7 ? formData.doc7.name : "Escolher arquivo"
                    }}</span>
                  </div>
                  <span v-if="errors.doc7" class="error-message"
                    >Por favor, selecione este arquivo</span
                  >
                </div>

                <div class="form-actions">
                  <button
                    type="button"
                    @click="showForm = false"
                    class="btn btn--ghost"
                  >
                    Voltar
                  </button>
                  <button type="submit" class="btn btn--primary">
                    Enviar Processo
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
</style>
