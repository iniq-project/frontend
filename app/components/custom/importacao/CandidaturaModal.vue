<script setup lang="ts">
import { ref, watch, nextTick } from "vue"

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(["close"])

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NIF_PATTERN = /^\d{9,10}$/
const NIF_FABRICANTE_PATTERN = /^[0-9A-Za-z]{9,14}$/
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
const FILE_TOO_LARGE_MESSAGE = "O ficheiro não pode exceder 2 MB"

type Fabricante = "" | "sim" | "nao"
type SingleFileKey =
  | "autodeclaracao"
  | "relatorio1"
  | "relatorio2"
  | "relatorio3"

const steps = [
  { key: "entidade", label: "Entidade", title: "Entidade requerente" },
  { key: "produto", label: "Produto", title: "Produto" },
  {
    key: "conformidade",
    label: "Conformidade",
    title: "Conformidade e ensaios",
  },
  { key: "fabricante", label: "Fabricante", title: "Fabricante" },
]

// Campos (e erros) que pertencem a cada passo
const stepFields: string[][] = [
  ["entidade", "nif", "email"],
  ["produto", "referencia", "caracteristica"],
  [
    "norma",
    "autodeclaracao",
    "certificacoes",
    "relatorio1",
    "relatorio2",
    "relatorio3",
    "laboratorio",
  ],
  ["fabricante", "fabNome", "fabNif", "fabAlvara", "fabContacto", "fabEmail"],
]

const lastStep = steps.length - 1

const emptyForm = () => ({
  // 1 · Entidade requerente
  entidade: "",
  nif: "",
  email: "",
  // 2 · Produto
  produto: "",
  referencia: "",
  caracteristica: "",
  // 3 · Conformidade e ensaios
  norma: "",
  laboratorio: "",
  // 4 · Fabricante
  fabricante: "" as Fabricante,
  fabNome: "",
  fabNif: "",
  fabAlvara: "",
  fabContacto: "",
  fabEmail: "",
})

const emptyFiles = () => ({
  autodeclaracao: null as File | null,
  certificacoes: [] as File[],
  relatorio1: null as File | null,
  relatorio2: null as File | null,
  relatorio3: null as File | null,
})

const currentStep = ref(0)
const formData = ref(emptyForm())
const files = ref(emptyFiles())
const errors = ref<Record<string, string>>({})
const formSubmitted = ref(false)
const submitError = ref("")
const isSubmitting = ref(false)
const processRef = ref("")
const bodyRef = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    currentStep.value = 0
    formData.value = emptyForm()
    files.value = emptyFiles()
    errors.value = {}
    formSubmitted.value = false
    submitError.value = ""
    isSubmitting.value = false
    processRef.value = ""
  },
)

// Ao escolher "Sou o fabricante", limpa os dados do fabricante
watch(
  () => formData.value.fabricante,
  (value) => {
    delete errors.value.fabricante
    if (value !== "nao") {
      formData.value.fabNome = ""
      formData.value.fabNif = ""
      formData.value.fabAlvara = ""
      formData.value.fabContacto = ""
      formData.value.fabEmail = ""
      for (const key of [
        "fabNome",
        "fabNif",
        "fabAlvara",
        "fabContacto",
        "fabEmail",
      ]) {
        delete errors.value[key]
      }
    }
  },
)

const textValue = (value: unknown) => String(value ?? "").trim()

const scrollToTop = async () => {
  await nextTick()
  bodyRef.value?.scrollTo({ top: 0, behavior: "smooth" })
}

const hasAllowedType = (file: File, pdfOnly: boolean) => {
  const name = file.name.toLowerCase()
  if (pdfOnly) return name.endsWith(".pdf")
  return /\.(pdf|jpe?g|png)$/.test(name)
}

const validateFile = (file: File, pdfOnly: boolean) => {
  if (!hasAllowedType(file, pdfOnly)) {
    return pdfOnly
      ? "O ficheiro deve ser um PDF"
      : "O ficheiro deve ser PDF, JPG ou PNG"
  }
  if (file.size > MAX_FILE_SIZE) return FILE_TOO_LARGE_MESSAGE
  return ""
}

