<script setup>
import { ref, watch } from "vue"
import { generateRupe } from "@/utils/rupe"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(["close"])

const formData = ref({
  tipoInstrumento: "",
  marca: "",
  modelo: "",
  numeroSerie: "",
  quantidade: "",
  nomeRequerente: "",
  nif: "",
  email: "",
  telefone: "",
})

const files = ref({
  cartaDG: null,
  nifDoc: null,
  alvara: null,
  fichaTecnica: null,
})

const errors = ref({})
const formSubmitted = ref(false)
const orderRef = ref("")

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      formData.value = {
        tipoInstrumento: "",
        marca: "",
        modelo: "",
        numeroSerie: "",
        quantidade: "",
        nomeRequerente: "",
        nif: "",
        email: "",
        telefone: "",
      }
      files.value = { cartaDG: null, nifDoc: null, alvara: null, fichaTecnica: null }
      errors.value = {}
      formSubmitted.value = false
      orderRef.value = ""
    }
  },
)

const formatPrice = (price) => {
  return (price ?? 0).toLocaleString("pt-PT")
}

const handleFileChange = (event, key) => {
  const target = event.target
  if (target.files && target.files.length > 0) {
    files.value[key] = target.files[0]
    if (errors.value[key]) {
      errors.value[key] = false
    }
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!formData.value.tipoInstrumento.trim()) newErrors.tipoInstrumento = true
  if (!formData.value.marca.trim()) newErrors.marca = true
  if (!formData.value.modelo.trim()) newErrors.modelo = true
  if (!formData.value.numeroSerie.trim()) newErrors.numeroSerie = true
  if (!formData.value.quantidade.trim()) newErrors.quantidade = true
  if (!formData.value.nomeRequerente.trim()) newErrors.nomeRequerente = true
  if (!formData.value.nif.trim()) newErrors.nif = true
  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  ) {
    newErrors.email = true
  }
  if (!formData.value.telefone.trim()) newErrors.telefone = true

  if (!files.value.cartaDG) newErrors.cartaDG = true
  if (!files.value.nifDoc) newErrors.nifDoc = true
  if (!files.value.alvara) newErrors.alvara = true
  if (props.service?.requiresFichaTecnica && !files.value.fichaTecnica) {
    newErrors.fichaTecnica = true
  }

  errors.value = newErrors

  if (Object.keys(newErrors).length > 0) {
    const firstErrorField = Object.keys(newErrors)[0]
    const fieldElement = document.querySelector(`[name="${firstErrorField}"]`)
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: "smooth", block: "center" })
      fieldElement.focus()
    }
    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  const { reference } = generateRupe(props.service?.fee)
  orderRef.value = reference
  formSubmitted.value = true
}

const handleClose = () => {
  emit("close")
}
</script>

