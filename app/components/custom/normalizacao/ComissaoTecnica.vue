<script setup>
import { ref, computed, watch } from "vue"

const props = defineProps({
  comissoes: {
    type: Array,
    default: () => [],
  },
  normas: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Comissões Técnicas de Normalização",
  },
  description: {
    type: String,
    default: "",
  },
  informacoesGerais: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["view-norma"])

const activeView = ref("info")

const normasDaComissao = (comissao) => {
  return comissao.normaReferences
    .map((reference) => props.normas.find((n) => n.reference === reference))
    .filter(Boolean)
}

const selectedComissaoId = ref(null)

const selectedComissao = computed(() =>
  props.comissoes.find((c) => c.id === selectedComissaoId.value) || null,
)

const selectComissao = (comissao) => {
  selectedComissaoId.value = comissao.id
}

const backToComissoes = () => {
  selectedComissaoId.value = null
}

watch(activeView, () => {
  selectedComissaoId.value = null
})
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Comissão Técnica</span>
      <h2>{{ title }}</h2>
      <div v-if="description" class="panel-desc" v-html="description"></div>
    </div>

    <div class="view-toggle">
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'info' }"
        @click="activeView = 'info'"
      >
        Sobre Comissões Técnicas
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'lista' }"
        @click="activeView = 'lista'"
      >
        Lista de Comissões Técnicas
      </button>
    </div>

    <div v-if="activeView === 'info'" class="info-block" v-html="informacoesGerais"></div>

    <div v-if="activeView === 'lista'" class="comissoes">
      <template v-if="!selectedComissao">
        <article
          class="comissao-item comissao-item--clickable"
          v-for="comissao in comissoes"
          :key="comissao.id"
          @click="selectComissao(comissao)"
        >
          <div class="comissao-head">
            <h3>{{ comissao.nome }}</h3>
            <span class="badge badge--sector badge--green">{{ comissao.sector }}</span>
          </div>
          <div class="comissao-lideranca">
            <span><b>Presidente:</b> {{ comissao.presidente }}</span>
            <span><b>Secretário Técnico:</b> {{ comissao.secretarioTecnico }}</span>
          </div>
          <div class="comissao-count">
            {{ comissao.normaReferences.length }} norma(s) publicada(s)
          </div>
        </article>
      </template>

      <template v-else>
        <button type="button" class="back-link" @click="backToComissoes">
          ← Voltar às Comissões Técnicas
        </button>
        <article class="comissao-item">
          <div class="comissao-head">
            <h3>{{ selectedComissao.nome }}</h3>
            <span class="badge badge--sector badge--green">{{ selectedComissao.sector }}</span>
          </div>
          <div class="comissao-lideranca">
            <span><b>Presidente:</b> {{ selectedComissao.presidente }}</span>
            <span><b>Secretário Técnico:</b> {{ selectedComissao.secretarioTecnico }}</span>
          </div>
          <div class="normas-publicadas">
            <span class="normas-label">Normas publicadas</span>
            <ul>
              <li
                v-for="norma in normasDaComissao(selectedComissao)"
                :key="norma.reference"
              >
                <button
                  type="button"
                  class="norma-link"
                  @click="emit('view-norma', norma.reference)"
                >
                  <span class="norma-ref">{{ norma.reference }}</span>
                  <span class="norma-title">{{ norma.title }}</span>
                  <span
                    class="badge badge--estado"
                    :class="{ revogada: norma.estado === 'revogada' }"
                  >
                    {{ norma.estado === "revogada" ? "Revogada" : "Em vigor" }}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </article>
      </template>
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

.panel-head p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
}

.panel-desc {
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
}

.panel-desc :deep(p) {
  margin: 0 0 0.75rem 0;
}

.panel-desc :deep(p:last-child) {
  margin-bottom: 0;
}

.panel-desc :deep(b),
.panel-desc :deep(strong) {
  color: #0a3a63;
}

.panel-desc :deep(ul) {
  list-style: none;
  margin: 0 0 0.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.panel-desc :deep(li) {
  position: relative;
  padding-left: 1.25rem;
}

.panel-desc :deep(li p) {
  margin: 0;
}

.panel-desc :deep(li)::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #5cb947;
  font-weight: bold;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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

.info-block {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.75rem 2rem;
}

.info-block :deep(h3) {
  margin: 0 0 1rem 0;
  color: #0a3a63;
  font-size: 1.3rem;
  font-weight: 700;
}

.info-block :deep(h4) {
  margin: 1.75rem 0 0.75rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.65rem;
}

.info-block :deep(h4:first-of-type) {
  margin-top: 1.5rem;
}

.info-block :deep(p) {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.7;
}

.info-block :deep(ul) {
  list-style: none;
  margin: 0 0 0.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.info-block :deep(li) {
  position: relative;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.info-block :deep(li)::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #5cb947;
  font-weight: bold;
}

.info-block :deep(li b),
.info-block :deep(p b) {
  color: #0a3a63;
}

.comissoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comissao-item {
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.comissao-item--clickable {
  cursor: pointer;
  transition: all 0.2s;
}

.comissao-item--clickable:hover {
  border-color: #2ba9e0;
}

.comissao-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2ba9e0;
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

.comissao-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.comissao-head h3 {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.comissao-lideranca {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eff6;
  font-size: 0.875rem;
  color: #475569;
}

.comissao-lideranca b {
  color: #0a3a63;
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
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
}

.badge--estado.revogada {
  background: #fef2f2;
  color: #dc2626;
}

.normas-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.normas-publicadas ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.norma-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.85rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.norma-link:hover {
  border-color: #2ba9e0;
  background: #eff6fc;
}

.norma-ref {
  font-family: monospace;
  font-size: 0.85rem;
  color: #64748b;
  flex-shrink: 0;
}

.norma-title {
  color: #0a3a63;
  font-size: 0.9rem;
  font-weight: 600;
  flex: 1;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .info-block {
    padding: 1.5rem;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .toggle-btn {
    flex: 1 1 auto;
    text-align: center;
  }

  .norma-link {
    flex-wrap: wrap;
  }

  .badge--estado {
    margin-left: 0;
  }

  .comissao-lideranca {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
