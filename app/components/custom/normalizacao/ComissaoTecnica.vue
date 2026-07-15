<script setup>
const props = defineProps({
  comissoes: {
    type: Array,
    default: () => [],
  },
  normas: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["view-norma"])

const normasDaComissao = (comissao) => {
  return comissao.normaReferences
    .map((reference) => props.normas.find((n) => n.reference === reference))
    .filter(Boolean)
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Comissão Técnica</span>
      <h2>Comissões Técnicas de Normalização</h2>
      <p>
        Consulte as Comissões Técnicas existentes e as normas já publicadas por
        cada uma. Esta secção é apenas de consulta — não há candidatura ou
        pedido de integração disponível na plataforma.
      </p>
    </div>

    <div class="comissoes">
      <article class="comissao-item" v-for="comissao in comissoes" :key="comissao.id">
        <div class="comissao-head">
          <h3>{{ comissao.nome }}</h3>
          <span class="badge badge--sector badge--green">{{ comissao.sector }}</span>
        </div>
        <div class="normas-publicadas">
          <span class="normas-label">Normas publicadas</span>
          <ul>
            <li
              v-for="norma in normasDaComissao(comissao)"
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

.comissao-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.comissao-head h3 {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
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
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .norma-link {
    flex-wrap: wrap;
  }

  .badge--estado {
    margin-left: 0;
  }
}
</style>
