<script setup>
import { ref } from "vue"

defineProps({
  orgaoLegisladorTitle: { type: String, default: undefined },
  orgaoLegisladorDescription: { type: String, default: undefined },
  acervoNacional: { type: Array, default: () => [] },
  consultaPublicaTitle: { type: String, default: undefined },
  consultaPublicaDescription: { type: String, default: undefined },
  consultaPublicaProjects: { type: Array, default: () => [] },
  equivalentesTitle: { type: String, default: undefined },
  equivalentesDescription: { type: String, default: undefined },
  equivalentes: { type: Array, default: () => [] },
})

const activeView = ref("orgao-legislador")

const modalMode = ref(null)
const modalItem = ref(null)

const openModal = (mode, item) => {
  modalMode.value = mode
  modalItem.value = item
}

const closeModal = () => {
  modalMode.value = null
  modalItem.value = null
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Regulamentos Técnicos</span>
      <h2>Regulamentos Técnicos</h2>
    </div>

    <div class="view-toggle">
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'orgao-legislador' }"
        @click="activeView = 'orgao-legislador'"
      >
        Órgão Legislador
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'acervo-nacional' }"
        @click="activeView = 'acervo-nacional'"
      >
        Acervo Nacional Regulamentar
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'consulta-publica' }"
        @click="activeView = 'consulta-publica'"
      >
        Consulta Pública
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'equivalentes' }"
        @click="activeView = 'equivalentes'"
      >
        Regulamentos Equivalentes
      </button>
    </div>

    <CustomArcrtOrgaoLegislador
      v-if="activeView === 'orgao-legislador'"
      :title="orgaoLegisladorTitle"
      :description="orgaoLegisladorDescription"
    />
    <CustomArcrtAcervoNacional
      v-if="activeView === 'acervo-nacional'"
      :regulamentos="acervoNacional"
      @open-modal="openModal"
    />
    <CustomArcrtConsultaPublica
      v-if="activeView === 'consulta-publica'"
      :title="consultaPublicaTitle"
      :description="consultaPublicaDescription"
      :projects="consultaPublicaProjects"
    />
    <CustomArcrtRegulamentosEquivalentes
      v-if="activeView === 'equivalentes'"
      :title="equivalentesTitle"
      :description="equivalentesDescription"
      :regulamentos="equivalentes"
    />
  </div>

  <CustomArcrtPurchaseModal
    :open="modalMode === 'purchase'"
    :item="modalItem"
    @close="closeModal"
  />
</template>

<style scoped>
.tab-panel {
  display: block !important;
  padding: 1.5rem 2rem 0 2rem;
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
  margin: 0;
  font-weight: 700;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0;
  flex-wrap: wrap;
}

.toggle-btn {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: #0a3a63;
}

.toggle-btn.is-active {
  background: #0a3a63;
  border-color: #0a3a63;
  color: white;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 0;
  }
}

@media (max-width: 767px) {
  .toggle-btn {
    flex: 1 1 auto;
    text-align: center;
  }
}
</style>
