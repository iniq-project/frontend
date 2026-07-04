<script setup lang="ts">
import { inject, watch, ref } from 'vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Certificação',
})

// Inject active sub-item from layout
const activeSubItemId = inject('activeSubItemId')

// Track if sub-item is selected
const isSubItemSelected = ref(false)

// Sync with layout
if (activeSubItemId) {
  watch(activeSubItemId, (newId) => {
    isSubItemSelected.value = !!newId
  }, { immediate: true })
}
</script>

<template>
  <div class="combined-card">
    <!-- Top info - only show when no sub-item is selected -->
    <template v-if="!isSubItemSelected">
      <div class="dg-top">
        <div class="dg-photo-wrapper">
          <img
            class="dg-photo"
            src="/perfis/02.jpg"
            alt="Chefe do Departamento de Certificação"
          />
          <div class="dg-details">
            <h3>Dr. [Nome]</h3>
            <p class="role">Chefe do Departamento de Certificação</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Responsável</h4>
          <p>
            “Mensagem sobre certificação aqui.”
          </p>
        </div>
      </div>

      <div class="quality-policy-section mb-10">
        <h4>Política de Certificação</h4>
        <p>
          Descrição da política de certificação aqui.
        </p>
      </div>
    </template>

    <!-- Sub-item content - only show when "Solicitar Serviço" is selected -->
    <template v-if="isSubItemSelected">
      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Informações Gerais</span>
            <h2>Certificação</h2>
            <p>
              Informações sobre certificação aqui.
            </p>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);

}

.dg-top {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid #e6eff6;
}

.dg-photo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}

.dg-photo {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #5cb947;
  box-shadow: 0 4px 10px rgba(92, 185, 71, 0.15);
}

.dg-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}

.dg-details h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}

.dg-details .role {
  margin: 0;
  font-size: 1rem;
  color: #5cb947;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.dg-message {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: flex-start;
}

.dg-message h4 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
}

.dg-message p {
  margin: 0;
  font-size: 1.15rem;
  color: #334155;
  line-height: 1.7;
  font-style: italic;
  font-weight: 500;
}

.quality-policy-section {
  padding: 1.5rem 2rem 0 2rem;
  border-top: 1px solid #e6eff6;
}

.quality-policy-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #2ba9e0;
  padding-left: 0.75rem;
}

.quality-policy-section p {
  margin: 0;
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.8;
}

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
</style>
