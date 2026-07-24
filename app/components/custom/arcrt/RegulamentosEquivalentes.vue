<script setup>
defineProps({
  regulamentos: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Regulamentos reconhecidos pelo INIQ",
  },
  description: {
    type: String,
    default:
      "Lista dos Regulamentos Técnicos de outros países ou organismos que o INIQ reconhece como equivalentes. Esta secção é apenas de consulta.",
  },
})
</script>

<template>
  <div class="sub-panel">
    <div class="panel-head">
      <span class="eyebrow">Regulamentos Técnicos Equivalentes</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="catalog">
      <div class="catalog-item" v-for="regulamento in regulamentos" :key="regulamento.code">
        <div class="catalog-item-top">
          <div class="catalog-item-code">{{ regulamento.code }}</div>
          <span class="badge badge--sector badge--green">{{ regulamento.areaTecnica }}</span>
          <span
            class="badge badge--estado"
            :class="{ revogado: regulamento.estado === 'revogado' }"
          >
            {{ regulamento.estado === "revogado" ? "Revogado" : "Em vigor" }}
          </span>
        </div>
        <h3 class="catalog-item-title">{{ regulamento.title }}</h3>
        <p class="catalog-item-origem">
          Origem: <b>{{ regulamento.paisOrigem }}</b> — {{ regulamento.organismoOrigem }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sub-panel {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
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
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
}

.badge--estado.revogado {
  background: #fef2f2;
  color: #dc2626;
}

.catalog-item-title {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.catalog-item-origem {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
}

.catalog-item-origem b {
  color: #0a3a63;
}

@media (max-width: 1199px) {
  .sub-panel {
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
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
</style>
