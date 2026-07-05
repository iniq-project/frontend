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
const fileInput = ref<HTMLInputElement | null>(null);

const formData = ref({
  carta: null as File | null,
});

// Watch for show to focus and scroll
watch(() => props.show, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (fileInput.value) {
      const formSection = document.querySelector(".form-section") as HTMLElement;
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
});

function handleFileChange(event: Event, docKey: keyof typeof formData) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData.value[docKey] = target.files[0];
    if (errors.value[docKey]) {
      errors.value[docKey] = false;
    }
  }
}

function validateForm(): boolean {
  const newErrors: Record<string, boolean> = {};

  if (!formData.value.carta) {
    newErrors.carta = true;
  }

  errors.value = newErrors;

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

  emit("submit", { ...formData.value });

  setTimeout(() => {
    formSubmitted.value = false;
    resetForm();
    emit("close");
  }, 3000);
}

function resetForm() {
  formData.value = {
    carta: null,
  };
  errors.value = {};
}
</script>

<template>
  <section v-if="show" class="mt-12">
    <div class="container">
      <div class="form-section">
        <div class="form-header">
          <h3>Submeter Carta ao Director-Geral</h3>
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
            ><b>Carta submetida com sucesso!</b> A equipa do INIQ irá
            analisar o seu pedido.</span
          >
        </div>

        <form v-else @submit.prevent="handleSubmit" novalidate>
          <div class="field">
            <label for="carta"
              >Carta ao Director-Geral (PDF) <span class="req">*</span></label
            >
            <div
              class="file-input-wrapper"
              :class="{ 'has-error': errors.carta }"
            >
              <input
                ref="fileInput"
                type="file"
                id="carta"
                name="carta"
                accept=".pdf"
                required
                @change="handleFileChange($event, 'carta')"
              />
              <span class="file-label">{{
                formData.carta ? formData.carta.name : "Selecionar ficheiro PDF"
              }}</span>
            </div>
            <span v-if="errors.carta" class="error-message"
              >Por favor, selecione o ficheiro da carta em formato PDF</span
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
              Enviar Carta
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
  border-color: #2ba9e0;
}
</style>
