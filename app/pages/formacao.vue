<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const activeTab = ref('catalogo')
const modalOpen = ref(false)
const modalMode = ref('detalhe')
const formSubmitted = ref(false)
const selectedCourse = ref<any>(null)

const courses = ref([
  {
    id: 1,
    title: 'Gestão da Qualidade',
    category: 'Qualidade',
    level: 'Intermédio',
    duration: '24h',
    modality: 'Online',
    startDate: '15 Jul 2026',
    price: 75000,
    description: 'Curso completo sobre sistemas de gestão da qualidade e normas ISO 9001.',
    modules: [
      'Introdução à Qualidade',
      'Normas ISO 9001',
      'Auditorias Internas',
      'Melhoria Contínua'
    ],
    instructor: 'Dra. Maria Santos',
    instructorRole: 'Especialista em Qualidade',
    thumbnail: '/cover-qualidade.jpg'
  },
  {
    id: 2,
    title: 'Metrologia Aplicada',
    category: 'Metrologia',
    level: 'Básico',
    duration: '16h',
    modality: 'Presencial',
    startDate: '22 Jul 2026',
    price: 60000,
    description: 'Fundamentos de metrologia e práticas de calibração.',
    modules: [
      'Princípios de Medição',
      'Instrumentos de Medição',
      'Incerteza de Medição',
      'Calibração'
    ],
    instructor: 'Eng. António Bengui',
    instructorRole: 'Chefe do Departamento de Metrologia',
    thumbnail: '/cover-metrologia.jpg'
  },
  {
    id: 3,
    title: 'Normalização Técnica',
    category: 'Normalização',
    level: 'Intermédio',
    duration: '20h',
    modality: 'Online',
    startDate: '29 Jul 2026',
    price: 65000,
    description: 'Processo de desenvolvimento e aplicação de normas técnicas.',
    modules: [
      'Introdução à Normalização',
      'Estrutura das Normas',
      'Comissões Técnicas',
      'Implementação de Normas'
    ],
    instructor: 'Dra. Inês Cabral',
    instructorRole: 'Chefe do Departamento de Normalização',
    thumbnail: '/cover-normalizacao.jpg'
  },
  {
    id: 4,
    title: 'Segurança Alimentar',
    category: 'Segurança Alimentar',
    level: 'Avançado',
    duration: '32h',
    modality: 'Híbrido',
    startDate: '05 Ago 2026',
    price: 95000,
    description: 'Normas HACCP e segurança alimentar na indústria.',
    modules: [
      'Princípios HACCP',
      'Análise de Riscos',
      'Controlo de Pontos Críticos',
      'Documentação e Auditorias'
    ],
    instructor: 'Dra. Ana Paula',
    instructorRole: 'Especialista em Segurança Alimentar',
    thumbnail: '/cover-sede.jpg'
  }
])

const formData = ref({
  nome: '',
  entidade: '',
  email: '',
  telefone: '',
  nif: '',
  pagamento: 'Referência Multicaixa',
  observacoes: ''
})

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-PT')
}

const openModal = (course: any) => {
  selectedCourse.value = course
  modalMode.value = 'detalhe'
  formSubmitted.value = false
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedCourse.value = null
}

const handleSubmit = () => {
  const refNumber = Math.floor(10000 + Math.random() * 89999)
  selectedCourse.value.refNumber = `MATRÍCULA: INIQ-2026-${refNumber}`
  formSubmitted.value = true
}
</script>

