<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Validação, Verificação e Certificação de Produtos a Importar',
})
</script>

<template>
  <div class="combined-card">
    <div class="dg-top">
      <div class="dg-photo-wrapper">
        <img
          class="dg-photo"
          src="/perfis/01.jpeg"
          alt="Chefe do Departamento de Avaliação da Conformidade"
        />
        <div class="dg-details">
          <h3>Dra. Luísa Ferraz</h3>
          <p class="role">Chefe do Departamento de Avaliação da Conformidade</p>
        </div>
      </div>
      <div class="dg-message">
        <h4>Mensagem do Responsável</h4>
        <p>
          “Verificamos a conformidade dos produtos antes de entrarem no mercado,
          protegendo o consumidor e garantindo concorrência leal.”
        </p>
      </div>
    </div>

    <div class="quality-policy-section">
      <h4>Política de Avaliação da Conformidade</h4>
      <p>
        O INIQ compromete-se a garantir que os produtos importados cumpram os
        requisitos técnicos e regulamentares aplicáveis, protegendo a saúde e
        segurança dos consumidores, o meio ambiente e promovendo a concorrência leal
        no mercado angolano.
      </p>
    </div>

    <section class="mt-12">
      <div class="container">
        <div class="panel-head">
          <span class="eyebrow">Informações Gerais</span>
          <h2>Certificação de produtos a importar</h2>
          <p>
            O INIQ avalia a conformidade dos produtos destinados à importação face
            aos regulamentos técnicos e às normas aplicáveis. Este controlo protege o
            mercado nacional e o consumidor, impedindo a entrada de produtos não
            conformes e assegurando concorrência leal entre operadores.
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
                <path d="M9 11l3 3 6-6"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3>Validação</h3>
            <p>
              Análise documental do produto, da sua classificação e dos requisitos
              técnicos aplicáveis antes do embarque ou do desalfandegamento.
            </p>
            <ul>
              <li>Análise de documentação técnica</li>
              <li>Enquadramento regulamentar</li>
              <li>Requisitos de rotulagem</li>
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
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <h3>Verificação</h3>
            <p>
              Inspecção e ensaio de amostras para confirmar que o produto cumpre as
              especificações declaradas e os regulamentos em vigor.
            </p>
            <ul>
              <li>Inspecção física</li>
              <li>Recolha e ensaio de amostras</li>
              <li>Verificação de conformidade</li>
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
                <path
                  d="M12 2l3 3 4 .5.5 4 3 3-3 3-.5 4-4 .5-3 3-3-3-4-.5-.5-4-3-3 3-3 .5-4 4-.5Z"
                ></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3>Certificação</h3>
            <p>
              Emissão do certificado de conformidade que autoriza a entrada e a
              comercialização do produto no mercado nacional.
            </p>
            <ul>
              <li>Certificado de conformidade</li>
              <li>Autorização de comercialização</li>
              <li>Rastreabilidade do processo</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="mt-12">
      <div class="container">
        <div class="panel-head">
          <span class="eyebrow">Processo</span>
          <h2>Da solicitação ao certificado</h2>
          <p>
            Um circuito claro que acompanha o produto desde o pedido até à
            autorização de entrada no mercado.
          </p>
        </div>
        <div class="trace">
          <div class="trace__step">
            <span class="lvl"
              ><span class="dot">1</span> Pedido</span
            >
            <h4>Submissão do processo</h4>
            <p>
              O importador submete o pedido com a documentação técnica do produto.
            </p>
          </div>
          <div class="trace__step">
            <span class="lvl"
              ><span class="dot">2</span> Avaliação</span
            >
            <h4>Validação e verificação</h4>
            <p>
              Análise documental, inspecção e, quando aplicável, ensaio de amostras.
            </p>
          </div>
          <div class="trace__step">
            <span class="lvl"
              ><span class="dot">3</span> Decisão</span
            >
            <h4>Emissão do certificado</h4>
            <p>
              Certificado de conformidade ou notificação de não-conformidade.
            </p>
          </div>
          <div class="trace__step">
            <span class="lvl"
              ><span class="dot">4</span> Mercado</span
            >
            <h4>Entrada autorizada</h4>
            <p>
              O produto conforme é libertado para comercialização no país.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>Vai importar produtos para Angola?</h2>
            <p>
              Contacte o Departamento de Avaliação da Conformidade do INIQ e conheça
              os requisitos de certificação aplicáveis.
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
  gap: 1.5rem;
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

.policy__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.policy__statement {
  background: white;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 2rem;
}

.policy__statement .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba9e0;
  margin-bottom: 0.75rem;
}

.policy__statement .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.policy__statement h3 {
  font-size: 1.5rem;
  color: #0a3a63;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.policy__statement p {
  margin: 0 0 1.5rem 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.8;
}

.flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.flow__node {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.flow__node b {
  display: block;
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 700;
}

.flow__node span {
  display: block;
  font-size: 0.875rem;
  color: #64748b;
}

.flow__arrow {
  color: #5cb947;
}

.pillars {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.pillar {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.5rem;
}

.pillar .ico {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: white;
  margin-bottom: 1rem;
}

.pillar .ico svg {
  width: 24px;
  height: 24px;
}

.pillar h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #0a3a63;
  font-weight: 700;
}

.pillar p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
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
