<template>
  <div class="new-layout">
    <header class="new-header">
      <div class="logo-left">
        <img src="/iniq-logo.png" alt="INIQ">
      </div>
      <div class="header-center">
        <h1>Instituto Nacional das Infra-Estruturas da Qualidade</h1>
      </div>
      <div class="logo-right">
        <img src="/gov-mindcom-t.png" alt="Governo de Angola">
      </div>
    </header>
    <div class="main-container">
      <aside class="sidebar-left">
        <div class="sidebar-content">
          <div class="eyebrow">Quem Somos</div>
          <h2 class="main-title">O Instituto Nacional das Infra-Estruturas da Qualidade</h2>
          <div class="about-text">
            <p>Criado pelo Decreto Presidencial n.º 95/21, de Abril de 2021, o Instituto Nacional das Infra-Estruturas da Qualidade (INIQ) é um instituto público dotado de personalidade jurídica e autonomia administrativa, financeira e patrimonial, sob superintendência do Ministério da Indústria e Comércio.</p>
            <p>Ao INIQ compete coordenar, supervisionar e desenvolver o Sistema Nacional da Qualidade, integrando as componentes de normalização, metrologia, ensaios, certificação e acreditação.</p>
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
              <img class="dg-photo" src="/director-geral.png" alt="Director-Geral">
              <div class="dg-details">
                <h3>Carmo Adriana dos Santos</h3>
                <p class="role">Direcção-Geral</p>
                <p class="phone">+244 222 000 000</p>
              </div>
            </div>
            <div class="dg-message">
              <h4>Mensagem do Director-Geral</h4>
              <p>"A qualidade é o alicerce silencioso de uma economia diversificada e competitiva. No INIQ, trabalhamos para que cada produto e serviço em Angola corresponda a padrões reconhecidos, protegendo o consumidor e abrindo portas ao comércio internacional."</p>
            </div>
          </div>
          <div class="quality-policy-section">
            <h4>Política de Qualidade</h4>
            <p>O INIQ compromete-se a coordenar e desenvolver o Sistema Nacional da Qualidade de Angola, garantindo a conformidade com normas internacionais, promovendo a inovação, a competitividade empresarial e a proteção do consumidor, através de serviços de normalização, metrologia, acreditação e avaliação da conformidade, com foco na melhoria contínua e excelência.</p>
          </div>
        </div>
      </main>
      <aside class="sidebar-right">
        <NuxtLink to="/" class="back-btn">← Voltar à Página Inicial</NuxtLink>
        <h2>Serviços</h2>
        <nav class="services-list">
          <NuxtLink to="/normas-tecnicas" class="service-item">
            <span class="num">01</span>
            <span>Normas Técnicas & Normalização</span>
          </NuxtLink>
          <NuxtLink to="/metrologia" class="service-item">
            <span class="num">02</span>
            <span>Metrologia</span>
          </NuxtLink>
          <NuxtLink to="/acreditacao" class="service-item">
            <span class="num">03</span>
            <span>Registo, Cadastro e Acreditação</span>
          </NuxtLink>
          <NuxtLink to="/importacao" class="service-item">
            <span class="num">04</span>
            <span>Validação, Verificação e Certificação de Produtos a Importar</span>
          </NuxtLink>
          <NuxtLink to="/formacao" class="service-item">
            <span class="num">05</span>
            <span>Formação e Qualificação em Qualidade</span>
          </NuxtLink>
          <NuxtLink to="/servicos" class="service-item">
            <span class="num">06</span>
            <span>Conformidade de Rótulos e Embalagens</span>
          </NuxtLink>
          <NuxtLink to="/servicos" class="service-item">
            <span class="num">07</span>
            <span>Regulamentos Técnicos</span>
          </NuxtLink>
          <NuxtLink to="/servicos" class="service-item">
            <span class="num">08</span>
            <span>Prémio Nacional da Qualidade</span>
          </NuxtLink>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

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
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  overflow-y: auto;
  margin-top: 0;
  border-radius: 0;
}
.sidebar-content {
  flex: 0 1 auto;
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
.dg-details .phone {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
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
  padding: 1.5rem 2rem 2rem 2rem;
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
.sidebar-right {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
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
  border: 2px solid #0a39638a;
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
.service-item:hover {
  background: linear-gradient(135deg, #f0f7f2 0%, #eff6fc 100%);
  border-color: #d0e8d6;
}
.service-item .num {
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
