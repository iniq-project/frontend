<script setup lang="ts">
const route = useRoute()

defineEmits<{
  close: []
}>()

const isHomePage = computed(() => route.path === '/')

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <aside id="services-menu" class="sidebar-right">
    <button type="button" class="drawer-close" aria-label="Fechar menu" @click="$emit('close')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
    <NuxtLink v-if="!isHomePage" to="/" class="back-btn" @click="$emit('close')">← Voltar à Página Inicial</NuxtLink>
    <h2>Serviços</h2>
    <nav class="services-list" @click="$emit('close')">
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
    <div class="area-reservada-wrapper">
      <a href="https://reliable-haupia-87ded0.netlify.app/admin" target="_blank" rel="noopener noreferrer" class="area-reservada">
        Área Reservada
      </a>
    </div>
  </aside>
</template>


<style scoped>
.sidebar-right {
  position: sticky;
  top: 0;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-top: 0;
  overflow-y: auto;
  background: white;
  border-radius: 0 0 0 12px;
  box-shadow: none;
}

/* Custom scrollbar for sidebar */
.sidebar-right::-webkit-scrollbar,
.services-list::-webkit-scrollbar {
  width: 4px; /* Very thin */
}

.sidebar-right::-webkit-scrollbar-track,
.services-list::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-right::-webkit-scrollbar-thumb,
.services-list::-webkit-scrollbar-thumb {
  background: #d0d8e0;
  border-radius: 4px;
}

.sidebar-right::-webkit-scrollbar-thumb:hover,
.services-list::-webkit-scrollbar-thumb:hover {
  background: #b0bbc5;
}

/* Firefox scrollbar */
.sidebar-right,
.services-list {
  scrollbar-width: thin;
  scrollbar-color: #d0d8e0 transparent;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: underline;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.back-btn:hover {
  color: #5cb947;
  text-decoration: underline;
}

.sidebar-right h2 {
  font-size: 1.35rem;
  color: #0a3a63;
  margin: 0 0 1.25rem 0;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
  flex-shrink: 0;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
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

.area-reservada-wrapper {
  padding-top: 1rem;
  border-top: 1px solid #e9eff6;
  margin-bottom: 1.5rem;
}

.area-reservada {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: underline;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.area-reservada:hover {
  color: #5cb947;
  text-decoration: underline;
}

.carousel-wrapper {
  flex-shrink: 0;
  padding: 1rem 0;
  border-top: 1px solid #e9eff6;
}

.drawer-close {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #64748b;
  cursor: pointer;
  place-items: center;
  padding: 0;
  z-index: 2;
}

.drawer-close svg {
  width: 20px;
  height: 20px;
}

.drawer-close:hover {
  border-color: #2ba9e0;
  color: #0a3a63;
}

@media (max-width: 1199px) {
  .sidebar-right {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(88vw, 360px);
    height: 100vh;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.25s ease;
    box-shadow: -8px 0 32px rgba(10, 58, 99, 0.15);
    border-radius: 0;
    padding-top: 3.5rem;
  }

  .sidebar-right.open {
    transform: translateX(0);
  }

  .drawer-close {
    display: grid;
  }

  .service-item span:last-child {
    font-size: 1rem;
  }
}
</style>