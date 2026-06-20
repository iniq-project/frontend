<script setup>
const activeTab = ref("venda")
</script>

<template>
  <div class="new-layout">
    <header class="new-header">
      <div class="logo-left">
        <img src="/iniq-logo.png" alt="INIQ" />
      </div>
      <div class="header-center">
        <h1>Normas Técnicas & Normalização</h1>
      </div>
      <div class="logo-right">
        <img src="/gov-mindcom-t.png" alt="Governo de Angola" />
      </div>
    </header>

    <div class="main-container">
      <aside class="sidebar-left">
        <div class="sidebar-content">
          <div class="eyebrow">Quem Somos</div>
          <h2 class="main-title">
            O Instituto Nacional das Infra-Estruturas da Qualidade
          </h2>
          <div class="about-text">
            <p>
              Criado pelo Decreto Presidencial n.º 95/21, de Abril de 2021, o
              Instituto Nacional das Infra-Estruturas da Qualidade (INIQ) é um
              instituto público dotado de personalidade jurídica e autonomia
              administrativa, financeira e patrimonial, sob superintendência do
              Ministério da Indústria e Comércio.
            </p>
            <p>
              Ao INIQ compete coordenar, supervisionar e desenvolver o Sistema
              Nacional da Qualidade, integrando as componentes de normalização,
              metrologia, ensaios, certificação e acreditação.
            </p>
          </div>
        </div>

        <div class="sidebar-footer">
          <div class="gov-info">
            Palácio de Vidro, Largo 17 de Setembro, Luanda
          </div>
          <div class="lang-btns">
            <button class="active">PT</button>
            <button>EN</button>
          </div>
        </div>
      </aside>

      <main class="center-content">
        <div class="combined-card">
          <div class="dg-top">
            <div class="dg-photo-wrapper">
              <img
                class="dg-photo"
                src="/chefe-normalizacao.png"
                alt="Chefe do Departamento de Normalização"
              />
              <div class="dg-details">
                <h3>Dra. Inês Cabral</h3>
                <p class="role">Chefe do Departamento de Normalização</p>
              </div>
            </div>
            <div class="dg-message">
              <h4>Mensagem do Responsável</h4>
              <p>
                “A normalização é o ponto de partida da qualidade. Construímos,
                com as comissões técnicas, as referências que dão confiança ao
                mercado.”
              </p>
            </div>
          </div>

          <div class="quality-policy-section">
            <h4>Política de Qualidade para Normalização</h4>
            <p>
              O INIQ compromete-se a coordenar e desenvolver o sistema nacional
              de normalização de Angola, garantindo a conformidade com as
              melhores práticas internacionais, promovendo a participação
              transparente de todas as partes interessadas, e garantindo que as
              normas angolanas apoiem a inovação, a competitividade empresarial
              e a proteção do consumidor, com foco na melhoria contínua e
              excelência.
            </p>
          </div>

          <div class="tabs-bar">
            <div class="tabs">
              <button
                :class="['tab-btn', { 'is-active': activeTab === 'venda' }]"
                @click="activeTab = 'venda'"
              >
                <span class="n">01</span> Venda de Normas
              </button>
              <button
                :class="['tab-btn', { 'is-active': activeTab === 'consulta' }]"
                @click="activeTab = 'consulta'"
              >
                <span class="n">02</span> Projectos em Consulta Pública
              </button>
            </div>
          </div>

          <div v-if="activeTab === 'venda'" class="tab-panel">
            <div class="panel-head">
              <span class="eyebrow">Venda de Normas</span>
              <h2>Catálogo nacional de normas</h2>
              <p>
                Pesquise as normas em vigor e solicite a sua aquisição. Ao
                clicar em <b>Solicitar</b>, abre-se o formulário de pedido com
                pagamento por Referência Multicaixa ou Multicaixa Express.
              </p>
            </div>

            <div class="catalog-toolbar">
              <div class="catalog-search">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Pesquisar por referência ou título…"
                  aria-label="Pesquisar normas"
                />
              </div>
              <div class="catalog-filter">
                <button class="chip is-active">Todos</button>
                <button class="chip">Alimentar</button>
                <button class="chip">Construção</button>
                <button class="chip">Ambiente</button>
                <button class="chip">Gestão</button>
              </div>
            </div>

            <div class="catalog">
              <div class="catalog-item">
                <div class="catalog-item-top">
                  <div class="catalog-item-code">NA 0042:2025</div>
                  <span class="badge badge--sector badge--green">Ambiente</span>
                  <div class="catalog-item-price">
                    <span class="price-value">12 500</span>
                    <span class="price-currency">AOA</span>
                  </div>
                  <button class="btn btn--primary">Solicitar</button>
                </div>
                <h3 class="catalog-item-title">
                  Águas de consumo humano — Requisitos de qualidade
                </h3>
              </div>
              <div class="catalog-item">
                <div class="catalog-item-top">
                  <div class="catalog-item-code">NA 0309:2024</div>
                  <span class="badge badge--sector badge--green"
                    >Construção</span
                  >
                  <div class="catalog-item-price">
                    <span class="price-value">15 000</span>
                    <span class="price-currency">AOA</span>
                  </div>
                  <button class="btn btn--primary">Solicitar</button>
                </div>
                <h3 class="catalog-item-title">
                  Cimento Portland — Especificações e ensaios
                </h3>
              </div>
              <div class="catalog-item">
                <div class="catalog-item-top">
                  <div class="catalog-item-code">NA 0756:2023</div>
                  <span class="badge badge--sector badge--green">Gestão</span>
                  <div class="catalog-item-price">
                    <span class="price-value">9 800</span>
                    <span class="price-currency">AOA</span>
                  </div>
                  <button class="btn btn--primary">Solicitar</button>
                </div>
                <h3 class="catalog-item-title">
                  Segurança de brinquedos — Requisitos gerais
                </h3>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'consulta'" class="tab-panel">
            <div class="panel-head">
              <span class="eyebrow">Projectos-Normas em Consulta Pública</span>
              <h2>Participe na elaboração das normas</h2>
              <p>
                Os projectos abaixo estão em fase de consulta pública. Qualquer
                interessado pode submeter contribuições dentro do prazo
                indicado.
              </p>
            </div>
            <div class="consulta">
              <article class="consulta__item">
                <div>
                  <div class="consulta__tags">
                    <span class="consulta__code">prNA 1187:2026</span>
                    <span class="badge badge--sector">Alimentar</span>
                  </div>
                  <h3>Rotulagem de produtos alimentares pré-embalados</h3>
                  <p class="consulta__desc">
                    Requisitos de informação obrigatória, declaração nutricional
                    e alergénios na rotulagem de géneros alimentícios.
                  </p>
                  <div class="consulta__bar">
                    <span style="width: 62%"></span>
                  </div>
                </div>
                <div class="consulta__deadline">
                  <span class="deadline-pill">Termina 30 Jun 2026</span>
                  <button class="btn btn--green">Contribuir</button>
                </div>
              </article>
              <article class="consulta__item">
                <div>
                  <div class="consulta__tags">
                    <span class="consulta__code">prNA 1402:2026</span>
                    <span class="badge badge--sector">Gestão</span>
                  </div>
                  <h3>
                    Sistemas de gestão da qualidade — Fundamentos e vocabulário
                  </h3>
                  <p class="consulta__desc">
                    Princípios, conceitos e terminologia de base para os
                    sistemas de gestão da qualidade.
                  </p>
                  <div class="consulta__bar">
                    <span style="width: 38%"></span>
                  </div>
                </div>
                <div class="consulta__deadline">
                  <span class="deadline-pill">Termina 15 Jul 2026</span>
                  <button class="btn btn--green">Contribuir</button>
                </div>
              </article>
              <article class="consulta__item">
                <div>
                  <div class="consulta__tags">
                    <span class="consulta__code">prNA 0991:2026</span>
                    <span class="badge badge--sector">Construção</span>
                  </div>
                  <h3>Blocos de betão para alvenaria — Requisitos</h3>
                  <p class="consulta__desc">
                    Especificações dimensionais, resistência mecânica e métodos
                    de ensaio para blocos de betão.
                  </p>
                  <div class="consulta__bar">
                    <span style="width: 88%"></span>
                  </div>
                </div>
                <div class="consulta__deadline">
                  <span class="deadline-pill urgent">Termina 12 Jun 2026</span>
                  <button class="btn btn--green">Contribuir</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <aside class="sidebar-right">
        <NuxtLink to="/" class="back-btn">← Voltar à Página Inicial</NuxtLink>
        <h2>Serviços</h2>
        <nav class="services-list">
          <NuxtLink to="/normas-tecnicas" class="service-item active">
            <span class="n">01</span>
            <span>Normas Técnicas & Normalização</span>
          </NuxtLink>
          <NuxtLink to="/metrologia" class="service-item">
            <span class="n">02</span>
            <span>Metrologia</span>
          </NuxtLink>
          <a href="#" class="service-item">
            <span class="n">03</span>
            <span>Registo, Cadastro e Acreditação</span>
          </a>
          <NuxtLink href="#" class="service-item">
            <span class="n">04</span>
            <span
              >Validação, Verificação e Certificação de Produtos a
              Importar</span
            >
          </NuxtLink>
          <NuxtLink to="/formacao" class="service-item">
            <span class="n">05</span>
            <span>Formação e Qualificação em Qualidade</span>
          </NuxtLink>
          <a href="#" class="service-item">
            <span class="n">06</span>
            <span>Conformidade de Rótulos e Embalagens</span>
          </a>
          <a href="#" class="service-item">
            <span class="n">07</span>
            <span>Regulamentos Técnicos</span>
          </a>
          <a href="#" class="service-item">
            <span class="n">08</span>
            <span>Prémio Nacional da Qualidade</span>
          </a>
        </nav>
      </aside>
    </div>
  </div>
