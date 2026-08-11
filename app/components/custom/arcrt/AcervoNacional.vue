<script setup>
import { ref, computed } from "vue"
import { useCategoryGroups } from "@/composables/useCategoryGroups"

const props = defineProps({
  regulamentos: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["open-modal"])

const { groups, selectedCategory, itemsInCategory, selectCategory, backToCategories } =
  useCategoryGroups(() => props.regulamentos, "areaTecnica")

const searchTerm = ref("")
const estado = ref("")

const filteredRegulamentos = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return itemsInCategory.value.filter((r) => {
    const matchesSearch = !term || r.title.toLowerCase().includes(term)
    const matchesEstado = !estado.value || r.estado === estado.value
    return matchesSearch && matchesEstado
  })
})

const resetFilters = () => {
  searchTerm.value = ""
  estado.value = ""
}

const formatPrice = (price) => {
  return (price ?? 0).toLocaleString("pt-PT")
}
</script>

<template>
  <div class="sub-panel">
    <template v-if="!selectedCategory">
      <div class="panel-head">
        <span class="eyebrow">Acervo Nacional Regulamentar</span>
        <h2>Catálogo de Regulamentos Técnicos</h2>
        <p>
          Pesquise os Regulamentos Técnicos disponíveis e solicite a sua aquisição. Ao clicar em
          <b>Comprar</b>, é gerado um RUPE para pagamento. Após a confirmação, o documento fica
          disponível no dashboard em “Os Meus Regulamentos”.
        </p>
      </div>
      <UiCategoryTiles :groups="groups" item-label="regulamentos" @select="selectCategory" />
    </template>

    <template v-else>
      <button type="button" class="back-link" @click="backToCategories">
        ← Voltar às categorias
      </button>
      <div class="panel-head">
        <span class="eyebrow">{{ selectedCategory }}</span>
        <h2>Catálogo de Regulamentos Técnicos</h2>
      </div>

      <div class="catalog-toolbar">
        <div class="catalog-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Pesquisar por título…"
            aria-label="Pesquisar regulamentos"
          />
        </div>
        <div class="catalog-filter">
          <select v-model="estado" aria-label="Filtrar por estado">
            <option value="">Todos os estados</option>
            <option value="em vigor">Em vigor</option>
            <option value="revogado">Revogado</option>
          </select>
          <button
            v-if="searchTerm || estado"
            class="chip"
            type="button"
            @click="resetFilters"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      <p v-if="!filteredRegulamentos.length" class="empty-state">
        Nenhum regulamento encontrado com os filtros seleccionados.
      </p>

      <div class="catalog">
        <div class="catalog-item" v-for="regulamento in filteredRegulamentos" :key="regulamento.code">
          <div class="catalog-item-top">
            <div class="catalog-item-code">{{ regulamento.code }}</div>
            <span class="badge badge--sector badge--green">{{ regulamento.areaTecnica }}</span>
            <span
              class="badge badge--estado"
              :class="{ revogado: regulamento.estado === 'revogado' }"
            >
              {{ regulamento.estado === "revogado" ? "Revogado" : "Em vigor" }}
            </span>
            <div class="catalog-item-price">
              <span class="price-value">{{ formatPrice(regulamento.price) }}</span>
              <span class="price-currency">AOA</span>
            </div>
            <button class="btn btn--primary" @click="emit('open-modal', 'purchase', regulamento)">
              Comprar
            </button>
          </div>
          <h3 class="catalog-item-title">{{ regulamento.title }}</h3>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.sub-panel {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: underline;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.back-link:hover {
  color: #5cb947;
}

.panel-head {
  margin-bottom: 1.5rem;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
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
  text-align: justify;
}

.catalog-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
}

.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  position: static;
}

.catalog-search svg {
  width: 20px;
  height: 20px;
  color: #64748b;
  flex-shrink: 0;
  position: static;
  top: auto;
  left: auto;
  transform: none;
}

.catalog-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
  min-width: 0;
  flex: 1;
  padding: 0;
  box-sizing: border-box;
}

.catalog-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.catalog-filter select {
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;
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

.empty-state {
  color: #64748b;
  font-size: 0.95rem;
  padding: 1.5rem 0;
}

.catalog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.catalog-item {
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s;
}

.catalog-item:hover {
  border-color: #2ba9e0;
}

.catalog-item-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.catalog-item-code {
  font-family: monospace;
  font-weight: 500;
  color: #64748b;
  font-size: 0.9rem;
}

.badge--sector {
  font-family: monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.badge--green {
  background: #eaf7e5;
  color: #5cb947;
}

.badge--estado {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
}

.badge--estado.revogado {
  background: #fef2f2;
  color: #dc2626;
}

.catalog-item-price {
  margin-left: auto;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-value {
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.25rem;
}

.price-currency {
  font-size: 0.85rem;
  color: #64748b;
}

.catalog-item-title {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
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
}

.btn--primary:hover {
  background: #082e4f;
}

@media (max-width: 1199px) {
  .sub-panel {
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
  }

  .catalog-toolbar {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .catalog-search {
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }

  .catalog-filter {
    flex-wrap: wrap;
    width: 100%;
  }

  .catalog-filter select {
    flex: 1 1 auto;
  }

  .catalog-item-price {
    margin-left: 0;
    width: 100%;
  }

  .catalog-item-top .btn--primary {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .catalog-item {
    padding: 1rem;
  }

  .catalog-item-title {
    font-size: 1rem;
  }
}

@media (min-width: 1200px) {
  .catalog-search {
    flex: 1;
    min-width: 250px;
  }
}
</style>