<template>
  <div class="combined-card">
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
          “A formação é o pilar da qualidade. Capacitar os profissionais é garantir
          que os padrões são mantidos e a excelência é alcançada.”
        </p>
      </div>
    </div>

    <div class="quality-policy-section">
      <h4>Política de Formação</h4>
      <p>
        O INIQ compromete-se a oferecer formação de qualidade, alinhada com as
        normas internacionais e as necessidades do mercado angolano, promovendo a
        capacitação técnica e o desenvolvimento profissional contínuo.
      </p>
    </div>

    <section class="mt-12">
      <div class="container">
        <div class="panel-head" style="margin-bottom: 24px">
          <span class="eyebrow">Catálogo de Cursos</span>
          <h2>Escolha o seu curso</h2>
          <p>
            Os cursos são geridos pelo INIQ e actualizados regularmente. Clique num
            curso para ver o programa completo e inscrever-se.
          </p>
        </div>

        <div class="catalog-toolbar">
          <div class="catalog-search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar cursos…"
              aria-label="Pesquisar cursos"
            />
          </div>
          <div class="catalog-filter">
            <button class="chip is-active">Todas as áreas</button>
            <button class="chip">Qualidade</button>
            <button class="chip">Metrologia</button>
            <button class="chip">Normalização</button>
            <button class="chip">Segurança Alimentar</button>
          </div>
        </div>

        <div class="course-grid">
          <article
            class="course-card"
            v-for="course in courses"
            :key="course.id"
            @click="openModal(course)"
          >
            <div class="course-thumb">
              <img :src="course.thumbnail" :alt="course.title" />
              <div class="course-badges">
                <span class="course-category">{{ course.category }}</span>
                <span class="course-level">{{ course.level }}</span>
              </div>
            </div>
            <div class="course-body">
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-desc">{{ course.description }}</p>
              <div class="course-meta">
                <div class="meta-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                    <path d="M16 2v4M8 2v4M3 10h18"></path>
                  </svg>
                  <span>{{ course.duration }}</span>
                </div>
                <div class="meta-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  <span>{{ course.modality }}</span>
                </div>
              </div>
              <div class="course-footer">
                <div class="course-price">
                  <span class="price-value">{{ formatPrice(course.price) }}</span>
                  <span class="price-currency">AOA</span>
                </div>
                <button class="btn btn--green">Ver curso</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>

  <div v-if="modalOpen" class="modal" :class="{ open: modalOpen }" @click.self="closeModal">
    <div class="modal__scrim" @click="closeModal"></div>
    <div class="modal__panel modal__panel--wide" role="dialog" aria-modal="true" aria-labelledby="cdTitle">
      <button class="modal__close" @click="closeModal" aria-label="Fechar">
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

      <div v-if="modalMode === 'detalhe'" class="cd show" id="cdView">
        <div class="cd__hero">
          <img class="cd__hero-img" :src="selectedCourse?.thumbnail" :alt="selectedCourse?.title" />
        </div>
        <div class="cd__body">
          <h3 id="cdTitle">{{ selectedCourse?.title }}</h3>
          <p id="cdDesc">{{ selectedCourse?.description }}</p>

          <div class="cd__meta-grid">
            <div class="m">
              <div class="lab">Duração</div>
              <div class="val">{{ selectedCourse?.duration }}</div>
            </div>
            <div class="m">
              <div class="lab">Modalidade</div>
              <div class="val">{{ selectedCourse?.modality }}</div>
            </div>
            <div class="m">
              <div class="lab">Início</div>
              <div class="val">{{ selectedCourse?.startDate }}</div>
            </div>
            <div class="m">
              <div class="lab">Certificado</div>
              <div class="val">INIQ</div>
            </div>
          </div>

          <h4>Programa do curso</h4>
          <ul class="cd__modules">
            <li v-for="(module, idx) in selectedCourse?.modules" :key="idx">
              {{ module }}
            </li>
          </ul>

          <h4>O que está incluído</h4>
          <ul class="cd__includes">
            <li>
              <span class="chk">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              Certificado oficial do INIQ
            </li>
            <li>
              <span class="chk">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              Materiais e manual digital
            </li>
            <li>
              <span class="chk">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              Formadores especialistas
            </li>
            <li>
              <span class="chk">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              Avaliação e acompanhamento
            </li>
          </ul>

          <h4>Formador</h4>
          <div class="cd__instructor">
            <div class="av">{{ selectedCourse?.instructor.charAt(0) }}</div>
            <div>
              <b>{{ selectedCourse?.instructor }}</b>
              <span>{{ selectedCourse?.instructorRole }}</span>
            </div>
          </div>

          <div class="cd__cta">
            <div class="price">
              <span>{{ formatPrice(selectedCourse?.price || 0) }}</span>
              <small>AOA</small>
            </div>
            <button class="btn btn--green" @click="modalMode = 'inscricao'">
              Inscrever-se e pagar
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
        </div>
      </div>

      <div v-if="modalMode === 'inscricao'" class="modal__body" id="enrollView">
        <div class="modal__head" style="padding: 0 0 18px; position: static">
          <div>
            <span class="eyebrow">Inscrição</span>
            <h3 id="enrollTitle">Inscrição no curso</h3>
            <div class="ref">{{ selectedCourse?.title }}</div>
          </div>
        </div>
        <form @submit.prevent="handleSubmit" id="enrollForm" novalidate>
          <div class="field-row">
            <div class="field">
              <label for="e-nome">Nome completo <span class="req">*</span></label>
              <input
                type="text"
                id="e-nome"
                required
                placeholder="Nome do formando"
                v-model="formData.nome"
              />
            </div>
            <div class="field">
              <label for="e-entidade">Entidade / Empresa</label>
              <input
                type="text"
                id="e-entidade"
                placeholder="Opcional"
                v-model="formData.entidade"
              />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="e-email">E-mail <span class="req">*</span></label>
              <input
                type="email"
                id="e-email"
                required
                placeholder="nome@exemplo.ao"
                v-model="formData.email"
              />
            </div>
            <div class="field">
              <label for="e-tel">Telefone <span class="req">*</span></label>
              <input
                type="tel"
                id="e-tel"
                required
                placeholder="+244 9XX XXX XXX"
                v-model="formData.telefone"
              />
            </div>
          </div>
          <div class="field">
            <label for="e-nif">
              NIF / BI <span class="hint" style="display: inline; margin: 0">(para o recibo)</span>
            </label>
            <input
              type="text"
              id="e-nif"
              placeholder="Opcional"
              v-model="formData.nif"
            />
          </div>
          <div class="field">
            <label>Meio de pagamento <span class="req">*</span></label>
            <div class="pay-options">
              <label class="pay-opt" :class="{ sel: formData.pagamento === 'Referência Multicaixa' }">
                <input
                  type="radio"
                  name="epay"
                  value="Referência Multicaixa"
                  v-model="formData.pagamento"
                  checked
                />
                <span>
                  <b>Referência Multicaixa</b><span>Pague em ATM ou homebanking</span>
                </span>
              </label>
              <label class="pay-opt" :class="{ sel: formData.pagamento === 'Multicaixa Express' }">
                <input
                  type="radio"
                  name="epay"
                  value="Multicaixa Express"
                  v-model="formData.pagamento"
                />
                <span>
                  <b>Multicaixa Express</b><span>QR code ou link por SMS</span>
                </span>
              </label>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
              padding: 16px;
              background: #f8fafc;
              border: 1px solid #e6eff6;
              border-radius: 8px;
              margin-bottom: 18px;
              flex-wrap: wrap;
            "
          >
            <span style="font-size: 14px; color: #475569">Total a pagar</span>
            <span
              style="
                font-family: 'Archivo', system-ui, sans-serif;
                font-weight: 800;
                font-size: 22px;
                color: #0a3a63;
              "
            >
              {{ formatPrice(selectedCourse?.price || 0) }}
              <small
                style="
                  font-family: monospace;
                  font-size: 12px;
                  color: #64748b;
                  font-weight: 500;
                "
                >AOA</small
              >
            </span>
          </div>
          <div class="modal__foot">
            <button type="button" class="btn btn--ghost" @click="modalMode = 'detalhe'">
              Voltar
            </button>
            <button type="submit" class="btn btn--primary" id="enrollSubmit">
              Confirmar inscrição
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
        </form>
      </div>

      <div v-if="formSubmitted" class="modal__body" id="enrollSuccess">
        <div class="modal-success show" style="display: block">
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
          <h3>Inscrição registada com sucesso</h3>
          <p>
            Receberá por e-mail os dados de pagamento. Após a confirmação, terá
            acesso ao curso e ao material na sua área reservada.
          </p>
          <div class="order-ref">{{ selectedCourse?.refNumber }}</div>
          <div class="modal__foot" style="justify-content: center">
            <button type="button" class="btn btn--primary" @click="closeModal">
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
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