</template>


<style scoped>
.new-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4f8 0%, #e9eff6 100%);
}
.new-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 1.25rem 2.5rem;
  background: white;
  border-bottom: 1px solid #d0d9e3;
  box-shadow: 0 2px 8px rgba(10, 58, 99, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
}
.logo-left,
.logo-right {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
}
.logo-left img {
  height: 70px;
  width: auto;
  max-height: 70px;
  object-fit: contain;
}
.logo-right img {
  height: 48px;
  width: auto;
  max-height: 48px;
  object-fit: contain;
}
.logo-left {
  justify-content: flex-start;
}
.logo-right {
  justify-content: flex-end;
}
.header-center {
  text-align: center;
}
.header-center h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #0a3a63;
  font-weight: 700;
  line-height: 1.3;
}
.main-container {
  display: grid;
  grid-template-columns: 420px 1fr 380px;
  gap: 0;
  padding: 0;
  max-width: 100%;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
}
.sidebar-left {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  padding: 1.25rem 1.25rem 0 1.25rem;
  overflow-y: auto;
  margin-top: 0;
  border-radius: 0;
}
.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;
  padding-top: 2rem;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #5cb947;
  margin-bottom: 1rem;
  margin-top: 0;
}
.eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}
.main-title {
  font-family: "Archivo", system-ui, sans-serif;
  font-size: clamp(1.5rem, 2vw, 1.85rem);
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin: 0 0 1.25rem 0;
}
.about-text {
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 0.95rem;
}
.about-text p {
  margin-bottom: 1.25rem;
}
.about-text p:last-child {
  margin-bottom: 0;
}
.sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}
.gov-info {
  font-family: monospace;
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
}
.lang-btns {
  display: flex;
  gap: 0.5rem;
}
.lang-btns button {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.lang-btns button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}
.lang-btns button.active {
  background: #5cb947;
  border-color: #5cb947;
  color: #0f172a;
}
.center-content {
  padding: 2rem 2rem;
  overflow-y: auto;
}
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
  overflow: hidden;
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
  color: #2ba9e0;
  margin-bottom: 0.5rem;
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
.ct-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.ct {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
}
.ct__code {
  display: inline-block;
  font-family: monospace;
  font-size: 0.85rem;
  color: #5cb947;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.ct h3 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
}
.ct p {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.6;
}
.ct__meta {
  display: flex;
  gap: 1.5rem;
}
.ct__meta div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.ct__meta b {
  color: #0a3a63;
  font-weight: 700;
  font-size: 1.15rem;
}
.cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}
.btn--ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #0a3a63;
  border-radius: 8px;
  color: #0a3a63;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  background: white;
}
.btn--ghost:hover {
  background: #f0f7f2;
}
.cta-row span {
  color: #64748b;
  font-size: 0.9rem;
}
.quality-policy-section {
  padding: 1.5rem 2rem 1.5rem 2rem;
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
.catalog-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}
.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex: 1;
  min-width: 250px;
}
.catalog-search svg {
  width: 20px;
  height: 20px;
  color: #64748b;
}
.catalog-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}
.catalog-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.chip {
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  border: 1px solid #d0d9e3;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}
.chip:hover {
  border-color: #0a3a63;
}
.chip.is-active {
  background: #0a3a63;
  border-color: #0a3a63;
  color: white;
  font-weight: 600;
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
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}
.catalog-item:hover {
  border-color: #2ba9e0;
}
.catalog-item-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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
  border-radius: 20px;
}
.badge--green {
  background: #eaf7e5;
  color: #5cb947;
}
.catalog-item-price {
  margin-left: auto;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}
