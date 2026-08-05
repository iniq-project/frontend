<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(["close"])

const formData = ref({
  entidade: "",
  nif: "",
  telefone: "",
  email: "",
})
const errors = ref({})
const formSubmitted = ref(false)
const orderRef = ref("")
const processRef = ref("")
const totalAmount = ref(0)
const isSubmitting = ref(false)
const submitError = ref("")

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      formData.value = { entidade: "", nif: "", telefone: "", email: "" }
      errors.value = {}
      formSubmitted.value = false
      orderRef.value = ""
      processRef.value = ""
      totalAmount.value = 0
      isSubmitting.value = false
      submitError.value = ""
    }
  },
)

const formatPrice = (price) => {
  return (price ?? 0).toLocaleString("pt-PT")
}

const validateForm = () => {
  const newErrors = {}

  if (!formData.value.entidade.trim()) {
    newErrors.entidade = true
  }

  if (!formData.value.nif.trim()) {
    newErrors.nif = true
  }

  if (!formData.value.telefone.trim()) {
    newErrors.telefone = true
  }

  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  ) {
    newErrors.email = true
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  submitError.value = ""

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch("/api/processes/regulamentos/purchase", {
      method: "POST",
      body: {
        entityName: formData.value.entidade.trim(),
        entityNif: formData.value.nif.trim(),
        phone: formData.value.telefone.trim(),
        email: formData.value.email.trim(),
        regulamento: {
          cmsId: props.item?.cmsId,
          code: props.item?.code,
          title: props.item?.title,
          areaTecnica: props.item?.areaTecnica,
          estado: props.item?.estado,
          price: Number(props.item?.price ?? 0),
          documentUrl: props.item?.documentUrl || undefined,
        },
      },
    })

    orderRef.value = response.rupe?.reference ?? ""
    processRef.value = response.referenceNumber ?? ""
    totalAmount.value = Number(response.totalAmount ?? props.item?.price ?? 0)
    formSubmitted.value = true
  } catch (error) {
    const fetchError = error
    submitError.value =
      fetchError?.data?.statusMessage ??
      fetchError?.statusMessage ??
      fetchError?.data?.message ??
      "Não foi possível concluir a compra. Tente novamente."
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  emit("close")
}
</script>

<template>
  <div v-if="open" class="modal" :class="{ open }" @click.self="handleClose">
    <div class="modal-scrim" @click="handleClose"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="arcrtPurchaseModalTitle">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Acervo Nacional Regulamentar</span>
          <h3 id="arcrtPurchaseModalTitle">Comprar Regulamento Técnico</h3>
          <div class="modal-ref">{{ item?.code }} — {{ item?.title }}</div>
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
              <label for="rp-entidade">Entidade <span class="req">*</span></label>
              <input
                type="text"
                id="rp-entidade"
                name="entidade"
                placeholder="Nome da entidade ou empresa"
                v-model="formData.entidade"
                :class="{ error: errors.entidade }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.entidade" class="error-text">Por favor, informe a entidade</span>
            </div>
            <div class="field">
              <label for="rp-nif">NIF <span class="req">*</span></label>
              <input
                type="text"
                id="rp-nif"
                name="nif"
                placeholder="Número de Identificação Fiscal"
                v-model="formData.nif"
                :class="{ error: errors.nif }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.nif" class="error-text">Por favor, informe o NIF</span>
            </div>
            <div class="field">
              <label for="rp-telefone">Número de Telefone <span class="req">*</span></label>
              <input
                type="tel"
                id="rp-telefone"
                name="telefone"
                placeholder="+244 9XX XXX XXX"
                v-model="formData.telefone"
                :class="{ error: errors.telefone }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.telefone" class="error-text">Por favor, informe o número de telefone</span>
            </div>
            <div class="field">
              <label for="rp-email">E-mail <span class="req">*</span></label>
              <input
                type="email"
                id="rp-email"
                name="email"
                placeholder="nome@exemplo.ao"
                v-model="formData.email"
                :class="{ error: errors.email }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.email" class="error-text">Por favor, informe um e-mail válido</span>
            </div>

            <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>

            <div class="modal-foot">
              <button type="button" class="btn btn--ghost" :disabled="isSubmitting" @click="handleClose">
                Cancelar
              </button>
              <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
                {{ isSubmitting ? "A processar…" : "Comprar" }}
                <svg
                  v-if="!isSubmitting"
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
          </form>
        </div>

        <div v-if="formSubmitted" class="modal-success">
          <div class="ok">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <h3>RUPE gerado com sucesso</h3>
          <p>
            Utilize o RUPE abaixo para efectuar o pagamento de
            <strong>{{ formatPrice(totalAmount || item?.price) }} AOA</strong>.
            Após a confirmação automática do pagamento, aceda ao dashboard INIQ com este e-mail
            para consultar e descarregar o regulamento em “Os Meus Regulamentos”.
            Se for a primeira compra com este e-mail, as credenciais foram enviadas por mensagem.
          </p>
          <div class="order-ref">{{ orderRef }}</div>
          <p v-if="processRef" class="process-ref">Processo: {{ processRef }}</p>
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
  background: rgba(15, 23, 42, 0.55);
}

.modal-panel {
  position: relative;
  z-index: 1;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  margin: 24px auto;
  background: #fff;
  border-radius: 14px;
  overflow: auto;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.28);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px 0;
}

.eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #2ba9e0;
  margin-bottom: 6px;
}

.modal-head h3 {
  margin: 0;
  font-size: 22px;
  color: #0a3a63;
}

.modal-ref {
  margin-top: 6px;
  color: #64748b;
  font-size: 14px;
}

.modal-close {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #f1f5f9;
  color: #0f172a;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.modal-close svg {
  width: 18px;
  height: 18px;
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

.field input {
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

.field input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.field input.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field input:focus {
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

.submit-error {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: 6px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 0.9rem;
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

.btn--primary:hover:not(:disabled) {
  background: #082e4f;
}

.btn--primary:disabled,
.btn--ghost:disabled {
  opacity: 0.65;
  cursor: not-allowed;
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

.btn--ghost:hover:not(:disabled) {
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
  max-width: 460px;
  margin: 0 auto;
}

.order-ref {
  display: inline-block;
  font-family: monospace;
  font-size: 14px;
  color: #0a3a63;
  background: #eff6fc;
  border: 1px dashed #d0d9e3;
  border-radius: 6px;
  padding: 12px 20px;
  margin: 22px 0 8px;
}

.process-ref {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 12px !important;
}

@media (max-width: 1199px) {
  .modal-panel {
    width: calc(100vw - 24px);
    max-height: calc(100vh - 32px);
    border-radius: 12px;
  }

  .modal-head,
  .modal-body {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
