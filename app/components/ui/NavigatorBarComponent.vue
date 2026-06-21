<script setup lang="ts">
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <aside class="sidebar-right">
    <NuxtLink v-if="!isHomePage" to="/" class="back-btn">← Voltar à Página Inicial</NuxtLink>
    <h2>Serviços</h2>
    <nav class="services-list">
      <NuxtLink to="/normas-tecnicas" class="service-item" :class="{ active: isActive('/normas-tecnicas') }">
        <span class="n">01</span>
        <span>Normas Técnicas & Normalização</span>
      </NuxtLink>
      <NuxtLink to="/metrologia" class="service-item" :class="{ active: isActive('/metrologia') }">
        <span class="n">02</span>
        <span>Metrologia</span>
      </NuxtLink>
      <NuxtLink to="/acreditacao" class="service-item" :class="{ active: isActive('/acreditacao') }">
        <span class="n">03</span>
        <span>Registo, Cadastro e Acreditação</span>
      </NuxtLink>
      <NuxtLink to="/importacao" class="service-item" :class="{ active: isActive('/importacao') }">
        <span class="n">04</span>
        <span>Validação, Verificação e Certificação de Produtos a Importar</span>
      </NuxtLink>
      <NuxtLink to="/formacao" class="service-item" :class="{ active: isActive('/formacao') }">
        <span class="n">05</span>
        <span>Formação e Qualificação em Qualidade</span>
      </NuxtLink>
      <NuxtLink to="/rotulos" class="service-item" :class="{ active: isActive('/rotulos') }">
        <span class="n">06</span>
        <span>Conformidade de Rótulos e Embalagens</span>
      </NuxtLink>
      <NuxtLink to="/regulamentos" class="service-item" :class="{ active: isActive('/regulamentos') }">
        <span class="n">07</span>
        <span>Regulamentos Técnicos</span>
      </NuxtLink>
      <NuxtLink to="/premio-qualidade" class="service-item" :class="{ active: isActive('/premio-qualidade') }">
        <span class="n">08</span>
        <span>Prémio Nacional da Qualidade</span>
      </NuxtLink>
    </nav>
  </aside>
</template>


<style scoped>
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
  margin-bottom: 2rem;
}

.additional-links {
  margin-top: auto;
  padding-bottom: 1.5rem;
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
  font-family: 'Archivo', system-ui, sans-serif;
  min-width: 28px;
}

.service-item span:last-child {
  color: #0a3a63;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
}
</style>