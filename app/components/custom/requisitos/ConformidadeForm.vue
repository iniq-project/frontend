<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close", "submit"]);

const formSubmitted = ref(false);
const errors = ref<Record<string, boolean>>({});

const nomeInput = ref<HTMLInputElement | null>(null);

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
});

// Watch for show to focus and scroll
watch(() => props.show, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (nomeInput.value) {
      const formSection = document.querySelector(".form-section") as HTMLElement;
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Small delay to let the section scroll, then focus
      setTimeout(() => {
        nomeInput.value?.focus();
      }, 300);
    }
  }
});

function handleFileChange(event: Event, docKey: keyof typeof formData) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData.value[docKey] = target.files[0];
    // Clear error for this field
    if (errors.value[docKey]) {
      errors.value[docKey] = false;
    }
  }
}

function validateForm(): boolean {
  const newErrors: Record<string, boolean> = {};

  if (!formData.value.nome.trim()) {
    newErrors.nome = true;
  }

  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  ) {
    newErrors.email = true;
  }

  if (!formData.value.doc1) {
    newErrors.doc1 = true;
  }

  if (!formData.value.doc2) {
    newErrors.doc2 = true;
  }

  if (!formData.value.doc3) {
    newErrors.doc3 = true;
  }

  if (!formData.value.doc4) {
    newErrors.doc4 = true;
  }

  if (!formData.value.doc5) {
    newErrors.doc5 = true;
  }

  if (!formData.value.doc6) {
    newErrors.doc6 = true;
  }

  if (!formData.value.doc7) {
    newErrors.doc7 = true;
  }

  errors.value = newErrors;

  // Focus on first error field
  if (Object.keys(newErrors).length > 0) {
    const firstErrorField = Object.keys(newErrors)[0];
    const fieldElement = document.querySelector(
      `[name="${firstErrorField}"]`
    ) as HTMLElement;
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
      fieldElement.focus();
    }
    return false;
  }

  return true;
}

function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  formSubmitted.value = true;

  // Emit submit event with form data
  emit("submit", { ...formData.value });

  setTimeout(() => {
    formSubmitted.value = false;
    resetForm();
    emit("close");
  }, 3000);
}

function resetForm() {
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
  };
  errors.value = {};
}
</script>

<template>
  <section v-if="show" class="mt-12">
    <div class="container">
      <div class="form-section">
        <div class="form-header">
          <h3>Submeter Processo de Avaliação de Conformidade</h3>
          <button @click="emit('close')" class="btn btn--ghost">
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
              @click="emit('close')"
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

<style scoped>
.mt-12 {
  margin-top: 3rem;
}

.container {
  padding: 0 2rem 2rem 2rem;
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
</style>