<template>
  <div v-if="open" class="modal" :class="{ open }" @click.self="handleClose">
    <div class="modal-scrim" @click="handleClose"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="solicitarModalTitle">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Serviços de Metrologia</span>
          <h3 id="solicitarModalTitle">Solicitar Serviço</h3>
          <div class="modal-ref">{{ service?.title }}</div>
        </div>
        <button class="modal-close" @click="handleClose" aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="!formSubmitted" class="form-wrap">
          <form @submit.prevent="handleSubmit" novalidate>
            <h4 class="section-title">Dados do instrumento</h4>
            <div class="field-row">
              <div class="field">
                <label for="m-tipo">Tipo de instrumento <span class="req">*</span></label>
                <input
                  type="text"
                  id="m-tipo"
                  name="tipoInstrumento"
                  placeholder="Ex.: Balança, bomba de combustível…"
                  v-model="formData.tipoInstrumento"
                  :class="{ error: errors.tipoInstrumento }"
                />
                <span v-if="errors.tipoInstrumento" class="error-text">Por favor, informe o tipo de instrumento</span>
              </div>
              <div class="field">
                <label for="m-marca">Marca <span class="req">*</span></label>
                <input
                  type="text"
                  id="m-marca"
                  name="marca"
                  placeholder="Ex.: Mettler Toledo, Endress+Hauser…"
                  v-model="formData.marca"
                  :class="{ error: errors.marca }"
                />
                <span v-if="errors.marca" class="error-text">Por favor, informe a marca</span>
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="m-modelo">Modelo <span class="req">*</span></label>
                <input
                  type="text"
                  id="m-modelo"
                  name="modelo"
                  placeholder="Ex.: XPR205, PROline Promag W400…"
                  v-model="formData.modelo"
                  :class="{ error: errors.modelo }"
                />
                <span v-if="errors.modelo" class="error-text">Por favor, informe o modelo</span>
              </div>
              <div class="field">
                <label for="m-serie">Número de série <span class="req">*</span></label>
                <input
                  type="text"
                  id="m-serie"
                  name="numeroSerie"
                  placeholder="Número de série do instrumento"
                  v-model="formData.numeroSerie"
                  :class="{ error: errors.numeroSerie }"
                />
                <span v-if="errors.numeroSerie" class="error-text">Por favor, informe o número de série</span>
              </div>
            </div>
            <div class="field">
              <label for="m-qtd">Quantidade de instrumentos a certificar <span class="req">*</span></label>
              <input
                type="number"
                min="1"
                id="m-qtd"
                name="quantidade"
                placeholder="Ex.: 1"
                v-model="formData.quantidade"
                :class="{ error: errors.quantidade }"
              />
              <span v-if="errors.quantidade" class="error-text">Por favor, informe a quantidade</span>
            </div>

            <h4 class="section-title">Dados do requerente</h4>
            <div class="field">
              <label for="m-nome">Nome do requerente <span class="req">*</span></label>
              <input
                type="text"
                id="m-nome"
                name="nomeRequerente"
                placeholder="O seu nome completo"
                v-model="formData.nomeRequerente"
                :class="{ error: errors.nomeRequerente }"
              />
              <span v-if="errors.nomeRequerente" class="error-text">Por favor, informe o nome do requerente</span>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="m-nif">NIF <span class="req">*</span></label>
                <input
                  type="text"
                  id="m-nif"
                  name="nif"
                  placeholder="Ex.: 5417123456"
                  v-model="formData.nif"
                  :class="{ error: errors.nif }"
                />
                <span v-if="errors.nif" class="error-text">Por favor, informe o NIF</span>
              </div>
              <div class="field">
                <label for="m-email">E-mail <span class="req">*</span></label>
                <input
                  type="email"
                  id="m-email"
                  name="email"
                  placeholder="nome@exemplo.ao"
                  v-model="formData.email"
                  :class="{ error: errors.email }"
                />
                <span v-if="errors.email" class="error-text">Por favor, informe um e-mail válido</span>
              </div>
            </div>
            <div class="field">
              <label for="m-tel">Número de Telefone <span class="req">*</span></label>
              <input
                type="tel"
                id="m-tel"
                name="telefone"
                placeholder="+244 9XX XXX XXX"
                v-model="formData.telefone"
                :class="{ error: errors.telefone }"
              />
              <span v-if="errors.telefone" class="error-text">Por favor, informe o número de telefone</span>
            </div>

            <h4 class="section-title">Documentos obrigatórios</h4>
            <div class="field">
              <label for="m-cartaDG"
                >Carta ao Director-Geral, indicando a quantidade de instrumentos a certificar
                <span class="req">*</span></label
              >
              <div class="file-input-wrapper" :class="{ 'has-error': errors.cartaDG }">
                <input
                  type="file"
                  id="m-cartaDG"
                  name="cartaDG"
                  accept=".pdf"
                  @change="handleFileChange($event, 'cartaDG')"
                />
                <span class="file-label">{{
                  files.cartaDG ? files.cartaDG.name : "Selecionar ficheiro PDF"
                }}</span>
              </div>
              <span v-if="errors.cartaDG" class="error-message">Por favor, anexe a carta ao Director-Geral</span>
            </div>
            <div class="field">
              <label for="m-nifDoc">NIF (documento) <span class="req">*</span></label>
              <div class="file-input-wrapper" :class="{ 'has-error': errors.nifDoc }">
                <input
                  type="file"
                  id="m-nifDoc"
                  name="nifDoc"
                  accept=".pdf,image/*"
                  @change="handleFileChange($event, 'nifDoc')"
                />
                <span class="file-label">{{
                  files.nifDoc ? files.nifDoc.name : "Selecionar ficheiro"
                }}</span>
              </div>
              <span v-if="errors.nifDoc" class="error-message">Por favor, anexe o documento do NIF</span>
            </div>
            <div class="field">
              <label for="m-alvara">Alvará Comercial <span class="req">*</span></label>
              <div class="file-input-wrapper" :class="{ 'has-error': errors.alvara }">
                <input
                  type="file"
                  id="m-alvara"
                  name="alvara"
                  accept=".pdf,image/*"
                  @change="handleFileChange($event, 'alvara')"
                />
                <span class="file-label">{{
                  files.alvara ? files.alvara.name : "Selecionar ficheiro"
                }}</span>
              </div>
              <span v-if="errors.alvara" class="error-message">Por favor, anexe o Alvará Comercial</span>
            </div>
            <div v-if="service?.requiresFichaTecnica" class="field">
              <label for="m-ficha">Ficha Técnica da Balança <span class="req">*</span></label>
              <div class="file-input-wrapper" :class="{ 'has-error': errors.fichaTecnica }">
                <input
                  type="file"
                  id="m-ficha"
                  name="fichaTecnica"
                  accept=".pdf,image/*"
                  @change="handleFileChange($event, 'fichaTecnica')"
                />
                <span class="file-label">{{
                  files.fichaTecnica ? files.fichaTecnica.name : "Selecionar ficheiro"
                }}</span>
              </div>
              <span v-if="errors.fichaTecnica" class="error-message"
                >Por favor, anexe a Ficha Técnica da Balança</span
              >
            </div>

            <div class="modal-foot">
              <button type="button" class="btn btn--ghost" @click="handleClose">Cancelar</button>
              <button type="submit" class="btn btn--primary">
                Submeter pedido
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
          <h3>RUPE gerado com sucesso</h3>
          <p>
            Utilize o RUPE abaixo para efectuar o pagamento de {{ formatPrice(service?.fee) }} AOA
            referente a {{ service?.title }}. Após confirmação do pagamento, o processo segue o
            fluxo interno de aprovação e emissão da certificação.
          </p>
          <div class="order-ref">{{ orderRef }}</div>
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
  width: min(680px, calc(100vw - 32px));
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

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.65rem;
}

.section-title:not(:first-child) {
  margin-top: 2rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.error-text {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.875rem;
  color: #dc2626;
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

.file-input-wrapper.has-error .file-label {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.05);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
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
  margin: 22px 0;
}

@media (max-width: 1199px) {
  .field-row {
    grid-template-columns: 1fr;
  }

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
