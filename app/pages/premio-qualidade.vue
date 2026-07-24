<script setup lang="ts">
import { inject, watch, ref, computed } from 'vue'
import gql from '@/gql/premio-qualidade/index.gql'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Prémio Nacional da Qualidade',
})

const { query } = useSquidex()
const data = await query(gql, { key: 'premio' })

const mockEditions = [
  {
    year: 2024,
    title: "20ª Edição - Prémio Nacional da Qualidade",
    description: "A 20ª edição do Prémio Nacional da Qualidade celebra 20 anos de reconhecimento da excelência nas organizações angolanas.",
    isOpen: true,
    deadline: "2024-11-30",
    requirements: [
      "Estar legalmente constituída em Angola há pelo menos 2 anos",
      "Possuir Balanço Social ou Relatório de Gestão dos últimos 2 exercícios",
      "Implementar um sistema de gestão da qualidade",
      "Não ter sanções significativas no último ano"
    ],
    dossierDescription: "Dossier de candidatura deve incluir: Relatório de autoavaliação, Balanços sociais, Certificados, Projetos de melhoria.",
    winners: []
  },
  {
    year: 2023,
    title: "19ª Edição - Prémio Nacional da Qualidade",
    description: "19ª edição do Prémio Nacional da Qualidade, com foco na excelência operacional.",
    isOpen: false,
    deadline: "2023-09-30",
    requirements: [],
    dossierDescription: "",
    winners: [
      { organization: "Indústrias Alimentares de Benguela", sector: "Alimentação", year: 2023 },
      { organization: "Clínicas Médicas de Luanda", sector: "Saúde", year: 2023 },
      { organization: "Tecnologias de Informação S.A.", sector: "Tecnologia", year: 2023 }
    ]
  },
  {
    year: 2022,
    title: "18ª Edição - Prémio Nacional da Qualidade",
    description: "18ª edição, com destaque para a sustentabilidade.",
    isOpen: false,
    deadline: "2022-10-15",
    requirements: [],
    dossierDescription: "",
    winners: [
      { organization: "Construções Civis do Sul", sector: "Construção", year: 2022 },
      { organization: "Energia Renovável Angola", sector: "Energia", year: 2022 }
    ]
  }
]

// Extract data
const editions = computed(() => {
  const raw = data.value?.data?.queryPremioEditionsContents?.[0]?.data?.editions
  return raw || mockEditions
})
const currentEdition = computed(() => editions.value.find(e => e.isOpen) || editions.value[0])
const pastEditions = computed(() => editions.value.filter(e => !e.isOpen).sort((a, b) => b.year - a.year))

const activeSubItemId = inject('activeSubItemId')

const isSubItemSelected = ref(false)

if (activeSubItemId) {
  watch(activeSubItemId, (newId: any) => {
    isSubItemSelected.value = !!newId
  }, { immediate: true })
}

const showForm = ref(false)
const showSuccess = ref(false)
const registrationNumber = ref('')
const form = ref({
  organizationName: '',
  nif: '',
  sector: '',
  email: '',
  phone: '',
  dossier: null as File | null
})
const errors = ref<Record<string, string>>({})
const submitted = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.dossier = target.files[0]
  }
}

const validate = () => {
  const newErrors: Record<string, string> = {}
  if (!form.value.organizationName.trim()) newErrors.organizationName = "Nome da organização é obrigatório"
  if (!form.value.nif.trim()) {
    newErrors.nif = "NIF é obrigatório"
  } else if (!/^\d{9}$/.test(form.value.nif.replace(/\D/g, ''))) {
    newErrors.nif = "NIF deve ter 9 dígitos"
  }
  if (!form.value.sector.trim()) newErrors.sector = "Setor de atividade é obrigatório"
  if (!form.value.email.trim()) {
    newErrors.email = "Email é obrigatório"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = "Email inválido"
  }
  if (!form.value.phone.trim()) newErrors.phone = "Telefone é obrigatório"
  if (!form.value.dossier) {
    newErrors.dossier = "Dossier de candidatura é obrigatório"
  }
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  submitted.value = true
  if (!validate()) return
  const num = Math.floor(100000 + Math.random() * 900000)
  registrationNumber.value = `PNQ-${currentEdition.value?.year}-${num}`
  showSuccess.value = true
}

