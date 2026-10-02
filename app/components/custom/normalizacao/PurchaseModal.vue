<script setup>
import { ref, computed, watch, onUnmounted } from "vue"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  norma: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(["close"])

const formData = ref({
  nomeEntidade: "",
  email: "",
  nif: "",
})
const errors = ref({})
const formSubmitted = ref(false)
const orderRef = ref("")
const expireAt = ref(null)
const now = ref(Date.now())
const isSubmitting = ref(false)
const submitError = ref("")

let countdownTimer = null

const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}

const startCountdown = () => {
  stopCountdown()
  now.value = Date.now()
  countdownTimer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
}

const remainingMs = computed(() => {
  if (!expireAt.value) return 0
  return Math.max(0, new Date(expireAt.value).getTime() - now.value)
})

const isExpired = computed(() => Boolean(expireAt.value) && remainingMs.value <= 0)

const countdownParts = computed(() => {
  const totalSeconds = Math.floor(remainingMs.value / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  }
})

const expireAtLabel = computed(() => {
  if (!expireAt.value) return ""
  return new Date(expireAt.value).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      formData.value = { nomeEntidade: "", email: "", nif: "" }
      errors.value = {}
      formSubmitted.value = false
      orderRef.value = ""
      expireAt.value = null
      isSubmitting.value = false
      submitError.value = ""
      stopCountdown()
    } else {
      stopCountdown()
    }
  },
)

onUnmounted(stopCountdown)

const formatPrice = (price) => {
  return (price ?? 0).toLocaleString("pt-PT")
}

