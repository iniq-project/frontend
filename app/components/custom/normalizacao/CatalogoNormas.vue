<script setup>
import { ref, watch } from "vue"
import { useNormaFilters } from "@/composables/useNormaFilters"
import { useCategoryGroups } from "@/composables/useCategoryGroups"

const props = defineProps({
  normas: {
    type: Array,
    default: () => [],
  },
  seedSearch: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Referência completa das normas do INIQ",
  },
  description: {
    type: String,
    default:
      "Consulte a listagem de referência de todas as normas, incluindo as já revogadas. O preço de aquisição é apresentado apenas em Venda de Normas, para as normas em vigor.",
  },
})

const emit = defineEmits(["back-to-comissoes"])

const {
  groups,
  selectedCategory,
  itemsInCategory,
  selectCategory,
  backToCategories,
} = useCategoryGroups(() => props.normas, "categoria")

const {
  searchTerm,
  ano,
  anos,
  filteredNormas,
  seedSearch: applySeedSearch,
  resetFilters,
} = useNormaFilters(itemsInCategory)

const viaComissaoTecnica = ref(false)

watch(
  () => props.seedSearch,
  (term) => {
    if (term) {
      const match = props.normas.find((n) => n.title === term)
      if (match) selectCategory(match.categoria)
      applySeedSearch(term)
      viaComissaoTecnica.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="tab-panel">
    <button
      v-if="viaComissaoTecnica"
      type="button"
      class="back-link"
      @click="emit('back-to-comissoes')"
    >
      ← Voltar à Comissão Técnica
    </button>
    <template v-if="!selectedCategory">
      <div class="panel-head">
        <span class="eyebrow">Catálogo Nacional de Normas</span>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <UiCategoryTiles :groups="groups" item-label="normas" @select="selectCategory" />
    </template>

    <template v-else>
      <button type="button" class="back-link" @click="backToCategories">
        ← Voltar às categorias
      </button>
      <div class="panel-head">
        <span class="eyebrow">{{ selectedCategory }}</span>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
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
            placeholder="Pesquisar por título ou ICS…"
            aria-label="Pesquisar normas"
          />
        </div>
        <div class="catalog-filter">
          <select v-model="ano" aria-label="Filtrar por ano">
            <option value="">Todos os anos</option>
            <option v-for="a in anos" :key="a" :value="String(a)">{{ a }}</option>
          </select>
          <button
            v-if="searchTerm || ano"
            class="chip"
            type="button"
            @click="resetFilters"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      <p v-if="!filteredNormas.length" class="empty-state">
        Nenhuma norma encontrada com os filtros seleccionados.
      </p>

      <div class="catalog">
        <div class="catalog-item" v-for="norma in filteredNormas" :key="norma.reference">
          <div class="catalog-item-top">
            <div class="catalog-item-code">{{ norma.reference }}</div>
            <span class="badge badge--sector badge--green">{{ norma.categoria }}</span>
            <span
              class="badge badge--estado"
              :class="{ revogada: norma.estado === 'revogada' }"
            >
              {{ norma.estado === "revogada" ? "Revogada" : "Em vigor" }}
            </span>
          </div>
          <h3 class="catalog-item-title">{{ norma.title }}</h3>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.tab-panel {
  display: block !important;
  padding: 1.5rem 2rem 2rem 2rem;
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
  margin-bottom: 0.25rem;
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
  margin-left: auto;
  font-family: monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
}

.badge--estado.revogada {
  background: #fef2f2;
  color: #dc2626;
}

.catalog-item-title {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
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

  .catalog-item-top {
    gap: 0.75rem;
  }

  .badge--estado {
    margin-left: 0;
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
