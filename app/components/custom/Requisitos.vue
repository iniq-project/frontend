<script setup lang="ts">
interface Requisito {
  num: number | string
  text: string
}

interface DownloadInfo {
  title: string
  description: string
  link: string
  buttonText: string
}

const props = defineProps({
  eyebrow: {
    type: String,
    default: "Requisitos"
  },
  title: {
    type: String,
    default: "Documentação Necessária"
  },
  description: {
    type: String,
    default: "Lista de documentos que deverá preparar para submeter o seu pedido."
  },
  requisitos: {
    type: Array as () => Requisito[],
    default: () => []
  },
  downloadInfo: {
    type: Object as () => DownloadInfo | null,
    default: null
  },
  showSubmitButton: {
    type: Boolean,
    default: true
  },
  submitButtonText: {
    type: String,
    default: "Submeter Processo"
  }
})

const emit = defineEmits(['submit'])
</script>
<template>
  <section class="mt-12">
    <div class="container">
      <div class="panel-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
        <div v-if="description" class="panel-description" v-html="description"></div>
        <p v-else>{{ description }}</p>
      </div>

      <div v-if="requisitos.length > 0" class="requisitos-list">
        <div class="requisito-item" v-for="requisito in requisitos" :key="requisito.num">
          <span class="requisito-num">{{ requisito.num }}</span>
          <span class="requisito-text">{{ requisito.text }}</span>
        </div>
      </div>
    </div>
  </section>

  <section v-if="downloadInfo" class="mt-12">
    <div class="container">
      <div class="download-section">
        <div class="download-info">
          <h3>{{ downloadInfo.title }}</h3>
          <div v-if="downloadInfo.description" class="download-description" v-html="downloadInfo.description"></div>
          <p v-else>{{ downloadInfo.description }}</p>
        </div>
        <a :href="downloadInfo.link" download class="btn btn--download">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {{ downloadInfo.buttonText }}
        </a>
      </div>
    </div>
  </section>

  <section v-if="showSubmitButton" class="mt-12">
    <div class="container">
      <button @click="$emit('submit')" class="btn btn--primary">
        {{ submitButtonText }}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6"></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.mt-12 {
  margin-top: 3rem;
}

.container {
  padding: 0 2rem 2rem 2rem;
}

.panel-head {
  margin-bottom: 1.5rem;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
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

.panel-head p,
.panel-head .panel-description {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
}

.requisitos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.requisito-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  align-items: center;
}

.requisito-num {
  flex-shrink: 0;
  font-family: "Archivo", system-ui, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #5cb947;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e6eff6;
}

.requisito-text {
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 500;
}

.download-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #eff6fc 0%, #e6f3f9 50%, #f0f7f2 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  box-shadow: 0 4px 16px rgba(10, 58, 99, 0.06);
  border: 1px solid #e6eff6;
}

.download-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  color: #0a3a63;
  font-weight: 700;
}

.download-info p,
.download-info .download-description {
  margin: 0;
  color: #475569;
  font-size: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 1rem;
}

.btn--primary {
  background: #0a3a63;
  color: white;
}

.btn--primary:hover {
  background: #082e4f;
  transform: translateY(-1px);
}

.btn--download {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(92, 185, 71, 0.2);
}

.btn--download:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 185, 71, 0.3);
}

.btn--download svg {
  width: 22px;
  height: 22px;
}
</style>