const onSingleFile = (key: SingleFileKey, event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (file.size > MAX_FILE_SIZE) {
    files.value[key] = null
    input.value = ""
    errors.value[key] = FILE_TOO_LARGE_MESSAGE
    return
  }
  files.value[key] = file
  delete errors.value[key]
}

const onMultipleFiles = (event: Event) => {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files ?? [])
  if (!selected.length) return
  if (selected.some((file) => file.size > MAX_FILE_SIZE)) {
    files.value.certificacoes = []
    input.value = ""
    errors.value.certificacoes = FILE_TOO_LARGE_MESSAGE
    return
  }
  files.value.certificacoes = selected
  delete errors.value.certificacoes
}

// Calcula os erros de TODO o formulário
const computeErrors = () => {
  const next: Record<string, string> = {}

  // 1 · Entidade requerente
  if (!textValue(formData.value.entidade)) {
    next.entidade = "Por favor, indique o nome da entidade"
  }

  const nif = textValue(formData.value.nif).replace(/\s/g, "")
  if (!nif) {
    next.nif = "Por favor, informe o NIF"
  } else if (!NIF_PATTERN.test(nif)) {
    next.nif = "O NIF deve ter 9 ou 10 dígitos"
  }

  const email = textValue(formData.value.email)
  if (!email) {
    next.email = "Por favor, informe o e-mail"
  } else if (!EMAIL_PATTERN.test(email)) {
    next.email = "Introduza um e-mail válido"
  }

  // 2 · Produto
  if (!textValue(formData.value.produto))
    next.produto = "Por favor, indique o produto"
  if (!textValue(formData.value.referencia))
    next.referencia = "Por favor, indique a referência"
  if (!textValue(formData.value.caracteristica)) {
    next.caracteristica = "Por favor, descreva as características do produto"
  }

  // 3 · Conformidade e ensaios
  if (!textValue(formData.value.norma))
    next.norma = "Por favor, indique a norma técnica"
  if (!textValue(formData.value.laboratorio))
    next.laboratorio = "Por favor, indique o laboratório"

  const singleFiles: Array<{
    key: SingleFileKey
    pdfOnly: boolean
    missing: string
  }> = [
    {
      key: "autodeclaracao",
      pdfOnly: false,
      missing: "Anexe a autodeclaração de conformidade",
    },
    {
      key: "relatorio1",
      pdfOnly: true,
      missing: "Anexe o relatório de ensaio 1",
    },
    {
      key: "relatorio2",
      pdfOnly: true,
      missing: "Anexe o relatório de ensaio 2",
    },
    {
      key: "relatorio3",
      pdfOnly: true,
      missing: "Anexe o relatório de ensaio 3",
    },
  ]

  for (const { key, pdfOnly, missing } of singleFiles) {
    const file = files.value[key]
    if (!file) {
      next[key] =
        errors.value[key] === FILE_TOO_LARGE_MESSAGE
          ? FILE_TOO_LARGE_MESSAGE
          : missing
    } else {
      const problem = validateFile(file, pdfOnly)
      if (problem) next[key] = problem
    }
  }

  if (!files.value.certificacoes.length) {
    next.certificacoes =
      errors.value.certificacoes === FILE_TOO_LARGE_MESSAGE
        ? FILE_TOO_LARGE_MESSAGE
        : "Anexe pelo menos um ficheiro"
  } else {
    for (const file of files.value.certificacoes) {
      const problem = validateFile(file, false)
      if (problem) {
        next.certificacoes = `${file.name}: ${problem}`
        break
      }
    }
  }

  // 4 · Fabricante
  if (!formData.value.fabricante) {
    next.fabricante = "Escolha uma opção"
  } else if (formData.value.fabricante === "nao") {
    if (!textValue(formData.value.fabNome))
      next.fabNome = "Por favor, indique o nome do fabricante"
    if (!textValue(formData.value.fabContacto))
      next.fabContacto = "Por favor, indique o contacto"

    const fabEmail = textValue(formData.value.fabEmail)
    if (!fabEmail) {
      next.fabEmail = "Por favor, indique o e-mail do fabricante"
    } else if (!EMAIL_PATTERN.test(fabEmail)) {
      next.fabEmail = "Introduza um e-mail válido"
    }

    const fabNif = textValue(formData.value.fabNif).replace(/\s/g, "")
    if (fabNif && !NIF_FABRICANTE_PATTERN.test(fabNif)) {
      next.fabNif = "O NIF deve ter entre 9 e 14 caracteres"
    }
  }

  return next
}

