<script setup lang="ts">
import { inject, watch, ref } from 'vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Metrologia',
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
            src="/perfis/03.jpg"
            alt="Chefe do Departamento de Metrologia"
          />
            <div class="dg-details">
              <h3>Eng.º António Bengui</h3>
              <p class="role">Chefe do Departamento de Metrologia</p>
            </div>
          </div>
          <div class="dg-message">
            <h4>Mensagem do Responsável</h4>
            <p>
              “Medições fiáveis são a base do comércio justo e da indústria. Asseguramos a rastreabilidade de cada medição ao Sistema Internacional de Unidades.”
            </p>
          </div>
        </div>

        <div class="quality-policy-section mb-10">
          <h4>Política de Qualidade para Metrologia</h4>
          <p>
            O INIQ compromete-se a garantir a fiabilidade e rastreabilidade das medições em Angola, alinhando-se com os padrões internacionais (BIPM, OIML) e promovendo a confiança no mercado, a proteção do consumidor e a competitividade industrial, com foco na melhoria contínua e excelência.
          </p>
        </div>
      </template>

      <!-- Sub-item content - only show when "Solicitar Serviço" is selected -->
      <template v-if="isSubItemSelected">
        <section class="mt-12">
          <div class="container">
            <div class="panel-head">
              <span class="eyebrow">Serviços</span>
              <h2>Serviços de metrologia ao seu dispor</h2>
            </div>
            <div class="mserv">
              <div class="mserv__item">
                <span class="chk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                <div><b>Calibração de instrumentos</b><p>Massa, volume, temperatura, pressão, dimensional e mais.</p></div>
              </div>
              <div class="mserv__item">
                <span class="chk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                <div><b>Verificação metrológica legal</b><p>Verificação inicial e periódica de instrumentos sujeitos a controlo.</p></div>
              </div>
              <div class="mserv__item">
                <span class="chk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                <div><b>Emissão de certificados</b><p>Certificados de calibração e de verificação com rastreabilidade ao SI.</p></div>
              </div>
              <div class="mserv__item">
                <span class="chk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                <div><b>Aprovação de modelo</b><p>Avaliação e aprovação de modelos de instrumentos de medição.</p></div>
              </div>
            </div>
 
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="cta-band">
              <div>
                <h2>Precisa de calibrar ou verificar instrumentos?</h2>
                <p>Contacte o Laboratório Nacional de Metrologia do INIQ e solicite um orçamento para os seus equipamentos.</p>
              </div>
              <div class="cta-band__actions">
                <NuxtLink to="/contactos" class="btn btn--ghost">Solicitar calibração</NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
</template>


<style scoped>
.tab-panel {
  display: block !important;
}

.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
  position: relative;
  z-index: 1;
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

.tabs-bar {
  padding: 0 2rem;
  border-bottom: 1px solid #e6eff6;
}

.tabs {
  display: flex;
  gap: 0;
  border-bottom: none;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  margin-right: 2rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #0a3a63;
}

.tab-btn.is-active {
  color: #0a3a63;
  border-bottom-color: #5cb947;
}

.tab-btn .n {
  font-weight: 700;
  color: #5cb947;
  font-size: 1rem;
}

.tab-panel {
  padding: 1.5rem 2rem 2rem 2rem;
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

.btn--ghost {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  z-index: 10;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}
</style>
