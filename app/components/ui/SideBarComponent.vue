
<script setup lang="ts">
</script>


<template>
  <aside class="sidebar-left">
    <div class="sidebar-content">
      <div class="eyebrow">
        <slot name="eyebrow">Quem Somos</slot>
      </div>
      <h2 class="main-title">
        <slot name="title">O Instituto Nacional das Infra-Estruturas da Qualidade</slot>
      </h2>
      <div class="about-text">
        <slot>
          <p>Criado pelo Decreto Presidencial n.º 95/21, de Abril de 2021, o Instituto Nacional das Infra-Estruturas da Qualidade (INIQ) é um instituto público dotado de personalidade jurídica e autonomia administrativa, financeira e patrimonial, sob superintendência do Ministério da Indústria e Comércio.</p>
          <p>Ao INIQ compete coordenar, supervisionar e desenvolver o Sistema Nacional da Qualidade, integrando as componentes de normalização, metrologia, ensaios, certificação e acreditação.</p>
        </slot>
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
</template>

<style scoped>
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
  content: '';
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.main-title {
  font-family: 'Archivo', system-ui, sans-serif;
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
  /* font-family: monospace; */
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
</style>