const resetForm = () => {
  showForm.value = false
  showSuccess.value = false
  form.value = {
    organizationName: '',
    nif: '',
    sector: '',
    email: '',
    phone: '',
    dossier: null
  }
  errors.value = {}
  submitted.value = false
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="combined-card">
    <!-- Top info - only show when no sub-item is selected -->
    <template v-if="!isSubItemSelected">
      <div class="dg-top">
        <div class="dg-photo-wrapper">
          <img class="dg-photo" src="/director-geral.png" alt="Director-Geral" />
          <div class="dg-details">
            <h3>Carmo Adriana dos Santos</h3>
            <p class="role">Direcção-Geral</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Responsável</h4>
          <p>“O Prémio Nacional da Qualidade reconhece e celebra a excelência nas organizações angolanas, incentivando a adoção de boas práticas de gestão da qualidade.”</p>
        </div>
      </div>
      <div class="quality-policy-section mb-10">
        <h4>Política do Prémio Nacional da Qualidade</h4>
        <p>O INIQ compromete-se a promover a excelência nas organizações nacionais através do Prémio Nacional da Qualidade, reconhecendo as boas práticas de gestão da qualidade e incentivando a melhoria contínua.</p>
      </div>
    </template>

    <!-- Sub-item content - only show when "Solicitar Serviço" is selected -->
    <template v-if="isSubItemSelected">
      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Informações Gerais</span>
            <h2>Prémio Nacional da Qualidade</h2>
            <p>Reconhecimento da excelência e das boas práticas de gestão da qualidade nas organizações nacionais, segundo modelos de excelência reconhecidos.</p>
          </div>

          <!-- Description of the award -->
          <div class="description-section">
            <div class="description-card">
              <div class="description-card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="12" cy="9" r="6"></circle>
                  <path d="m9 14-1.5 7L12 18l4.5 3L15 14"></path>
                </svg>
                <h3>Sobre o Prémio</h3>
              </div>
              <p>O Prémio Nacional da Qualidade é o principal reconhecimento da excelência organizacional em Angola. Destina-se a organizações de todos os sectores que demonstrem elevados padrões de gestão da qualidade, inovação e compromisso com a melhoria contínua.</p>
            </div>
          </div>

          <!-- Current Edition -->
          <div v-if="currentEdition" class="edition-section">
            <div class="edition-card">
              <div class="edition-card-header">
                <div class="edition-year">{{ currentEdition.year }}</div>
                <div>
                  <h3>{{ currentEdition.title }}</h3>
                  <p v-if="currentEdition.isOpen" class="status-badge open">Inscrições Abertas</p>
                  <p v-else class="status-badge closed">Inscrições Encerradas</p>
                </div>
              </div>
              <div class="edition-description">{{ currentEdition.description }}</div>
              <div class="edition-info">
                <div v-if="currentEdition.deadline" class="info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div>
                    <strong>Prazo de Inscrições</strong>
                    <span>{{ formatDate(currentEdition.deadline) }}</span>
                  </div>
                </div>
              </div>

              <!-- Requirements -->
              <div v-if="currentEdition.requirements && currentEdition.requirements.length" class="requirements-section">
                <h4>Requisitos de Elegibilidade</h4>
                <ul class="requirements-list">
                  <li v-for="(req, index) in currentEdition.requirements" :key="index">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {{ req }}
                  </li>
                </ul>
              </div>

              <!-- Dossier Description -->
              <div v-if="currentEdition.dossierDescription" class="dossier-section">
                <h4>Documentação Requerida</h4>
                <p>{{ currentEdition.dossierDescription }}</p>
              </div>

              <!-- Enroll Button -->
              <div v-if="currentEdition.isOpen" class="enroll-section">
                <button v-if="!showForm && !showSuccess" @click="showForm = true" class="enroll-btn">Inscrever-se</button>
              </div>
            </div>

            <!-- Form -->
            <div v-if="showForm" class="form-section">
              <div class="form-card">
                <div class="form-header">
                  <h3>Formulário de Inscrição</h3>
                  <button @click="resetForm" class="close-form-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="organizationName">Nome da Empresa/Laboratório <span class="required">*</span></label>
                    <input
                      type="text"
                      id="organizationName"
                      placeholder="Ex.: Laboratório Central de Ensaios, Lda."
                      v-model="form.organizationName"
                      :class="{ error: errors.organizationName }"
                    />
                    <p v-if="errors.organizationName" class="error-text">{{ errors.organizationName }}</p>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="nif">NIF <span class="required">*</span></label>
                      <input
                        type="text"
                        id="nif"
                        placeholder="Ex.: 5417123456"
                        v-model="form.nif"
                        :class="{ error: errors.nif }"
                      />
                      <p v-if="errors.nif" class="error-text">{{ errors.nif }}</p>
                    </div>
                    <div class="form-group">
                      <label for="sector">Setor de Atividade <span class="required">*</span></label>
                      <input
                        type="text"
                        id="sector"
                        placeholder="Ex.: Metalomecânica, Alimentar, Construção…"
                        v-model="form.sector"
                        :class="{ error: errors.sector }"
                      />
                      <p v-if="errors.sector" class="error-text">{{ errors.sector }}</p>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="email">Email <span class="required">*</span></label>
                      <input
                        type="email"
                        id="email"
                        placeholder="nome@exemplo.ao"
                        v-model="form.email"
                        :class="{ error: errors.email }"
                      />
                      <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
                    </div>
                    <div class="form-group">
                      <label for="phone">Telefone <span class="required">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+244 9XX XXX XXX"
                        v-model="form.phone"
                        :class="{ error: errors.phone }"
                      />
                      <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="dossier">Upload do Dossier de Candidatura <span class="required">*</span></label>
                    <div class="file-upload-wrapper">
                      <input
                        ref="fileInput"
                        type="file"
                        id="dossier"
                        @change="handleFileChange"
                        hidden
                        accept=".pdf,.doc,.docx,.zip"
                      />
                      <button type="button" @click="fileInput?.click()" class="file-upload-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        {{ form.dossier ? form.dossier.name : 'Selecionar Ficheiro' }}
                      </button>
                      <p v-if="form.dossier" class="file-selected">Ficheiro selecionado: {{ form.dossier.name }} ({{ (form.dossier.size / 1024).toFixed(1) }} KB)</p>
                    </div>
                    <p v-if="errors.dossier" class="error-text">{{ errors.dossier }}</p>
                  </div>
                  <div class="form-actions">
                    <button type="button" @click="resetForm" class="btn cancel-btn">Cancelar</button>
                    <button type="submit" class="btn submit-btn">Submeter Inscrição</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="showSuccess" class="success-section">
              <div class="success-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h3>Inscrição Submetida com Sucesso!</h3>
                <p>O seu número de inscrição é:</p>
                <div class="registration-number">{{ registrationNumber }}</div>
                <p>Um email de confirmação foi enviado para {{ form.email }}</p>
                <button @click="resetForm" class="btn submit-btn">Nova Inscrição</button>
              </div>
            </div>
          </div>

          <!-- Past Winners -->
          <div v-if="pastEditions.length" class="past-winners-section">
            <h3 class="section-title">Histórico de Vencedores</h3>
            <div class="past-editions-grid">
              <div v-for="edition in pastEditions" :key="edition.year" class="past-edition-card">
                <div class="past-edition-header">
                  <div class="past-edition-year">{{ edition.year }}</div>
                  <div class="past-edition-title">{{ edition.title }}</div>
                </div>
                <div v-if="edition.winners && edition.winners.length" class="winners-list">
                  <div v-for="(winner, i) in edition.winners" :key="i" class="winner-item">
                    <div class="winner-organization">{{ winner.organization }}</div>
                    <div class="winner-sector">{{ winner.sector }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
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
    text-align: justify;
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
  font-weight: 500;
}
.quality-policy-section {
  padding: 1.5rem 2rem 0 2rem;
  border-top: 1px solid #e6eff6;
  text-align: justify;
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
.description-section {
  margin-bottom: 1.5rem;
}
.description-card {
  background: linear-gradient(135deg, rgba(92, 185, 71, 0.1), rgba(43, 169, 224, 0.1));
  border-radius: 12px;
  padding: 2rem;
}
.description-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.description-card-header svg {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  border-radius: 10px;
  color: white;
  padding: 12px;
}
.description-card-header h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}
.description-card p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
}
.edition-section {
  margin-bottom: 2rem;
}
.edition-card {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 2rem;
}
.edition-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.edition-year {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 700;
}
.edition-card-header h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.25rem;
}
.status-badge.open {
  background: rgba(92, 185, 71, 0.15);
  color: #388e3c;
}
.status-badge.closed {
  background: rgba(108, 117, 125, 0.15);
  color: #6c757d;
}
.edition-description {
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.edition-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.info-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.info-item svg {
  width: 24px;
  height: 24px;
  color: #2ba9e0;
  flex-shrink: 0;
}
.info-item div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info-item strong {
  color: #0a3a63;
  font-weight: 600;
}
.info-item span {
  color: #475569;
}
.requirements-section {
  margin-bottom: 1.5rem;
}
.requirements-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.15rem;
  color: #0a3a63;
  font-weight: 600;
}
.requirements-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
.requirements-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #475569;
}
.requirements-list li svg {
  width: 20px;
  height: 20px;
  color: #5cb947;
  flex-shrink: 0;
  margin-top: 2px;
}
.dossier-section {
  margin-bottom: 1.5rem;
}
.dossier-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  color: #0a3a63;
  font-weight: 600;
}
.dossier-section p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}
.enroll-section {
  margin-top: 1.5rem;
}
.enroll-btn {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.enroll-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 185, 71, 0.3);
}
.form-section {
  margin-top: 2rem;
}
.form-card {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 2rem;
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.form-header h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}
.close-form-btn {
  background: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}