// Valida apenas o passo indicado e mostra só os erros desse passo
const validateStep = (index: number) => {
  const all = computeErrors()
  const stepErrors: Record<string, string> = {}
  for (const key of stepFields[index] ?? []) {
    if (all[key]) stepErrors[key] = all[key]
  }
  errors.value = stepErrors
  return Object.keys(stepErrors).length === 0
}

const goNext = () => {
  if (!validateStep(currentStep.value)) return
  if (currentStep.value < lastStep) {
    currentStep.value += 1
    scrollToTop()
  }
}

const goBack = () => {
  if (currentStep.value === 0) return
  errors.value = {}
  currentStep.value -= 1
  scrollToTop()
}

const buildPayload = () => {
  const body = new FormData()

  // Entidade
  body.append("entityName", textValue(formData.value.entidade))
  body.append("nif", textValue(formData.value.nif).replace(/\s/g, ""))
  body.append("email", textValue(formData.value.email))

  // Produto
  body.append("product", textValue(formData.value.produto))
  body.append("reference", textValue(formData.value.referencia))
  body.append("characteristics", textValue(formData.value.caracteristica))

  // Conformidade e ensaios
  body.append("technicalStandard", textValue(formData.value.norma))
  body.append("laboratory", textValue(formData.value.laboratorio))
  body.append("selfDeclaration", files.value.autodeclaracao as File)
  for (const file of files.value.certificacoes)
    body.append("certifications", file)
  body.append("testReport1", files.value.relatorio1 as File)
  body.append("testReport2", files.value.relatorio2 as File)
  body.append("testReport3", files.value.relatorio3 as File)

  // Fabricante
  const isManufacturer = formData.value.fabricante === "sim"
  body.append("isManufacturer", String(isManufacturer))
  if (!isManufacturer) {
    body.append("manufacturerName", textValue(formData.value.fabNome))
    body.append(
      "manufacturerNif",
      textValue(formData.value.fabNif).replace(/\s/g, ""),
    )
    body.append("manufacturerLicense", textValue(formData.value.fabAlvara))
    body.append("manufacturerPhone", textValue(formData.value.fabContacto))
    body.append("manufacturerEmail", textValue(formData.value.fabEmail))
  }

  return body
}

