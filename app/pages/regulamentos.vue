<script setup lang="ts">
import { inject, watch, ref, computed } from 'vue'
import gql from '@/gql/regulamentos/index.gql'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Regulamentos Técnicos',
})

// Fetch data
const { query } = useSquidex()
const data = await query(gql, { key: 'regulamentos' })

// Extract regulations from the data
const regulations = computed(() => {
  const raw = data.value?.data?.queryRegulamentosContents?.[0]?.data?.regulations
  if (!raw) {
    // Mock data for testing
    return [
      {
        code: "RT-001",
        name: "Regulamento Técnico de Segurança para Equipamentos Eletrônicos",
        productCategory: "Eletrônicos",
        description: "Define requisitos de segurança para equipamentos eletrônicos, incluindo proteção contra choques elétricos e sobrecarga térmica.",
        publicationDate: "2023-05-15",
        version: "1.2",
        pdfUrl: "#"
      },
      {
        code: "RT-002",
        name: "Regulamento Técnico para Materiais de Construção Civil",
        productCategory: "Construção",
        description: "Especifica requisitos para materiais de construção civil, garantindo durabilidade e conformidade com normas internacionais.",
        publicationDate: "2023-08-22",
        version: "1.0",
        pdfUrl: "#"
      },
      {
        code: "RT-003",
        name: "Regulamento Técnico de Qualidade para Alimentos Processados",
        productCategory: "Alimentos",
        description: "Requisitos de qualidade e segurança para alimentos processados, incluindo análise microbiológica e rotulagem nutricional.",
        publicationDate: "2024-01-10",
        version: "2.0",
        pdfUrl: "#"
      },
      {
        code: "RT-004",
        name: "Regulamento Técnico para Veículos Automóveis",
        productCategory: "Automóveis",
        description: "Normas de segurança e emissão de poluentes para veículos automóveis.",
        publicationDate: "2024-03-05",
        version: "1.1",
        pdfUrl: "#"
      },
      {
        code: "RT-005",
        name: "Regulamento Técnico de Segurança para Brinquedos",
        productCategory: "Crianças",
        description: "Requisitos de segurança para brinquedos, evitando riscos de asfixia e materiais tóxicos.",
        publicationDate: "2024-04-18",
        version: "1.0",
        pdfUrl: "#"
      }
    ]
  }
  return raw
})

// Inject active sub-item from layout
const activeSubItemId = inject('activeSubItemId')

// Track if sub-item is selected
const isSubItemSelected = ref(false)

// Sync with layout
if (activeSubItemId) {
  watch(activeSubItemId, (newId) => {
    isSubItemSelected.value = !!newId
  }, { immediate: true })
}

// Search and filter
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 3

// Extract all unique product categories
const categories = computed(() => {
  const cats = new Set()
  regulations.value.forEach(r => cats.add(r.productCategory))
  return ["Todas", ...Array.from(cats)]
})

// Filtered regulations
const filteredRegulations = computed(() => {
  let result = regulations.value
  if (selectedCategory.value && selectedCategory.value !== "Todas") {
    result = result.filter(r => r.productCategory === selectedCategory.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.code.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    )
  }
  return result
})

// Paginated regulations
const paginatedRegulations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRegulations.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => Math.ceil(filteredRegulations.value.length / itemsPerPage))

// Reset page when filter or search changes
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Format date
const formatDate = (dateStr) => {
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
            “Os regulamentos técnicos são essenciais para garantir a segurança, a
            saúde e a proteção do meio ambiente, alinhando as práticas nacionais com
            as melhores práticas internacionais.”
          </p>
        </div>
      </div>

      <div class="quality-policy-section mb-10">
        <h4>Política de Regulamentos Técnicos</h4>
        <p>
          O INIQ compromete-se a definir e gerir os requisitos obrigatórios
          aplicáveis a produtos, processos e serviços, em articulação com as
          entidades sectoriais, garantindo a conformidade com as normas
          internacionais e a proteção do mercado nacional.
        </p>
      </div>
    </template>

    <!-- Sub-item content - only show when "Solicitar Serviço" is selected -->
    <template v-if="isSubItemSelected">
      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Informações Gerais</span>
            <h2>Regulamentos Técnicos</h2>
            <p>
              Definição e gestão dos requisitos obrigatórios aplicáveis a produtos,
              processos e serviços, em articulação com as entidades sectoriais.
            </p>
          </div>

          <!-- Search and Filter -->
          <div class="search-filter-section">
            <div class="search-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input v-model="searchQuery" type="text" placeholder="Pesquise por código, nome ou descrição" />
            </div>
            <div class="filter-select-wrapper">
              <select v-model="selectedCategory" id="category-filter">
                 <option value="" disabled selected>Selecione uma categoria</option>
                <option  v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>

          <!-- Regulations List -->
          <div class="regulations-list">
            <article v-for="reg in paginatedRegulations" :key="reg.code" class="regulation-card">
              <div class="regulation-header">
                <div class="regulation-code">{{ reg.code }}</div>
                <div class="regulation-meta">
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {{ formatDate(reg.publicationDate) }}
                  </span>
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <path d="M14 3v5h5"></path>
                      <path d="M7 3h8l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"></path>
                    </svg>
                    Versão {{ reg.version }}
                  </span>
                </div>
              </div>
              <div class="regulation-category">
                <span class="category-tag">{{ reg.productCategory }}</span>
              </div>
              <h3 class="regulation-title">{{ reg.name }}</h3>
              <p class="regulation-description">{{ reg.description }}</p>
              <div class="regulation-actions">
                <a :href="reg.pdfUrl" class="download-btn" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descarregar PDF
                </a>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button :disabled="currentPage === 1" @click="currentPage--" class="pagination-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Anterior
            </button>
            <div class="pagination-pages">
              <span v-for="page in totalPages" :key="page" class="page-number" :class="{ active: currentPage === page }" @click="currentPage = page">{{ page }}</span>
            </div>
            <button :disabled="currentPage === totalPages" @click="currentPage++" class="pagination-btn">
              Próximo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
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

.search-filter-section {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-wrapper svg {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: #94a3b8;
}

.search-input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.search-input-wrapper input:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.1);
}

.filter-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-select-wrapper label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a3a63;
}

.filter-select-wrapper select {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  background: white;
}

.filter-select-wrapper select:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.1);
}

.regulations-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.regulation-card {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.2s;
}

.regulation-card:hover {
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
  transform: translateY(-2px);
}

.regulation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.regulation-code {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 700;
  font-family: monospace;
}

.regulation-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #64748b;
  font-size: 0.9rem;
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

.regulation-category {
  margin-bottom: 0.5rem;
}

.category-tag {
  display: inline-block;
  background: rgba(43, 169, 224, 0.1);
  color: #0a3a63;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.regulation-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.2rem;
  color: #0a3a63;
  font-weight: 700;
}

.regulation-description {
  margin: 0 0 1rem 0;
  color: #475569;
  line-height: 1.6;
}

.regulation-actions {
  display: flex;
  justify-content: flex-end;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  font-weight: 600;
  transition: all 0.2s;
}

.download-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(92, 185, 71, 0.2);
}

.download-btn svg {
  width: 18px;
  height: 18px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #2ba9e0;
  color: #2ba9e0;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.page-number:hover {
  background: rgba(43, 169, 224, 0.1);
}

.page-number.active {
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
}

@media (max-width: 1199px) {
  .dg-top {
    grid-template-columns: 1fr;
  }

  .search-filter-section {
    grid-template-columns: 1fr;
  }
}
</style>
