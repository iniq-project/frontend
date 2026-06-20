<template>
  <div class="partner-carousel">
    <button class="carousel-btn prev" @click="scrollLeft">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
      </svg>
    </button>
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentPosition}px)` }">
        <div class="partner-slide" v-for="(partner, index) in allPartners" :key="index">
          <img :src="partner.img" :alt="partner.name" />
        </div>
      </div>
    </div>
    <button class="carousel-btn next" @click="scrollRight">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const partners = [
  { img: '/parceiros/abnt-logot.png', name: 'ABNT' },
  { img: '/parceiros/astmlogot.png', name: 'ASTM' },
  { img: '/parceiros/codex-logot.jpg', name: 'Codex' },
  { img: '/parceiros/iec-logot.jpg', name: 'IEC' },
  { img: '/parceiros/intilogot.png', name: 'INIL' },
  { img: '/parceiros/ipqlogot.png', name: 'IPQ' },
  { img: '/parceiros/iso-logot.png', name: 'ISO' },
  { img: '/parceiros/logo_sadcas.png', name: 'SADCAS' },
  { img: '/parceiros/oilmlogote.jpg', name: 'OIML' },
  { img: '/parceiros/sadclogot.png', name: 'SADC' },
  { img: '/parceiros/sadecstanlogot.png', name: 'SADCESTAN' }
]

const allPartners = ref([...partners, ...partners])
const currentPosition = ref(0)
const slideWidth = 280
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

onMounted(() => {
  maxPosition.value = partners.length * slideWidth
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style scoped>
.partner-carousel {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  padding: 2rem 0;
  margin-top: 3rem;
  border-radius: 12px;
}

.carousel-container {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  width: fit-content;
}

.partner-carousel:hover {
  gap: 1rem;
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

.partner-slide {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 200px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.partner-slide:hover {
  opacity: 1;
}

.partner-slide img {
  height: 100%;
  width: auto;
  max-width: 200px;
  object-fit: contain;
}
</style>
