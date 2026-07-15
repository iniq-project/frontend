<script setup>
defineProps({
  cooperacoes: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Cooperação Regional e Internacional</span>
      <h2>Estruturas de que o INIQ é membro</h2>
      <p>
        O INIQ participa nas seguintes estruturas internacionais de cooperação em metrologia.
      </p>
    </div>

    <div class="coop-list">
      <article class="coop-item" v-for="coop in cooperacoes" :key="coop.id">
        <div>
          <div class="coop-tags">
            <span class="coop-sigla">{{ coop.sigla }}</span>
            <span class="badge badge--sector badge--green">{{ coop.tipoParticipacao }}</span>
          </div>
          <h3>{{ coop.nomeCompleto }}</h3>
        </div>
        <a :href="coop.link" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
          Ver site oficial
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
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

.coop-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.coop-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.coop-tags {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.coop-sigla {
  font-family: monospace;
  font-weight: 700;
  color: #0a3a63;
  font-size: 0.95rem;
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

.coop-item h3 {
  margin: 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
}

.btn--ghost {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}

.btn--ghost svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .coop-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .coop-item .btn--ghost {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
