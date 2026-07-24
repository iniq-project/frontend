<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { services, type Service } from "~/data/services"

const route = useRoute()
const router = useRouter()
const isHomePage = computed(() => route.path === "/")

const { getMenuTitle } = await useMenuTitles()
const menuTitle = (service: Service) => getMenuTitle(service.id, service.title)

const activeServiceId = ref<string | null>(null)
const activeSubItemId = ref<string | null>(null)
const showSubItems = ref(false)

const emit = defineEmits(["select-service", "select-subitem", "close"])

const selectService = (service: Service) => {
  if (service.disabled) return

  activeServiceId.value = service.id
  showSubItems.value = true
  const path = `/${service.id}`
  router.push(path)

  activeSubItemId.value = null
  emit("select-service", service.id)
  emit("close")
}

const goBackToServices = () => {
  showSubItems.value = false
  activeSubItemId.value = null
  emit("select-service", null)
}

const selectSubItem = (serviceId: string, subItemId: string) => {
  activeSubItemId.value = subItemId
  emit("select-subitem", serviceId, subItemId)
  emit("close")
}

const goHome = () => {
  activeServiceId.value = null
  activeSubItemId.value = null
}

const activeService = computed(() =>
  services.find((s) => s.id === activeServiceId.value),
)

onMounted(() => {
  const pathToId: Record<string, string> = {
    "/normas-tecnicas": "normas-tecnicas",
    "/metrologia": "metrologia",
    "/importacao": "importacao",
    "/formacao": "formacao",
    "/rotulos": "rotulos",
    "/premio-qualidade": "premio-qualidade",
    "/certificacao": "certificacao",
    "/registo-cadastro": "registo-cadastro",
  }
  if (pathToId[route.path]) {
    activeServiceId.value = pathToId[route.path]
    showSubItems.value = true
    activeSubItemId.value = null
  }
})

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/") {
      activeServiceId.value = null
      activeSubItemId.value = null
      showSubItems.value = false
      emit("select-service", null)
    } else {
      const pathToId: Record<string, string> = {
        "/normas-tecnicas": "normas-tecnicas",
        "/metrologia": "metrologia",
        "/acreditacao": "acreditacao",
        "/importacao": "importacao",
        "/formacao": "formacao",
        "/rotulos": "rotulos",
        "/regulamentos": "regulamentos",
        "/premio-qualidade": "premio-qualidade",
        "/certificacao": "certificacao",
        "/registo-cadastro": "registo-cadastro",
      }
      if (pathToId[newPath]) {
        activeServiceId.value = pathToId[newPath]
        showSubItems.value = true
        activeSubItemId.value = null
      }
    }
  },
)
</script>

<template>
  <aside class="sidebar-right">
    <button class="drawer-close" @click="emit('close')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
    <NuxtLink v-if="!isHomePage && !showSubItems" to="/" class="back-btn" @click="goHome">← Voltar à Página Inicial
    </NuxtLink>
    <h2>{{ showSubItems ? "Processos" : "Serviços e Processos" }}</h2>
    <nav class="services-list">
      <template v-if="!showSubItems">
        <button v-for="service in services" :key="service.id" class="service-item" :class="{
          active: activeServiceId === service.id,
          disabled: service.disabled,
        }" @click="selectService(service)">
          <span class="n">{{ service.number }}</span>
          <span>{{ menuTitle(service) }}</span>
        </button>
      </template>
      <template v-else>
        <button class="back-to-services" @click="goBackToServices">
          ← Voltar para serviços
        </button>
        <div v-if="activeService.subItems?.length" class="subitems-list">
          <button v-for="subItem in activeService.subItems" :key="subItem.id" class="subitem"
            :class="{ active: activeSubItemId === subItem.id }" @click="selectSubItem(activeService.id, subItem.id)">
            <span class="n">{{ subItem.number }}</span>
            <span>{{ subItem.title }}</span>
          </button>
        </div>
      </template>
    </nav>
    <div class="area-reservada-wrapper">
      <a href="https://backoffice-iniq.netlify.app/login" target="_blank" rel="noopener noreferrer"
        class="area-reservada">
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
  border-radius: 12px 12px 12px 12px;
  box-shadow: none;
}

/* Custom scrollbar for sidebar */
.sidebar-right::-webkit-scrollbar,
.services-list::-webkit-scrollbar {
  width: 4px;
  /* Very thin */
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
  background: transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.service-item:hover,
.service-item.active {
  background: linear-gradient(135deg, #f0f7f2 0%, #eff6fc 100%);
  border-color: #d0e8d6;
}

.service-item.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
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

.back-to-services {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: underline;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.back-to-services:hover {
  color: #5cb947;
}

.subitems-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.subitem {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  align-items: flex-start;
  padding: 0.75rem 0.85rem;
  border-radius: 8px;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.subitem:hover,
.subitem.active {
  background: #eff6fc;
  border-color: #cfe5f6;
}

.subitem .n {
  font-weight: 700;
  color: #2ba9e0;
  font-size: 1rem;
  font-family: "Archivo", system-ui, sans-serif;
  min-width: 24px;
}

.subitem span:last-child {
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
  aside.sidebar-right {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(88vw, 360px);
    height: 100vh;
    z-index: 100;
    margin: 0;
    transform: translateX(100%);
    transition: transform 0.25s ease;
    border-radius: 0;
    padding: 3.5rem 1.5rem 0 1.5rem;
  }

  aside.sidebar-right.open {
    transform: translateX(0);
    box-shadow: -8px 0 32px rgba(10, 58, 99, 0.15);
  }

  .drawer-close {
    display: grid;
  }

  .service-item span:last-child {
    font-size: 1rem;
  }
}
</style>
