<script setup lang="ts">
import { computed } from "vue"

interface Item {
  title?: string
}

const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  listTitle: { type: String, default: "" },
  items: { type: Array as () => Item[], default: () => [] },
})

const requisitos = computed(() =>
  props.items.map((item, index) => ({
    num: String(index + 1).padStart(2, "0"),
    text: item.title || "",
  })),
)
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h2 v-if="title">{{ title }}</h2>
      <div v-if="description" class="description" v-html="description" />
    </div>

    <h3 v-if="listTitle">{{ listTitle }}</h3>
    <div v-if="requisitos.length" class="requisitos-list">
      <div v-for="requisito in requisitos" :key="requisito.num" class="requisito-item">
        <span class="requisito-num">{{ requisito.num }}</span>
        <span class="requisito-text">{{ requisito.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-panel {
  display: block !important;
  padding: 1.5rem 2rem 2rem;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.panel-head {
  margin-bottom: 1.5rem;
  max-width: 720px;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba9e0;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.panel-head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.panel-head h2 {
  font-size: 1.5rem;
  color: #0a3a63;
  margin: 0 0 0.75rem;
  font-weight: 700;
}

.panel-head .description,
.panel-head .description :deep(p) {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
  text-align: justify;
}

h3 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  color: #0a3a63;
  font-weight: 700;
}

.requisitos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.requisito-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  align-items: center;
}

.requisito-num {
  flex-shrink: 0;
  font-family: "Archivo", system-ui, sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #5cb947;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e6eff6;
}

.requisito-text {
  font-size: 1rem;
  color: #0a3a63;
  font-weight: 500;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .requisito-item {
    align-items: flex-start;
  }
}
</style>
