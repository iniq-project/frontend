<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()

defineProps<{
  menuOpen?: boolean
}>()

const emit = defineEmits<{
  toggleMenu: []
}>()
</script>

<template>
  <header class="new-header">
    <button
      type="button"
      class="menu-toggle"
      :class="{ open: menuOpen }"
      :aria-expanded="menuOpen"
      aria-controls="services-menu"
      aria-label="Abrir menu de serviços"
      @click="emit('toggleMenu')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    </button>
    <div class="logo-left">
      <NuxtLink to="/">
        <img src="/iniq-logo.png" alt="INIQ" />
      </NuxtLink>
    </div>
    <div class="header-center">
      <h1>Instituto Nacional das Infra-Estruturas da Qualidade</h1>
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
  font-size: 1.2rem;
  color: #0a3a63;
  font-weight: 700;
  line-height: 1.3;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid #d0d9e3;
  border-radius: 8px;
  background: white;
  color: #0a3a63;
  cursor: pointer;
  place-items: center;
  padding: 0;
  flex-shrink: 0;
  transition: border-color 0.2s, background 0.2s;
}

.menu-toggle:hover {
  border-color: #5cb947;
  background: #f0f7f2;
}

.menu-toggle svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 1199px) {
  .new-header {
    grid-template-columns: auto auto 1fr auto;
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }

  .menu-toggle {
    display: grid;
    grid-column: 1;
    grid-row: 1;
  }

  .logo-left {
    grid-column: 2;
    grid-row: 1;
    height: 56px;
  }

  .header-center {
    grid-column: 1 / -1;
    grid-row: 2;
    text-align: center;
    padding-top: 0.25rem;
  }

  .logo-right {
    grid-column: 4;
    grid-row: 1;
    height: 56px;
    justify-content: flex-end;
  }

  .logo-left img {
    height: 52px;
    max-height: 52px;
  }

  .logo-right img {
    height: 36px;
    max-height: 36px;
  }

  .header-center h1 {
    font-size: clamp(0.75rem, 2.5vw, 1rem);
    line-height: 1.25;
  }
}

@media (max-width: 767px) {
  .header-center h1 {
    font-size: 0.8rem;
  }
}
</style>