const validateForm = () => {
  const newErrors = {}

  if (!formData.value.nomeEntidade.trim()) {
    newErrors.nomeEntidade = true
  }

  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  ) {
    newErrors.email = true
  }

  if (!formData.value.nif.trim()) {
    newErrors.nif = true
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  submitError.value = ""

  if (!validateForm()) {
    return
  }

  if (!props.norma?.reference) {
    submitError.value = "Norma inválida. Feche o modal e tente novamente."
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch("/api/processes/normalizacao/purchase", {
      method: "POST",
      timeout: 180_000,
      body: {
        entityName: formData.value.nomeEntidade.trim(),
        entityNif: formData.value.nif.trim(),
        email: formData.value.email.trim(),
        norma: {
          cmsId: props.norma.cmsId,
          code: props.norma.reference,
          title: props.norma.title,
          price: Number(props.norma.price ?? 0),
          ics: props.norma.ics || undefined,
          category: props.norma.categoria || undefined,
          year: props.norma.ano || undefined,
          technicalCommittee: props.norma.comissaoTecnica || undefined,
          estado: props.norma.estado || undefined,
        },
      },
    })

    orderRef.value = response.rupe?.reference ?? ""
    expireAt.value = response.rupe?.expireAt ?? null
    formSubmitted.value = true
    if (expireAt.value) startCountdown()
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
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="purchaseModalTitle">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Venda de Normas</span>
          <h3 id="purchaseModalTitle">Solicitar Norma</h3>
          <div class="modal-ref">{{ norma?.reference }} — {{ norma?.title }}</div>
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
              <label for="p-entidade">Entidade <span class="req">*</span></label>
              <input
                type="text"
                id="p-entidade"
                required
                placeholder="Nome da entidade ou empresa"
                v-model="formData.nomeEntidade"
                :class="{ error: errors.nomeEntidade }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.nomeEntidade" class="error-text">Por favor, informe a entidade</span>
            </div>
            <div class="field">
              <label for="p-email">E-mail <span class="req">*</span></label>
              <input
                type="email"
                id="p-email"
                required
                placeholder="nome@exemplo.ao"
                v-model="formData.email"
                :class="{ error: errors.email }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.email" class="error-text">Por favor, informe um e-mail válido</span>
            </div>
            <div class="field">
              <label for="p-nif">NIF <span class="req">*</span></label>
              <input
                type="text"
                id="p-nif"
                required
                placeholder="Número de Identificação Fiscal"
                v-model="formData.nif"
                :class="{ error: errors.nif }"
                :disabled="isSubmitting"
              />
              <span v-if="errors.nif" class="error-text">Por favor, informe o NIF</span>
            </div>
            <p v-if="submitError" class="error-text submit-error">{{ submitError }}</p>
            <div class="modal-foot">
              <button type="button" class="btn btn--ghost" @click="handleClose" :disabled="isSubmitting">
                Cancelar
              </button>
              <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
                {{ isSubmitting ? "A submeter..." : "Submeter pedido" }}
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
            Utilize o RUPE abaixo para efectuar o pagamento de {{ formatPrice(norma?.price) }} AOA.
            Após confirmação automática do pagamento, o acesso à norma ficará disponível.
          </p>
          <div class="order-ref">{{ orderRef }}</div>

          <div class="payment-howto">
            <p class="payment-howto-title">Como pagar</p>
            <ol class="payment-howto-steps">
              <li>Aceda ao <strong>Multicaixa Express</strong> ou a um <strong>ATM</strong></li>
              <li>Seleccione <strong>Pagamentos</strong></li>
              <li>Escolha <strong>Pagamentos ao Estado</strong></li>
              <li>Introduza o número do RUPE acima e confirme o pagamento</li>
            </ol>
          </div>

          <div v-if="expireAt" class="expire-countdown" :class="{ expired: isExpired }">
            <p class="expire-label">
              {{ isExpired ? "RUPE expirado" : "Tempo restante para pagamento" }}
            </p>
            <div v-if="!isExpired" class="countdown-grid" aria-live="polite">
              <div class="countdown-unit">
                <span class="countdown-value">{{ countdownParts.days }}</span>
                <span class="countdown-unit-label">dias</span>
              </div>
              <div class="countdown-sep">:</div>
              <div class="countdown-unit">
                <span class="countdown-value">{{ countdownParts.hours }}</span>
                <span class="countdown-unit-label">horas</span>
              </div>
              <div class="countdown-sep">:</div>
              <div class="countdown-unit">
                <span class="countdown-value">{{ countdownParts.minutes }}</span>
                <span class="countdown-unit-label">min</span>
              </div>
              <div class="countdown-sep">:</div>
              <div class="countdown-unit">
                <span class="countdown-value">{{ countdownParts.seconds }}</span>
                <span class="countdown-unit-label">seg</span>
              </div>
            </div>
            <p class="expire-date">Validade: {{ expireAtLabel }}</p>
          </div>

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

.field input.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field input:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(27, 143, 214, 0.15);
}

.field input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-text {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 500;
}

.submit-error {
  margin-bottom: 12px;
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
  max-width: 420px;
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
  margin: 22px 0 16px;
}

.payment-howto {
  margin: 0 auto 20px;
  max-width: 420px;
  padding: 16px 18px;
  text-align: left;
  border-radius: 10px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
}

.payment-howto-title {
  margin: 0 0 10px !important;
  font-size: 13px;
  font-weight: 700;
  color: #0a3a63;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  max-width: none !important;
}

.payment-howto-steps {
  margin: 0;
  padding-left: 1.25rem;
  color: #334155;
  font-size: 14px;
  line-height: 1.55;
}

.payment-howto-steps li + li {
  margin-top: 6px;
}

.payment-howto-steps strong {
  color: #0a3a63;
  font-weight: 650;
}

.expire-countdown {
  margin: 0 auto 20px;
  max-width: 420px;
  padding: 16px 18px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.expire-countdown.expired {
  background: #fef2f2;
  border-color: #fecaca;
}

.expire-label {
  margin: 0 0 12px !important;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.expire-countdown.expired .expire-label {
  color: #b91c1c;
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.countdown-unit {
  min-width: 52px;
  padding: 8px 6px;
  border-radius: 8px;
  background: #eff6fc;
  border: 1px solid #d0d9e3;
}

.countdown-value {
  display: block;
  font-family: monospace;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.1;
  color: #0a3a63;
}

.countdown-unit-label {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.countdown-sep {
  font-family: monospace;
  font-size: 20px;
  font-weight: 700;
  color: #94a3b8;
  padding-bottom: 14px;
}

.expire-date {
  margin: 12px 0 0 !important;
  font-size: 13px;
  color: #64748b;
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
