<template>
  <div class="new-layout">
    <HeaderComponent />

    <div class="main-container">
      <SideBarComponent>
        <template #eyebrow>
          <slot name="sidebar-eyebrow" />
        </template>
        <template #title>
          <slot name="sidebar-title" />
        </template>
        <slot name="sidebar-content" />
      </SideBarComponent>

      <main class="center-content">
        <slot />
        <PartnerCarousel />
      </main>

      <NavigatorBarComponent />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from "~/Components/ui/HeaderComponent.vue"
import SideBarComponent from "~/Components/ui/SideBarComponent.vue"
import NavigatorBarComponent from "~/Components/ui/NavigatorBarComponent.vue"
import PartnerCarousel from "~/Components/ui/PartnerCarousel.vue"
</script>

<style scoped>
.new-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4f8 0%, #e9eff6 100%);
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

.center-content {
  padding: 2rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.center-content > :first-child {
  flex: 1;
}
</style>