.fstats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.fstat {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.fstat .k {
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: #0a3a63;
  margin-bottom: 0.25rem;
}

.fstat .l {
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
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

.catalog-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex: 1;
  min-width: 250px;
}

.catalog-search svg {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.catalog-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}

.catalog-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  border: 1px solid #d0d9e3;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}

.chip:hover {
  border-color: #0a3a63;
}

.chip.is-active {
  background: #0a3a63;
  border-color: #0a3a63;
  color: white;
  font-weight: 600;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.course-card {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.course-card:hover {
  border-color: #2ba9e0;
  box-shadow: 0 4px 16px rgba(10, 58, 99, 0.12);
}

.course-thumb {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.course-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.course-category,
.course-level {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.course-category {
  background: rgba(43, 169, 224, 0.15);
  color: #2ba9e0;
}

.course-level {
  background: rgba(92, 185, 71, 0.15);
  color: #5cb947;
}

.course-body {
  padding: 1.5rem;
}

.course-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  color: #0a3a63;
  font-weight: 700;
}

.course-desc {
  margin: 0 0 1rem 0;
  color: #475569;
  line-height: 1.6;
}

.course-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
}

.meta-item svg {
  width: 18px;
  height: 18px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-value {
  font-family: 'Archivo', system-ui, sans-serif;
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.5rem;
}

.price-currency {
  font-size: 0.875rem;
  color: #64748b;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn--green {
  background: #5cb947;
  color: white;
}

.btn--green:hover {
  background: #4aa838;
}

.btn--ghost {
  background: white;
  color: #0a3a63;
  border: 1px solid #d0d9e3;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}

.btn--primary {
  background: #0a3a63;
  color: white;
}

.btn--primary:hover {
  background: #082e4f;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: none;
}

.modal.open {
  display: block;
}

.modal__scrim {
  position: absolute;
  inset: 0;
  background: rgba(16, 33, 48, 0.55);
  backdrop-filter: blur(3px);
}

.modal__panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 24px 56px -18px rgba(10, 58, 99, 0.3),
    0 8px 20px -10px rgba(16, 33, 48, 0.12);
}

.modal__panel.modal__panel--wide {
  width: min(900px, calc(100vw - 32px));
  overflow-y: auto;
}

.cd {
  width: 100%;
}

.modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.92);
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #64748b;
}

.modal__close:hover {
  border-color: #2ba9e0;
  color: #0a3a63;
}

.cd {
  display: none;
}

.cd.show {
  display: block;
}

.cd__hero {
  position: relative;
  height: 220px;
  width: 100%;
}

.cd__hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover !important;
  display: block;
}

.cd__badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.cd__cat,
.cd__level {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.95);
}

