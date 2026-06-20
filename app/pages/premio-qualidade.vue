<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Prémio Nacional da Qualidade',
})
</script>

<template>
  <div class="combined-card">
    <div class="dg-top">
      <div class="dg-photo-wrapper">
        <img
          class="dg-photo"
          src="/director-geral.png"
          alt="Director-Geral"
        />
        <div class="dg-details">
          <h3>Carmo Adriana dos Santos</h3>
          <p class="role">Direcção-Geral</p>
        </div>
      </div>
      <div class="dg-message">
        <h4>Mensagem do Responsável</h4>
        <p>
          “O Prémio Nacional da Qualidade reconhece e celebra a excelência nas
          organizações angolanas, incentivando a adoção de boas práticas de gestão
          da qualidade.”
        </p>
      </div>
    </div>

    <div class="quality-policy-section">
      <h4>Política do Prémio Nacional da Qualidade</h4>
      <p>
        O INIQ compromete-se a promover a excelência nas organizações nacionais
        através do Prémio Nacional da Qualidade, reconhecendo as boas práticas de
        gestão da qualidade e incentivando a melhoria contínua.
      </p>
    </div>

    <section class="mt-12">
      <div class="container">
        <div class="panel-head">
          <span class="eyebrow">Informações Gerais</span>
          <h2>Prémio Nacional da Qualidade</h2>
          <p>
            Reconhecimento da excelência e das boas práticas de gestão da qualidade
            nas organizações nacionais, segundo modelos de excelência reconhecidos.
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
                <circle cx="12" cy="9" r="6"></circle>
                <path d="m9 14-1.5 7L12 18l4.5 3L15 14"></path>
              </svg>
            </div>
            <h3>Candidaturas</h3>
            <p>
              Processo de candidatura ao Prémio Nacional da Qualidade, aberto a
              organizações de todos os sectores da economia angolana.
            </p>
            <ul>
              <li>Aberto a todas as organizações</li>
              <li>Processo de candidatura</li>
              <li>Critérios de avaliação</li>
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
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
            <h3>Modelo de Excelência</h3>
            <p>
              Aplicação de modelos de excelência reconhecidos internacionalmente
              para avaliação das organizações candidatas.
            </p>
            <ul>
              <li>Critérios de excelência</li>
              <li>Avaliação independente</li>
              <li>Feedback qualitativo</li>
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
                <path d="M12 2l3 3 4 .5.5 4 3 3-3 3-.5 4-4 .5-3 3-3-3-4-.5-.5-4-3-3 3-3 .5-4 4-.5Z"></path>
              </svg>
            </div>
            <h3>Reconhecimento</h3>
            <p>
              Cerimónia de entrega do prémio e divulgação das boas práticas das
              organizações premiadas.
            </p>
            <ul>
              <li>Cerimónia de entrega</li>
              <li>Divulgação de boas práticas</li>
              <li>Visibilidade nacional</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>Quer candidatar-se ao Prémio Nacional da Qualidade?</h2>
            <p>
              Contacte o INIQ para obter mais informações sobre o processo de
              candidatura e os critérios de avaliação.
            </p>
          </div>
          <div>
            <NuxtLink to="/contactos" class="btn btn--ghost"
              >Pedir informação</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
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
