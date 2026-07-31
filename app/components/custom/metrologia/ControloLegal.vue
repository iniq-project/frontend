<script setup>
import { computed } from "vue"

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
  servicosTitle: {
    type: String,
    default: "Serviços de metrologia ao seu dispor",
  },
  servicosDescription: {
    type: String,
    default:
      "Consulte os serviços actualmente prestados pela Metrologia e a taxa associada. Ao clicar em Solicitar serviço, preencha o formulário de pedido com os dados do instrumento e do requerente.",
  },
})

const emit = defineEmits(["solicitar"])

const servicoDe = (servicoId) => {
  return props.servicos.find((s) => s.id === servicoId)
}

const formatFee = (fee) => {
  return (fee ?? 0).toLocaleString("pt-PT")
}

const referencedServicoIds = computed(
  () => new Set(props.operacoes.map((o) => o.servicoId)),
)

const outrosServicos = computed(() =>
  props.servicos.filter((s) => !referencedServicoIds.value.has(s.id)),
)
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
        <div class="operacao-main">
          <h3>{{ operacao.title }}</h3>
          <p class="operacao-desc">{{ operacao.description }}</p>
        </div>
        <div class="operacao-side">
          <div v-if="servicoDe(operacao.servicoId)" class="operacao-fee">
            <span class="fee-value">{{ formatFee(servicoDe(operacao.servicoId).fee) }}</span>
            <span class="fee-currency">AOA</span>
          </div>
          <button
            type="button"
            class="btn btn--green"
            @click="emit('solicitar', operacao.servicoId)"
          >
            Pedir este serviço
          </button>
        </div>
      </article>
    </div>

    <div class="servicos-section" v-if="outrosServicos.length">
      <div class="panel-head">
        <span class="eyebrow">Outros Serviços</span>
        <h2>{{ servicosTitle }}</h2>
        <p>{{ servicosDescription }}</p>
      </div>

      <div class="catalog">
        <div class="catalog-item" v-for="service in outrosServicos" :key="service.id">
          <div class="catalog-item-top">
            <h3 class="catalog-item-title">{{ service.title }}</h3>
            <div class="catalog-item-fee">
              <span class="fee-value">{{ formatFee(service.fee) }}</span>
              <span class="fee-currency">AOA</span>
            </div>
          </div>
          <p v-if="service.description" class="catalog-item-description">{{ service.description }}</p>
          <div class="catalog-item-actions">
            <button class="btn btn--primary" @click="emit('solicitar', service.id)">
              Solicitar serviço
            </button>
          </div>
        </div>
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

.operacao-main {
  flex: 1;
  min-width: 0;
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

.operacao-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.operacao-fee {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
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

.servicos-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e6eff6;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.catalog-item-title {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.catalog-item-description {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.6;
}

.catalog-item-fee {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.fee-value {
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.25rem;
}

.fee-currency {
  font-size: 0.85rem;
  color: #64748b;
}

.catalog-item-actions {
  display: flex;
  justify-content: flex-end;
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

  .operacao-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .operacao-side {
    align-items: stretch;
  }

  .operacao-side .btn--green {
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

  .catalog-item {
    padding: 1rem;
  }

  .catalog-item-top {
    flex-direction: column;
    gap: 0.5rem;
  }

  .catalog-item-title {
    font-size: 1rem;
  }

  .catalog-item-actions .btn--primary {
    width: 100%;
  }
}
</style>
