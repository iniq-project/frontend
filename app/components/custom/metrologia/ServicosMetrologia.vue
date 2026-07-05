<script setup lang="ts">
interface Service {
  title: string
  description: string
}

const props = defineProps({
  eyebrow: {
    type: String,
    default: "Serviços"
  },
  title: {
    type: String,
    default: "Serviços de metrologia ao seu dispor"
  },
  services: {
    type: Array as () => Service[],
    default: () => []
  },
  cardTitle: {
    type: String,
    default: "Verificação Metrológica"
  },
  cardDescription: {
    type: String,
    default: "Verificação inicial e periódica de instrumentos sujeitos a controlo metrológico legal."
  },
  ctaTitle: {
    type: String,
    default: "Precisa de calibrar ou verificar instrumentos?"
  },
  ctaDescription: {
    type: String,
    default: "Contacte o Laboratório Nacional de Metrologia do INIQ e solicite um orçamento para os seus equipamentos."
  },
  ctaButtonText: {
    type: String,
    default: "Solicitar calibração"
  },
  requisitosButtonText: {
    type: String,
    default: "Ver Requisitos"
  }
})

const emit = defineEmits(['ver-requisitos'])
</script>

<template>
  <section class="mt-12">
    <div class="container">
      <div class="panel-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
      </div>
      <div class="mserv">
        <div class="mserv__item" v-for="(service, index) in services" :key="index">
          <span class="chk">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
          <div>
            <b>{{ service.title }}</b>
            <p v-html="service.description"></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-12">
    <div class="container">
      <div class="mserv-card">
        <div class="mserv-card__header">
          <h3>{{ cardTitle }}</h3>
          <p v-html="cardDescription"></p>
        </div>
        <div class="mserv-card__footer">
          <button @click="$emit('ver-requisitos')" class="btn btn--primary">
            {{ requisitosButtonText }}
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
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>{{ ctaTitle }}</h2>
          <p v-html="ctaDescription"></p>
        </div>
        <div class="cta-band__actions">
          <NuxtLink to="/contactos" class="btn btn--ghost">{{ ctaButtonText }}</NuxtLink>
        </div>
      </div>
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

.section {
  padding-top: 2rem;
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

.mserv {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.mserv__item {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.mserv__item .chk {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #eff6fc 0%, #f0f7f2 100%);
  display: grid;
  place-items: center;
  color: #5cb947;
}

.mserv__item div b {
  display: block;
  color: #0a3a63;
  font-size: 1.1rem;
  margin-bottom: 0.35rem;
}

.mserv__item div p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
}

.mserv-card {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mserv-card__header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  color: #0a3a63;
  font-weight: 700;
}

.mserv-card__header p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
}

.mserv-card__footer {
  display: flex;
  justify-content: flex-end;
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

.btn--ghost {
  background: white;
  color: #0a3a63;
  border: 1px solid #e6eff6;
}

.btn--ghost:hover {
  background: #f8fafc;
  border-color: #2ba9e0;
}

.cta-band {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #0a3a63, #1a4a73);
  border-radius: 12px;
  padding: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-band h2 {
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.cta-band p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.cta-band__actions {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 3;
}
</style>
