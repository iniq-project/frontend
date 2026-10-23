<script setup lang="ts">
defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  buttonText: { type: String, default: "Candidatar-me" },
})

const emit = defineEmits(["candidatar"])
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h2 v-if="title">{{ title }}</h2>
      <div v-if="description" class="description" v-html="description" />
    </div>

    <button type="button" class="btn btn--primary" @click="emit('candidatar')">
      {{ buttonText || "Candidatar-me" }}
    </button>
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
  margin-bottom: 1.75rem;
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

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
