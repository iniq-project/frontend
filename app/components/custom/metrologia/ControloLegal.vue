<script setup>
const props = defineProps({
  operacoes: {
    type: Array,
    default: () => [],
  },
  servicos: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "O que é o controlo metrológico legal",
  },
  description: {
    type: String,
    default:
      "O controlo metrológico legal garante a exactidão dos instrumentos de medição usados em transacções comerciais, operações fiscais, segurança, ambiente e saúde. É uma obrigação do Estado, executada pelo INIQ, e compreende as seguintes operações.",
  },
})

const emit = defineEmits(["pedir-servico"])

const servicoDe = (servicoId) => {
  return props.servicos.find((s) => s.id === servicoId)
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Controlo Metrológico Legal</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="operacoes">
      <article
        class="operacao-item"
        v-for="operacao in operacoes"
        :key="operacao.id"
      >
        <div>
          <h3>{{ operacao.title }}</h3>
          <p class="operacao-desc">{{ operacao.description }}</p>
          <p v-if="servicoDe(operacao.servicoId)" class="operacao-servico">
            Serviço associado: <b>{{ servicoDe(operacao.servicoId).title }}</b>
          </p>
        </div>
        <button
          type="button"
          class="btn btn--green"
          @click="emit('pedir-servico', operacao.servicoId)"
        >
          Pedir este serviço
        </button>
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

.operacoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.operacao-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.operacao-item h3 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.1rem;
  font-weight: 700;
}

.operacao-desc {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.operacao-servico {
  margin: 0.5rem 0 0 0;
  color: #0a3a63;
  font-size: 0.85rem;
}

.operacao-servico b {
  font-weight: 700;
}

.btn--green {
  flex-shrink: 0;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: #5cb947;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--green:hover {
  background: #4aa838;
}

.note {
  color: #64748b;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .operacao-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .operacao-item .btn--green {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .operacao-item {
    padding: 1rem;
  }
}
</style>
