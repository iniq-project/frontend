<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const partners = computed(() => props.data?.brands || [])

const allPartners = computed(() => [...partners.value, ...partners.value])

const currentPosition = ref(0)
const slideWidth = 200
const maxPosition = ref(0)
let autoScrollInterval: any = null

const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    currentPosition.value += 1
    if (currentPosition.value >= maxPosition.value) {
      currentPosition.value = 0
    }
  }, 30)
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

const scrollLeft = () => {
  currentPosition.value = Math.max(0, currentPosition.value - slideWidth)
}

const scrollRight = () => {
  currentPosition.value = Math.min(maxPosition.value, currentPosition.value + slideWidth)
}

watch(partners, (newPartners) => {
  maxPosition.value = newPartners.length * slideWidth
}, { immediate: true })

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<template>
  <div class="partner-carousel">
    <div class="parceiro-label">PARCEIROS:</div>
    <button class="carousel-btn prev" @click="scrollLeft">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
      </svg>
    </button>
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentPosition}px)` }">
        <a
          class="partner-slide"
          v-for="(partner, index) in allPartners"
          :key="index"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="partner.logo?.[0]?.url" :alt="`Parceiro ${index + 1}`" />
        </a>
      </div>
    </div>
    <button class="carousel-btn next" @click="scrollRight">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.partner-carousel {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.90rem;
  background: transparent;
  padding: 3rem 2rem;
  margin-top: 0;
  border-radius: 12px;
  position: relative;
  z-index: 10;
  min-height: 200px;
  flex: 1;
  height: 100%;
}

.parceiro-label {
  font-family: 'Archivo', system-ui, sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #0a3a63;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 90px;
  padding: 0 1rem;
  border-right: 2px solid #e9eff6;
  margin-right: 1rem;
}

.carousel-container {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 0.10rem;
  transition: transform 0.5s ease;
  width: fit-content;
}

.partner-carousel:hover {
  gap: 0.90rem;
}

.carousel-btn {
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
  padding: 0;
}

.carousel-btn:hover {
  color: #0a3a63;
}

.carousel-btn svg {
  width: 32px;
  height: 32px;
}

a.partner-slide {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 200px;
  opacity: 0.7;
  transition: opacity 0.3s;
  text-decoration: none;
}

a.partner-slide:hover {
  opacity: 1;
}

.partner-slide img {
  max-height: 75px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
}

@media (max-width: 1199px) {
  .partner-carousel {
    padding: 1.5rem 1rem;
    min-height: 140px;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
  }

  .carousel-btn svg {
    width: 24px;
    height: 24px;
  }

  a.partner-slide {
    width: 160px;
    height: 72px;
  }

  .partner-slide img {
    max-height: 56px;
    max-width: 140px;
  }
}

@media (max-width: 767px) {
  .partner-carousel {
    gap: 0.5rem;
    padding: 1.25rem 0.75rem;
  }

  a.partner-slide {
    width: 130px;
    height: 64px;
  }

  .partner-slide img {
    max-height: 48px;
    max-width: 110px;
  }
}
</style>
