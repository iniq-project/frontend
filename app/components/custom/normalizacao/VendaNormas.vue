<script setup>
const props = defineProps({
  normas: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(['open-modal'])

const formatPrice = (price) => {
  return price.toLocaleString("pt-PT")
}
</script>
<template>
  <div class="tab-panel">
    <div class="panel-head">
      <h2 v-if="title">{{ title }}</h2>
      <div v-if="description" class="panel-description" v-html="description"></div>
    </div>

    <div class="catalog-toolbar">
      <div class="catalog-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input type="text" placeholder="Pesquisar por referência ou título…" aria-label="Pesquisar normas" />
      </div>
      <div class="catalog-filter">
        <button class="chip is-active">Todos</button>
        <button class="chip">Alimentar</button>
        <button class="chip">Construção</button>
        <button class="chip">Ambiente</button>
        <button class="chip">Gestão</button>
      </div>
    </div>

    <div class="catalog">
      <div class="catalog-item" v-for="norma in normas" :key="norma.code">
        <div class="catalog-item-top">
          <div class="catalog-item-code">{{ norma.code }}</div>
          <span class="badge badge--sector badge--green">{{ norma.sector }}</span>
          <div class="catalog-item-price">
            <span class="price-value">{{ formatPrice(norma.price) }}</span>
          </div>
          <button class="btn btn--primary" @click="$emit('open-modal', 'venda', norma)">
            Comprar
          </button>
        </div>
        <h3 class="catalog-item-title">{{ norma.title }}</h3>
      </div>
    </div>
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

.panel-head p,
.panel-head .panel-description {
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
    overflow-x: visible;
  }

  .chip {
    flex-shrink: 0;
  }

  .catalog-item-top {
    flex-wrap: wrap;
    gap: 0.75rem;
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

  .catalog-filter {
    width: auto;
    flex: 0 1 auto;
  }
}
</style>