.cd__cat {
  color: #2ba9e0;
}

.cd__level {
  color: #5cb947;
}

.cd__body {
  padding: 2rem;
}

.cd__body h3 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-weight: 700;
}

.cd__body h4 {
  font-size: 1.1rem;
  margin: 1.5rem 0 0.75rem 0;
  color: #0a3a63;
  font-weight: 700;
}

.cd__meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.cd__meta-grid .m {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.cd__meta-grid .lab {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.cd__meta-grid .val {
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 600;
}

.cd__modules {
  margin: 0;
  padding-left: 1.5rem;
  color: #475569;
  line-height: 2;
}

.cd__includes {
  margin: 0;
  padding-left: 0;
  list-style: none;
  color: #475569;
}

.cd__includes li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.cd__includes .chk {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(92, 185, 71, 0.15);
  color: #5cb947;
  display: grid;
  place-items: center;
  flex: none;
}

.cd__instructor {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cd__instructor .av {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.cd__instructor b {
  display: block;
  color: #0a3a63;
  font-size: 1rem;
}

.cd__instructor span {
  display: block;
  color: #64748b;
  font-size: 0.9rem;
}

.cd__cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.cd__cta .price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.cd__cta .price span {
  font-family: 'Archivo', system-ui, sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: #0a3a63;
}

.cd__cta .price small {
  font-family: monospace;
  font-size: 1rem;
  color: #64748b;
}

.modal__body {
  padding: 2rem;
}

.modal__head {
  margin-bottom: 1.5rem;
}

.modal__head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
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

.modal__head h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-weight: 700;
}

.ref {
  font-family: monospace;
  font-size: 0.9rem;
  color: #64748b;
}

.field {
  margin-bottom: 1.125rem;
}

.field label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.4375rem;
  color: #475569;
}

.field label .req {
  color: #dc2626;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 1px solid #d0d9e3;
  border-radius: 6px;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 0.9375rem;
  color: #0f172a;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.15);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.pay-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.pay-opt {
  border: 1.5px solid #d0d9e3;
  border-radius: 6px;
  padding: 0.875rem;
  cursor: pointer;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  transition: 0.15s;
}

.pay-opt:hover {
  border-color: #2ba9e0;
}

.pay-opt input {
  width: auto;
  margin-top: 0.1875rem;
  accent-color: #0a3a63;
}

.pay-opt.sel {
  border-color: #0a3a63;
  background: #eff6fc;
}

.pay-opt b {
  font-size: 0.90625rem;
  font-family: 'Archivo', system-ui, sans-serif;
  display: block;
  color: #0a3a63;
}

.pay-opt span:last-child {
  font-size: 0.78125rem;
  color: #64748b;
  margin-top: 0.125rem;
  display: block;
}

.modal__foot {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.modal-success {
  text-align: center;
  padding: 1.25rem 0.625rem 0.375rem;
  display: none;
}

.modal-success .ok {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(52, 161, 63, 0.13);
  color: #34a13f;
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
}

.modal-success .ok svg {
  width: 36px;
  height: 36px;
}

.modal-success h3 {
  font-size: 1.5rem;
  margin-bottom: 0.625rem;
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
  font-size: 0.875rem;
  color: #0a3a63;
  background: #eff6fc;
  border: 1px dashed #d0d9e3;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  margin: 1.375rem 0;
}
</style>
