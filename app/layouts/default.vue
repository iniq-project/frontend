<script setup>
import { provide, ref, watch, computed } from "vue"
import quemSomos from "@/gql/quem-somos.gql"
import parceiros from "@/gql/parceiros.gql"
 
const { query } = useSquidex()
const data = await query(quemSomos, { key: "about" })
const partnerData = await query(parceiros, { key: "partner" })

const aboutInfo = computed(() => data.value?.data.queryAboutContents?.[0]?.data)
const partnerInfo = computed(() => partnerData.value?.data.queryPartnerContents?.[0]?.data)

const route = useRoute()
const activeSubItemId = ref(null)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleSelectService = (serviceId) => {
  activeSubItemId.value = null
}

const handleSelectSubItem = (serviceId, subItemId) => {
  activeSubItemId.value = subItemId
}

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/") {
      activeSubItemId.value = null
    }
  }
)


let loader = ref(true);
onMounted(() => {
  setTimeout(() => {
    loader.value = false;
  }, 3000);
});


provide("activeSubItemId", activeSubItemId)
</script>

<template>
  <UiLoaderComponent v-if="loader" />
  <div v-show="!loader" class="new-layout">
    <UiHeaderComponent @toggle-menu="toggleMenu" :menu-open="menuOpen" />
    <div class="mobile-overlay" :class="{ open: menuOpen }" aria-hidden="true" @click="closeMenu" />
    <div class="main-container">
      <UiSideBarComponent :data="aboutInfo" class="sidebar-left">
        <template #eyebrow>
          <slot name="sidebar-eyebrow" />
        </template>
        <template #title>
          <slot name="sidebar-title" />
        </template>
        <slot name="sidebar-content" />
      </UiSideBarComponent>
      <main class="center-content">
        <slot />
      </main>
      <UiNavigatorBarComponent class="sidebar-right" :class="{ open: menuOpen }" @select-service="handleSelectService"
        @select-subitem="handleSelectSubItem" @close="closeMenu" />
      <div class="carousel-spacer"></div>
      <div class="partner-carousel-wrapper">
        <UiPartnerCarousel :data="partnerInfo" />
      </div>
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

.main-container {
  display: grid;
  grid-template-columns: 320px 1fr 530px;
  grid-template-rows: auto 1fr;
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
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.center-content {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  padding: 2rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.sidebar-right {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  padding: 2rem 2.5rem 0 2rem;
  margin-top: 2rem; 
  margin-right: 2rem;   
  box-sizing: border-box;
}

.carousel-spacer {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.partner-carousel-wrapper {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  display: flex;
  align-items: stretch;
  min-height: 0;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 1199px) {
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }

  .center-content {
    order: 1;
    padding: 1.25rem 1rem;
    overflow-y: visible;
    width: 100%;
  }

  .sidebar-left {
    order: 2;
    width: 100%;
  }

  .sidebar-right {
    order: 0;
    margin: 0;
  }

  .carousel-spacer {
    display: none;
  }

  .partner-carousel-wrapper {
    order: 3;
    width: 100%;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(16, 33, 48, 0.45);
    z-index: 90;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .mobile-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
