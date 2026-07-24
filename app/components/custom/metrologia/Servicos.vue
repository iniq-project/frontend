<script setup>
defineProps({
  services: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Serviços de metrologia ao seu dispor",
  },
  description: {
    type: String,
    default:
      "Consulte os serviços actualmente prestados pela Metrologia e a taxa associada. Ao clicar em Solicitar serviço, preencha o formulário de pedido com os dados do instrumento e do requerente.",
  },
  modeloCarta: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(["solicitar"])

const formatFee = (fee) => {
  return (fee ?? 0).toLocaleString("pt-PT")
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Serviços</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <a
        v-if="modeloCarta?.documentUrl"
        :href="modeloCarta.documentUrl"
        download
        class="btn--download-link"
      >
        Baixar modelo — {{ modeloCarta.title }}
      </a>
    </div>

    <div class="catalog">
      <div class="catalog-item" v-for="service in services" :key="service.id">
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

.btn--download-link {
  display: inline-block;
  margin-top: 0.75rem;
  color: #2ba9e0;
  font-weight: 600;
  text-decoration: none;
}

.btn--download-link:hover {
  text-decoration: underline;
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
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
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