const handleSubmit = async () => {
  submitError.value = ""

  // Enter num passo intermédio avança em vez de submeter
  if (currentStep.value < lastStep) {
    goNext()
    return
  }

  // Último passo: valida tudo e, se houver erro noutro passo, volta a esse passo
  const all = computeErrors()
  errors.value = all
  const firstBadStep = stepFields.findIndex((fields) =>
    fields.some((key) => all[key]),
  )
  if (firstBadStep !== -1) {
    currentStep.value = firstBadStep
    errors.value = Object.fromEntries(
      stepFields[firstBadStep]!.filter((key) => all[key]).map((key) => [
        key,
        all[key],
      ]),
    )
    scrollToTop()
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{
      referenceNumber?: string
      process?: { referenceNumber?: string }
    }>("/api/processes/importacao/verificacao", {
      method: "POST",
      body: buildPayload(),
    })

    processRef.value =
      response.referenceNumber ?? response.process?.referenceNumber ?? ""
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
    <div
      class="modal__panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="candidaturaTitle"
    >
      <div class="modal__head">
        <div>
          <span class="eyebrow">Verificação</span>
          <h3 id="candidaturaTitle">Candidatar-me</h3>
        </div>
        <button
          class="modal__close"
          type="button"
          aria-label="Fechar"
          @click="handleClose"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>

      <div ref="bodyRef" class="modal__body">
        <form v-if="!formSubmitted" novalidate @submit.prevent="handleSubmit">
          <!-- Indicador de passos -->
          <ol class="stepper" aria-label="Progresso do pedido">
            <li
              v-for="(step, index) in steps"
              :key="step.key"
              :class="{
                active: index === currentStep,
                done: index < currentStep,
              }"
              :aria-current="index === currentStep ? 'step' : undefined"
            >
              <span class="dot">
                <svg
                  v-if="index < currentStep"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <template v-else>{{ index + 1 }}</template>
              </span>
              <span class="label">{{ step.label }}</span>
            </li>
          </ol>

          <!-- Passo 1 · Entidade requerente -->
          <div v-show="currentStep === 0" class="step">
            <h4 class="section-title">{{ steps[0]!.title }}</h4>
            <p class="form-lead">
              Os dados preenchidos serão usados na emissão do certificado final.
              Reveja com atenção antes de submeter.
            </p>
            <div class="field">
              <label for="v-entidade"
                >Entidade <span class="req">*</span></label
              >
              <input
                id="v-entidade"
                v-model="formData.entidade"
                type="text"
                name="entidade"
                autocomplete="organization"
                placeholder="Ex.: Empresa Angolana, Lda."
                :class="{ error: errors.entidade }"
              />
              <span v-if="errors.entidade" class="error-text">{{
                errors.entidade
              }}</span>
            </div>
            <div class="field-row">
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
                <span v-if="errors.nif" class="error-text">{{
                  errors.nif
                }}</span>
              </div>
              <div class="field">
                <label for="v-email">E-mail <span class="req">*</span></label>
                <input
                  id="v-email"
                  v-model="formData.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="Ex.: qualidade@empresa.co.ao"
                  :class="{ error: errors.email }"
                />
                <span v-if="errors.email" class="error-text">{{
                  errors.email
                }}</span>
              </div>
            </div>
          </div>

          <!-- Passo 2 · Produto -->
          <div v-show="currentStep === 1" class="step">
            <h4 class="section-title">{{ steps[1]!.title }}</h4>
            <div class="field-row">
              <div class="field">
                <label for="v-produto"
                  >Produto <span class="req">*</span></label
                >
                <input
                  id="v-produto"
                  v-model="formData.produto"
                  type="text"
                  name="produto"
                  placeholder="Ex.: Capacete de segurança industrial"
                  :class="{ error: errors.produto }"
                />
                <span v-if="errors.produto" class="error-text">{{
                  errors.produto
                }}</span>
              </div>
              <div class="field">
                <label for="v-referencia"
                  >Referência <span class="req">*</span></label
                >
                <input
                  id="v-referencia"
                  v-model="formData.referencia"
                  type="text"
                  name="referencia"
                  placeholder="Ex.: REF-2026-014"
                  :class="{ error: errors.referencia }"
                />
                <span v-if="errors.referencia" class="error-text">{{
                  errors.referencia
                }}</span>
              </div>
            </div>
            <div class="field">
              <label for="v-caracteristica"
                >Característica <span class="req">*</span></label
              >
              <textarea
                id="v-caracteristica"
                v-model="formData.caracteristica"
                name="caracteristica"
                rows="4"
                placeholder="Descreva o material, as dimensões, a aplicação e o uso previsto do produto"
                :class="{ error: errors.caracteristica }"
              ></textarea>
              <span v-if="errors.caracteristica" class="error-text">{{
                errors.caracteristica
              }}</span>
            </div>
          </div>

          <!-- Passo 3 · Conformidade e ensaios -->
          <div v-show="currentStep === 2" class="step">
            <h4 class="section-title">{{ steps[2]!.title }}</h4>
            <div class="field-row">
              <div class="field">
                <label for="v-norma"
                  >Norma técnica <span class="req">*</span></label
                >
                <input
                  id="v-norma"
                  v-model="formData.norma"
                  type="text"
                  name="norma"
                  placeholder="Ex.: NA ISO/IEC 17025"
                  :class="{ error: errors.norma }"
                />
                <span v-if="errors.norma" class="error-text">{{
                  errors.norma
                }}</span>
              </div>
              <div class="field">
                <label for="v-laboratorio"
                  >Laboratório <span class="req">*</span></label
                >
                <input
                  id="v-laboratorio"
                  v-model="formData.laboratorio"
                  type="text"
                  name="laboratorio"
                  placeholder="Ex.: Laboratório de Ensaios Acreditado"
                  :class="{ error: errors.laboratorio }"
                />
                <span v-if="errors.laboratorio" class="error-text">{{
                  errors.laboratorio
                }}</span>
              </div>
            </div>

            <div class="field">
              <label for="v-autodeclaracao"
                >Autodeclaração de conformidade <small>(PDF ou imagem)</small>
                <span class="req">*</span></label
              >
              <div
                class="file-input-wrapper"
                :class="{ 'has-error': errors.autodeclaracao }"
              >
                <input
                  id="v-autodeclaracao"
                  type="file"
                  name="autodeclaracao"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
                  @change="onSingleFile('autodeclaracao', $event)"
                />
                <span class="file-label">{{
                  files.autodeclaracao
                    ? files.autodeclaracao.name
                    : "Selecionar ficheiro"
                }}</span>
              </div>
              <span class="file-hint">Máximo 2 MB</span>
              <span v-if="errors.autodeclaracao" class="error-message">{{
                errors.autodeclaracao
              }}</span>
            </div>

            <div class="field">
              <label for="v-certificacoes">
                Outras certificações e licenças
                <small>(PDF ou imagem · vários ficheiros)</small>
                <span class="req">*</span>
              </label>
              <div
                class="file-input-wrapper"
                :class="{ 'has-error': errors.certificacoes }"
              >
                <input
                  id="v-certificacoes"
                  type="file"
                  name="certificacoes"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
                  @change="onMultipleFiles"
                />
                <span class="file-label">{{
                  files.certificacoes.length === 0
                    ? "Selecionar ficheiros"
                    : files.certificacoes.length === 1
                      ? files.certificacoes[0]!.name
                      : `${files.certificacoes.length} ficheiros selecionados`
                }}</span>
              </div>
              <span class="file-hint">Máximo 2 MB por ficheiro</span>
              <span v-if="errors.certificacoes" class="error-message">{{
                errors.certificacoes
              }}</span>
            </div>

            <p class="hint">
              Anexe os três últimos relatórios de ensaio do produto (PDF).
            </p>

            <div class="field">
              <label for="v-relatorio1"
                >Relatório de ensaio 1 <small>(o mais recente · PDF)</small>
                <span class="req">*</span></label
              >
              <div
                class="file-input-wrapper"
                :class="{ 'has-error': errors.relatorio1 }"
              >
                <input
                  id="v-relatorio1"
                  type="file"
                  name="relatorio1"
                  accept=".pdf,application/pdf"
                  @change="onSingleFile('relatorio1', $event)"
                />
                <span class="file-label">{{
                  files.relatorio1
                    ? files.relatorio1.name
                    : "Selecionar ficheiro"
                }}</span>
              </div>
              <span class="file-hint">Máximo 2 MB</span>
              <span v-if="errors.relatorio1" class="error-message">{{
                errors.relatorio1
              }}</span>
            </div>

            <div class="field">
              <label for="v-relatorio2"
                >Relatório de ensaio 2 <small>(PDF)</small>
                <span class="req">*</span></label
              >
              <div
                class="file-input-wrapper"
                :class="{ 'has-error': errors.relatorio2 }"
              >
                <input
                  id="v-relatorio2"
                  type="file"
                  name="relatorio2"
                  accept=".pdf,application/pdf"
                  @change="onSingleFile('relatorio2', $event)"
                />
                <span class="file-label">{{
                  files.relatorio2
                    ? files.relatorio2.name
                    : "Selecionar ficheiro"
                }}</span>
              </div>
              <span class="file-hint">Máximo 2 MB</span>
              <span v-if="errors.relatorio2" class="error-message">{{
                errors.relatorio2
              }}</span>
            </div>

            <div class="field">
              <label for="v-relatorio3"
                >Relatório de ensaio 3 <small>(PDF)</small>
                <span class="req">*</span></label
              >
              <div
                class="file-input-wrapper"
                :class="{ 'has-error': errors.relatorio3 }"
              >
                <input
                  id="v-relatorio3"
                  type="file"
                  name="relatorio3"
                  accept=".pdf,application/pdf"
                  @change="onSingleFile('relatorio3', $event)"
                />
                <span class="file-label">{{
                  files.relatorio3
                    ? files.relatorio3.name
                    : "Selecionar ficheiro"
                }}</span>
              </div>
              <span class="file-hint">Máximo 2 MB</span>
              <span v-if="errors.relatorio3" class="error-message">{{
                errors.relatorio3
              }}</span>
            </div>
          </div>

          <!-- Passo 4 · Fabricante -->
          <div v-show="currentStep === 3" class="step">
            <h4 class="section-title">{{ steps[3]!.title }}</h4>
            <div
              class="choice"
              role="radiogroup"
              aria-label="É o fabricante do produto?"
            >
              <label :class="{ selected: formData.fabricante === 'sim' }">
                <input
                  v-model="formData.fabricante"
                  type="radio"
                  name="fabricante"
                  value="sim"
                />
                <span>
                  Sou o fabricante
                  <small
                    >Os dados da entidade serão usados no certificado.</small
                  >
                </span>
              </label>
              <label :class="{ selected: formData.fabricante === 'nao' }">
                <input
                  v-model="formData.fabricante"
                  type="radio"
                  name="fabricante"
                  value="nao"
                />
                <span>
                  Não sou o fabricante
                  <small>Será necessário indicar os dados do fabricante.</small>
                </span>
              </label>
            </div>
            <span v-if="errors.fabricante" class="error-text choice-error">{{
              errors.fabricante
            }}</span>

            <div v-if="formData.fabricante === 'nao'" class="fabricante-box">
              <div class="field">
                <label for="v-fab-nome"
                  >Nome do fabricante <span class="req">*</span></label
                >
                <input
                  id="v-fab-nome"
                  v-model="formData.fabNome"
                  type="text"
                  name="fabNome"
                  autocomplete="off"
                  placeholder="Ex.: Fabricante Internacional, S.A."
                  :class="{ error: errors.fabNome }"
                />
                <span v-if="errors.fabNome" class="error-text">{{
                  errors.fabNome
                }}</span>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="v-fab-nif"
                    >NIF do fabricante <small>(opcional)</small></label
                  >
                  <input
                    id="v-fab-nif"
                    v-model="formData.fabNif"
                    type="text"
                    inputmode="numeric"
                    name="fabNif"
                    placeholder="Ex.: 5000000000"
                    :class="{ error: errors.fabNif }"
                  />
                  <span v-if="errors.fabNif" class="error-text">{{
                    errors.fabNif
                  }}</span>
                </div>
                <div class="field">
                  <label for="v-fab-alvara"
                    >Alvará <small>(opcional)</small></label
                  >
                  <input
                    id="v-fab-alvara"
                    v-model="formData.fabAlvara"
                    type="text"
                    name="fabAlvara"
                    placeholder="Ex.: Alvará n.º 123/2025"
                  />
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="v-fab-contacto"
                    >Contacto <span class="req">*</span></label
                  >
                  <input
                    id="v-fab-contacto"
                    v-model="formData.fabContacto"
                    type="tel"
                    inputmode="tel"
                    name="fabContacto"
                    placeholder="Ex.: +244 923 000 000"
                    :class="{ error: errors.fabContacto }"
                  />
                  <span v-if="errors.fabContacto" class="error-text">{{
                    errors.fabContacto
                  }}</span>
                </div>
                <div class="field">
                  <label for="v-fab-email"
                    >E-mail do fabricante <span class="req">*</span></label
                  >
                  <input
                    id="v-fab-email"
                    v-model="formData.fabEmail"
                    type="email"
                    name="fabEmail"
                    placeholder="Ex.: contacto@fabricante.com"
                    :class="{ error: errors.fabEmail }"
                  />
                  <span v-if="errors.fabEmail" class="error-text">{{
                    errors.fabEmail
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <p v-if="submitError" class="error-text">{{ submitError }}</p>

          <div class="modal__foot">
            <button
              v-if="currentStep === 0"
              type="button"
              class="btn btn--ghost"
              @click="handleClose"
            >
              Cancelar
            </button>
            <button
              v-else
              type="button"
              class="btn btn--ghost"
              :disabled="isSubmitting"
              @click="goBack"
            >
              Voltar
            </button>

            <button
              v-if="currentStep < lastStep"
              type="button"
              class="btn btn--primary"
              @click="goNext"
            >
              Seguinte
            </button>
            <button
              v-else
              type="submit"
              class="btn btn--primary"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "A submeter..." : "Submeter candidatura" }}
            </button>
          </div>
        </form>

        <div v-else class="modal-success show">
          <div class="ok">
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
          </div>
          <h3>Candidatura submetida</h3>
          <p>
            A candidatura à Verificação foi registada. Receberá um e-mail com o
            estado Submetida e o pedido segue para o responsável do
            departamento.
          </p>
          <div v-if="processRef" class="order-ref">{{ processRef }}</div>
          <div class="modal__foot" style="justify-content: center">
            <button type="button" class="btn btn--primary" @click="handleClose">
              Concluir
            </button>
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

/* ---------- Indicador de passos ---------- */
.stepper {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}

.stepper li {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #5d6b63;
  text-align: center;
}

.stepper li:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 14px;
  left: calc(50% + 18px);
  right: calc(-50% + 18px);
  height: 2px;
  background: #d9e0da;
}