.close-form-btn:hover {
  border-color: #2ba9e0;
  color: #2ba9e0;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  font-weight: 600;
  color: #0a3a63;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
.required {
  color: #ef4444;
}
.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: all 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.1);
}
.form-group input.error {
  border-color: #ef4444;
}
.error-text {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.file-upload-wrapper {
  margin-bottom: 0.5rem;
}
.file-upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: 2px dashed #2ba9e0;
  border-radius: 8px;
  background: rgba(43, 169, 224, 0.05);
  color: #2ba9e0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.file-upload-btn:hover {
  background: rgba(43, 169, 224, 0.1);
}
.file-upload-btn svg {
  width: 20px;
  height: 20px;
}
.file-selected {
  margin-top: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.cancel-btn {
  background: #f1f5f9;
  color: #0a3a63;
}
.cancel-btn:hover {
  background: #e2e8f0;
}
.submit-btn {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
}
.submit-btn:hover {
  filter: brightness(1.05);
}
.success-section {
  margin-top: 2rem;
}
.success-card {
  background: linear-gradient(135deg, rgba(92, 185, 71, 0.08), rgba(43, 169, 224, 0.08));
  border: 1px solid rgba(92, 185, 71, 0.3);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
}
.success-card svg {
  width: 72px;
  height: 72px;
  color: #5cb947;
  margin-bottom: 1rem;
}
.success-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #0a3a63;
}
.success-card p {
  margin: 0 0 0.75rem 0;
  color: #475569;
}
.registration-number {
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0a3a63;
  font-family: monospace;
  display: inline-block;
  margin: 0.5rem 0 1rem 0;
  box-shadow: 0 2px 8px rgba(10, 58, 99, 0.1);
}
.past-winners-section {
  margin-top: 2rem;
}
.section-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
}
.past-editions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}
.past-edition-card {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 1.5rem;
}
.past-edition-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eff6;
}
.past-edition-year {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-family: monospace;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 0.5rem;
}
.past-edition-title {
  color: #0a3a63;
  font-weight: 600;
  font-size: 0.95rem;
}
.winners-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.winner-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e6eff6;
}
.winner-organization {
  color: #0a3a63;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}
.winner-sector {
  color: #64748b;
  font-size: 0.85rem;
}
@media (max-width: 1199px) {
  .dg-top {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
