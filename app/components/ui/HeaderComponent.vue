<script setup lang="ts">
const route = useRoute()

const pageTitles = {
  "/": "Instituto Nacional das Infra-Estruturas da Qualidade",
  "/normas-tecnicas": "Normalização",
  "/metrologia": "Metrologia",
  "/registo-cadastro": "Registo e Cadastro ",
  "/importacao": "Validação, Verificação e Certificação de Produtos a Importar",
  "/formacao": "Formação e Qualificação em Qualidade",
  "/rotulos": "Avaliação da Conformidade",
  "/regulamentos": "Regulamentos Técnicos",
  "/premio-qualidade": "Prémio Nacional da Qualidade",
  "/contactos": "Contactos",
}

const pageTitle = computed(
  () =>
    pageTitles[route.path as keyof typeof pageTitles] ||
    "Instituto Nacional das Infra-Estruturas da Qualidade",
)
</script>

<template>
  <header class="new-header">
    <div class="logo-left">
      <NuxtLink to="/">
        <img src="/iniq-logo.png" alt="INIQ" />
      </NuxtLink>
    </div>
    <div class="header-center">
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="logo-right">
      <a
        href="https://mindcom.gov.ao/home"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/gov-mindcom-t.png" alt="Governo de Angola" />
      </a>
    </div>
  </header>
</template>



<style scoped>
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

.logo-left a,
.logo-right a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-left img {
  height: 75px;
  width: auto;
  max-height: 75px;
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
</style>