.stepper li.done:not(:last-child)::after {
  background: #5cb947;
}

.stepper .dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #d9e0da;
  background: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.2s;
}

.stepper .dot svg {
  width: 14px;
  height: 14px;
}

.stepper li.active {
  color: #0a3a63;
}

.stepper li.active .dot {
  border-color: #2ba9e0;
  color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.15);
}

.stepper li.done .dot {
  border-color: #5cb947;
  background: #5cb947;
  color: #fff;
}

@media (max-width: 520px) {
  .stepper .label {
    display: none;
  }

  .stepper li.active .label {
    display: block;
  }
}

/* ---------- Conteúdo ---------- */
.form-lead {
  margin: 0 0 1.25rem;
  font-size: 0.9rem;
  color: #5d6b63;
}

.section-title {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.65rem;
}

.field label small {
  font-weight: 400;
  color: #5d6b63;
}

.field input.error,
.field textarea.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field textarea {
  display: block;
  width: 100%;
  min-height: 96px;
  padding: 0.7rem 0.85rem;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid #d9e0da;
  border-radius: 8px;
  resize: vertical;
}

.field textarea:focus {
  outline: 2px solid #2ba9e0;
  outline-offset: 1px;
}

.file-hint {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: #5b7c99;
}

.file-input-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
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
  text-align: center;
  word-break: break-all;
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

.hint {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: #5d6b63;
}

.choice {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.choice label {
  flex: 1 1 220px;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid #d9e0da;
  border-radius: 10px;
  transition: border-color 0.15s, background 0.15s;
}

.choice label.selected {
  border-color: #5cb947;
  background: rgba(92, 185, 71, 0.08);
}

.choice input {
  margin-top: 0.2rem;
  accent-color: #5cb947;
}

.choice small {
  display: block;
  margin-top: 0.15rem;
  font-weight: 400;
  color: #5d6b63;
}

.choice-error {
  margin-bottom: 0.75rem;
}

.fabricante-box {
  margin-top: 1rem;
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
