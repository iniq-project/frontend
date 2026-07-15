<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(["close"])

const formData = ref({
  nome: "",
  email: "",
  telefone: "",
  comentario: "",
})
const errors = ref({})
const formSubmitted = ref(false)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      formData.value = { nome: "", email: "", telefone: "", comentario: "" }
      errors.value = {}
      formSubmitted.value = false
    }
  },
)

const validateForm = () => {
  const newErrors = {}

  if (!formData.value.nome.trim()) {
    newErrors.nome = true
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

  if (!formData.value.comentario.trim()) {
    newErrors.comentario = true
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  formSubmitted.value = true
}

const handleClose = () => {
  emit("close")
}
</script>

<template>
  <div v-if="open" class="modal" :class="{ open }" @click.self="handleClose">
    <div class="modal-scrim" @click="handleClose"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="commentModalTitle">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Consulta Pública</span>
          <h3 id="commentModalTitle">Submeter Contribuição</h3>
          <div class="modal-ref">{{ project?.code }} — {{ project?.title }}</div>
        </div>
        <button class="modal-close" @click="handleClose" aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="!formSubmitted" class="form-wrap">
          <form @submit.prevent="handleSubmit">
            <div class="field">
              <label for="c-nome">Nome <span class="req">*</span></label>
              <input
                type="text"
                id="c-nome"
                required
                placeholder="O seu nome"
                v-model="formData.nome"
                :class="{ error: errors.nome }"
              />
              <span v-if="errors.nome" class="error-text">Por favor, informe o seu nome</span>
            </div>
            <div class="field">
              <label for="c-email">E-mail <span class="req">*</span></label>
              <input
                type="email"
                id="c-email"
                required
                placeholder="nome@exemplo.com"
                v-model="formData.email"
                :class="{ error: errors.email }"
              />
              <span v-if="errors.email" class="error-text">Por favor, informe um e-mail válido</span>
            </div>
            <div class="field">
              <label for="c-tel">Número de Telefone <span class="req">*</span></label>
              <input
                type="tel"
                id="c-tel"
                required
                placeholder="+244 9XX XXX XXX"
                v-model="formData.telefone"
                :class="{ error: errors.telefone }"
              />
              <span v-if="errors.telefone" class="error-text">Por favor, informe o número de telefone</span>
            </div>
            <div class="field">
              <label for="c-comentario">Comentário <span class="req">*</span></label>
              <textarea
                id="c-comentario"
                placeholder="Indique o artigo/secção e a redacção alternativa proposta, com a respectiva fundamentação."
                v-model="formData.comentario"
                :class="{ error: errors.comentario }"
              ></textarea>
              <span v-if="errors.comentario" class="error-text">Por favor, escreva o seu comentário</span>
            </div>
            <div class="modal-foot">
              <button type="button" class="btn btn--ghost" @click="handleClose">Cancelar</button>
              <button type="submit" class="btn btn--primary">
                Enviar contribuição
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div v-if="formSubmitted" class="modal-success">
          <div class="ok">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <h3>Contribuição enviada com sucesso</h3>
          <p>
            A sua contribuição foi registada e será analisada pela Comissão Técnica responsável.
            Receberá por e-mail o resultado do tratamento.
          </p>
          <div class="modal-foot" style="justify-content: center">
            <button type="button" class="btn btn--primary" @click="handleClose">Concluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: none;
}

.modal.open {
  display: block;
}

.modal-scrim {
  position: absolute;
  inset: 0;
  background: rgba(16, 33, 48, 0.55);
  backdrop-filter: blur(3px);
}

.modal-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 24px 56px -18px rgba(10, 58, 99, 0.3), 0 8px 20px -10px rgba(16, 33, 48, 0.12);
}

.modal-head {
  position: sticky;
  top: 0;
  background: white;
  padding: 24px 28px 18px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  z-index: 2;
}

.modal-head .eyebrow {
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

.modal-head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.modal-head h3 {
  font-size: 22px;
  margin: 0;
  color: #0a3a63;
}

.modal-ref {
  font-family: monospace;
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
}

.modal-close {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #64748b;
}

.modal-close:hover {
  border-color: #2ba9e0;
  color: #0a3a63;
}

.modal-body {
  padding: 24px 28px 28px;
}

.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 7px;
  color: #475569;
}

.field label .req {
  color: #dc2626;
}

.field input,
.field textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d0d9e3;
  border-radius: 6px;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.field textarea {
  resize: vertical;
  min-height: 84px;
}

.field input.error,
.field textarea.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(27, 143, 214, 0.15);
}

.error-text {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 500;
}

.modal-foot {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  flex-wrap: wrap;
}

.btn--primary {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: #0a3a63;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn--primary:hover {
  background: #082e4f;
}

.btn--ghost {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}

.modal-success {
  text-align: center;
  padding: 20px 10px 6px;
  display: block;
}

.modal-success .ok {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(52, 161, 63, 0.13);
  color: #34a13f;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
}

.modal-success .ok svg {
  width: 36px;
  height: 36px;
}

.modal-success h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #0a3a63;
}

.modal-success p {
  color: #475569;
  max-width: 420px;
  margin: 0 auto;
}

@media (max-width: 1199px) {
  .modal-panel {
    width: calc(100vw - 24px);
    max-height: calc(100vh - 32px);
    border-radius: 12px;
  }

  .modal-head,
  .modal-body {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .modal-foot {
    flex-direction: column;
  }

  .modal-foot .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
