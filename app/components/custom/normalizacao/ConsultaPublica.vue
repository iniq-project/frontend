<script setup>
import { ref } from "vue"

defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["open-modal"])

const viewMode = ref("list")
const selectedProject = ref(null)

const openDetail = (project) => {
  selectedProject.value = project
  viewMode.value = "detail"
}

const backToList = () => {
  viewMode.value = "list"
  selectedProject.value = null
}
</script>

<template>
  <div class="tab-panel">
    <template v-if="viewMode === 'list'">
      <div class="panel-head">
        <span class="eyebrow">Projectos-Normas em Consulta Pública</span>
        <h2>Participe na elaboração das normas</h2>
        <p>
          Os projectos abaixo estão em fase de consulta pública. Qualquer
          interessado pode ler o documento do projecto e submeter contribuições
          dentro do prazo indicado, sem necessidade de conta ou autenticação.
        </p>
      </div>
      <div class="consulta">
        <article class="consulta-item" v-for="project in projects" :key="project.code">
          <div>
            <div class="consulta-tags">
              <span class="consulta-code">{{ project.code }}</span>
              <span class="badge badge--sector badge--green">{{ project.sector }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="consulta-desc">{{ project.description }}</p>
            <div class="consulta-bar">
              <span :style="{ width: project.progress + '%' }"></span>
            </div>
          </div>
          <div class="consulta-deadline">
            <span :class="['deadline-pill', { urgent: project.urgent }]">
              Termina {{ project.deadline }}
            </span>
            <button class="btn btn--green" @click="openDetail(project)">
              Ver projecto
            </button>
          </div>
        </article>
      </div>
    </template>

    <template v-else-if="viewMode === 'detail' && selectedProject">
      <button type="button" class="back-link" @click="backToList">
        ← Voltar à lista
      </button>
      <div class="panel-head">
        <div class="consulta-tags">
          <span class="consulta-code">{{ selectedProject.code }}</span>
          <span class="badge badge--sector badge--green">{{ selectedProject.sector }}</span>
          <span :class="['deadline-pill', { urgent: selectedProject.urgent }]">
            Termina {{ selectedProject.deadline }}
          </span>
        </div>
        <h2>{{ selectedProject.title }}</h2>
      </div>

      <div class="documento-wrap">
        <h4>Documento do projecto</h4>
        <p class="documento-text">{{ selectedProject.documento }}</p>
        <button type="button" class="btn btn--ghost" disabled title="Download indisponível nesta demonstração">
          Descarregar documento (PDF)
        </button>
        <p class="documento-caption">
          Documento anexado pela Comissão Técnica responsável — download indisponível nesta demonstração.
        </p>
      </div>

      <div class="comentar-wrap">
        <button class="btn btn--green" @click="emit('open-modal', 'contrib', selectedProject)">
          Comentar
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
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
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.consulta-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
}

.consulta-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
  border-radius: 3px;
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

.deadline-pill.urgent {
  background: #fef2f2;
  color: #dc2626;
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

.documento-wrap {
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.documento-wrap h4 {
  margin: 0 0 0.75rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
}

.documento-text {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.7;
  white-space: pre-line;
}

.documento-caption {
  margin: 0.5rem 0 0 0;
  color: #64748b;
  font-size: 0.85rem;
  font-style: italic;
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

.comentar-wrap {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
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

  .comentar-wrap .btn--green {
    width: 100%;
    justify-content: center;
    display: flex;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
