<script setup>
defineProps({
  servicos: {
    type: Array,
    default: () => [],
  },
  leiDownloadInfo: {
    type: Object,
    default: () => null,
  },
})

const formatFee = (fee) => {
  return (fee ?? 0).toLocaleString("pt-PT")
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Taxas de Metrologia Legal</span>
      <h2>Emolumentos aplicáveis aos serviços de metrologia</h2>
      <p>
        Valores conforme a Lei n.º 17/02, de 13 de Dezembro. Estes são os mesmos
        valores mostrados no pedido em <b>Serviços</b>, para que o utente veja o
        custo sem ter de consultar esta página à parte.
      </p>
    </div>

    <div class="taxas-list">
      <div class="taxa-item" v-for="servico in servicos" :key="servico.id">
        <span class="taxa-title">{{ servico.title }}</span>
        <span class="taxa-fee"
          >{{ formatFee(servico.fee) }} <small>AOA</small></span
        >
      </div>
    </div>

    <div v-if="leiDownloadInfo" class="lei-wrap">
      <h4>{{ leiDownloadInfo.title }}</h4>
      <p>{{ leiDownloadInfo.description }}</p>
      <a
        v-if="leiDownloadInfo.documentUrl"
        :href="leiDownloadInfo.documentUrl"
        download
        class="btn btn--ghost"
      >
        {{ leiDownloadInfo.buttonText }}
      </a>
      <button v-else type="button" class="btn btn--ghost" disabled>
        {{ leiDownloadInfo.buttonText }}
      </button>
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

.taxas-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.taxa-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
}

.taxa-title {
  color: #0a3a63;
  font-weight: 600;
  font-size: 0.95rem;
}

.taxa-fee {
  flex-shrink: 0;
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.15rem;
  white-space: nowrap;
}

.taxa-fee small {
  font-weight: 500;
  font-size: 0.75rem;
  color: #64748b;
}

.lei-wrap {
  padding: 1.5rem;
  background: linear-gradient(135deg, #eff6fc 0%, #f0f7f2 100%);
  border: 1px solid #e6eff6;
  border-radius: 12px;
}

.lei-wrap h4 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.lei-wrap p {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.btn--ghost {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--ghost:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.caption {
  margin: 0.75rem 0 0 0 !important;
  color: #64748b;
  font-size: 0.85rem;
  font-style: italic;
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

  .taxa-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .lei-wrap .btn--ghost {
    width: 100%;
  }
}
</style>
