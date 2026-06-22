<script setup lang="ts">
import { inject, watch, ref } from 'vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Registo, Cadastro e Acreditação',
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
            alt="Chefe do Departamento de Acreditação"
          />
          <div class="dg-details">
            <h3>Dr. Joaquim Mateus</h3>
            <p class="role">Chefe do Departamento de Acreditação</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Responsável</h4>
          <p>
            “A acreditação dá confiança ao mercado: reconhece formalmente quem tem
            competência técnica para avaliar a conformidade.”
          </p>
        </div>
      </div>

      <div class="quality-policy-section mb-10">
        <h4>Política de Acreditação</h4>
        <p>
          A acreditação é o nível mais elevado de garantia da qualidade: avalia quem
          avalia. Ao reconhecer a competência dos organismos, o INIQ assegura que
          ensaios, certificados e relatórios emitidos em Angola merecem confiança no
          mercado nacional e internacional.
        </p>
      </div>
    </template>

    <!-- Sub-item content - only show when "Solicitar Serviço" is selected -->
    <template v-if="isSubItemSelected">
      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Informações Gerais</span>
            <h2>Registo, Cadastro e Acreditação</h2>
            <p>
              O INIQ assegura o registo e o cadastro dos operadores económicos no
              âmbito do Sistema Nacional da Qualidade e procede à acreditação de
              laboratórios e organismos de avaliação da conformidade — o reconhecimento
              formal da sua competência técnica para realizar ensaios, calibrações,
              inspecções e certificações.
            </p>
          </div>

          <div class="mdomains">
            <article class="mdomain">
              <div class="ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 12h6M9 16h6M9 8h2"></path>
                  <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                </svg>
              </div>
              <h3>Registo e Cadastro</h3>
              <p>
                Inscrição e manutenção do cadastro de operadores económicos e
                entidades que actuam no Sistema Nacional da Qualidade.
              </p>
              <ul>
                <li>Registo de operadores económicos</li>
                <li>Cadastro de entidades técnicas</li>
                <li>Actualização e renovação</li>
              </ul>
            </article>
            <article class="mdomain">
              <div class="ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 12 2 2 4-4"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </div>
              <h3>Acreditação de Laboratórios</h3>
              <p>
                Reconhecimento da competência de laboratórios de ensaio e de calibração
                segundo as normas internacionais aplicáveis.
              </p>
              <ul>
                <li>Laboratórios de ensaio</li>
                <li>Laboratórios de calibração</li>
                <li>ISO/IEC 17025</li>
              </ul>
            </article>
            <article class="mdomain">
              <div class="ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 11V7a4 4 0 0 0-8 0v4"></path>
                  <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                </svg>
              </div>
              <h3>Organismos de Conformidade</h3>
              <p>
                Acreditação de organismos de inspecção e de certificação de produtos,
                processos, sistemas e pessoas.
              </p>
              <ul>
                <li>Organismos de inspecção</li>
                <li>Organismos de certificação</li>
                <li>ISO/IEC 17020 · 17065</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Processo</span>
            <h2>Como decorre a acreditação</h2>
            <p>
              Um processo transparente e por etapas, da candidatura à decisão, com
              vigilância periódica que assegura a manutenção da competência.
            </p>
          </div>
          <div class="trace">
            <div class="trace__step">
              <span class="lvl"
                ><span class="dot">1</span> Candidatura</span
              >
              <h4>Submissão do pedido</h4>
              <p>
                A entidade submete o pedido e a documentação do seu sistema de gestão
                e âmbito.
              </p>
            </div>
            <div class="trace__step">
              <span class="lvl"
                ><span class="dot">2</span> Avaliação</span
              >
              <h4>Avaliação documental e no local</h4>
              <p>
                Equipa avaliadora analisa a competência técnica e audita as
                instalações.
              </p>
            </div>
            <div class="trace__step">
              <span class="lvl"
                ><span class="dot">3</span> Decisão</span
              >
              <h4>Concessão da acreditação</h4>
              <p>
                Emissão do certificado de acreditação com o âmbito reconhecido.
              </p>
            </div>
            <div class="trace__step">
              <span class="lvl"
                ><span class="dot">4</span> Vigilância</span
              >
              <h4>Manutenção e renovação</h4>
              <p>
                Auditorias de acompanhamento periódicas e renovação do ciclo.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-12">
        <div class="container">
          <div class="cta-band">
            <div>
              <h2>Pretende acreditar o seu laboratório ou organismo?</h2>
              <p>
                Fale com o Departamento de Acreditação do INIQ e conheça os requisitos
                e as etapas do processo.
              </p>
            </div>
            <div class="cta-band__actions">
              <NuxtLink to="/contactos" class="btn btn--ghost"
                >Pedir informação</NuxtLink
              >
            </div>
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

.mdomains {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.mdomain {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
}

.mdomain .ico {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: white;
  margin-bottom: 1rem;
}

.mdomain .ico svg {
  width: 24px;
  height: 24px;
}

.mdomain h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  color: #0a3a63;
  font-weight: 700;
}

.mdomain p {
  margin: 0 0 1rem 0;
  color: #475569;
  line-height: 1.6;
}

.mdomain ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #475569;
}

.mdomain ul li {
  margin-bottom: 0.5rem;
}

.section {
  padding-top: 2rem;
}

.section.bg-mist {
  background: #f8fafc;
}

.trace {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.trace__step {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
}

.trace__step .lvl {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #2ba9e0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.trace__step .dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.trace__step h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #0a3a63;
  font-weight: 700;
}

.trace__step p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
}

.framework {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.framework__item {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.framework__item .acr {
  font-family: monospace;
  font-size: 1.25rem;
  color: #0a3a63;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.framework__item .desc {
  color: #475569;
  font-size: 0.95rem;
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

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.25);
}

.btn--light {
  background: white;
  color: #0a3a63;
}

.btn--light:hover {
  background: #f0f4f8;
}
</style>
