<script setup>
defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Participe na elaboração dos regulamentos",
  },
  description: {
    type: String,
    default:
      "Os regulamentos abaixo estão em fase de desenvolvimento e abertos a consulta pública. Qualquer interessado pode submeter contribuições dentro do prazo indicado.",
  },
})

const emit = defineEmits(["open-modal"])
</script>

<template>
  <div class="sub-panel">
    <div class="panel-head">
      <span class="eyebrow">Regulamentos Técnicos em Consulta Pública</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="consulta">
      <article class="consulta-item" v-for="project in projects" :key="project.code">
        <div>
          <div class="consulta-tags">
            <span class="consulta-code">{{ project.code }}</span>
            <span class="badge badge--sector badge--green">{{ project.areaTecnica }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p class="consulta-desc">{{ project.description }}</p>
          <a
            v-if="project.documentUrl"
            :href="project.documentUrl"
            download
            class="doc-link"
          >
            Descarregar documento (PDF)
          </a>
        </div>
        <div class="consulta-deadline">
          <span class="deadline-pill">Termina {{ project.deadline }}</span>
          <button class="btn btn--green" @click="emit('open-modal', 'contrib', project)">
            Contribuir
          </button>
        </div>
      </article>
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

.consulta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.consulta-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.consulta-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
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

.consulta-code {
  font-family: monospace;
  font-weight: 600;
  color: #0a3a63;
  font-size: 0.9rem;
}

.consulta-item h3 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.1rem;
  font-weight: 700;
}

.consulta-desc {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.doc-link {
  display: inline-flex;
  margin-top: 0.5rem;
  color: #2ba9e0;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.doc-link:hover {
  text-decoration: underline;
}

.consulta-deadline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
  min-width: 200px;
}

.deadline-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn--green {
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

@media (max-width: 1199px) {
  .sub-panel {
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
  }

  .consulta-item {
    flex-direction: column;
    gap: 1rem;
  }

  .consulta-deadline {
    align-items: flex-start;
    min-width: 0;
    width: 100%;
  }

  .consulta-deadline .btn--green {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