.price-value {
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.25rem;
}
.price-currency {
  font-size: 0.85rem;
  color: #64748b;
}
.catalog-item-title {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
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
.consulta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.consulta__item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}
.consulta__tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.consulta__code {
  font-family: monospace;
  font-weight: 600;
  color: #0a3a63;
  font-size: 0.9rem;
}
.badge--sector {
  background: #eff6fc;
  color: #0a3a63;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
}
.consulta__item h3 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.1rem;
  font-weight: 700;
}
.consulta__desc {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}
.consulta__bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
}
.consulta__bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
  border-radius: 3px;
}
.consulta__deadline {
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
.sidebar-right {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-top: 0;
  overflow-y: auto;
  background: white;
  border-radius: 0;
  box-shadow: none;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid #0a3a63;
  border-radius: 8px;
  background: white;
  transition: all 0.2s;
}
.back-btn:hover {
  background: #eff6fc;
  border-color: #0a3a63;
  color: #0a3a63;
}
.sidebar-right h2 {
  font-size: 1.35rem;
  color: #0a3a63;
  margin: 0 0 1.25rem 0;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
}
.services-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.service-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: flex-start;
  text-decoration: none;
  padding: 0.75rem 0.85rem;
  border-radius: 8px;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.service-item:hover,
.service-item.active {
  background: linear-gradient(135deg, #f0f7f2 0%, #eff6fc 100%);
  border-color: #d0e8d6;
}
.service-item .n {
  font-weight: 800;
  color: #5cb947;
  font-size: 1.1rem;
  font-family: "Archivo", system-ui, sans-serif;
  min-width: 28px;
}
.service-item span:last-child {
  color: #0a3a63;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
}
</style>
