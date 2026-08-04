<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  groups: {
    type: Array,
    default: () => [],
  },
  itemLabel: {
    type: String,
    default: "itens",
  },
})

const emit = defineEmits(["select"])

const searchTerm = ref("")

const filteredGroups = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return props.groups
  return props.groups.filter((g) => g.name.toLowerCase().includes(term))
})
</script>

<template>
  <div class="category-browser">
    <div class="category-search" v-if="groups.length > 4">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Pesquisar categoria…"
        aria-label="Pesquisar categoria"
      />
    </div>

    <p v-if="!filteredGroups.length" class="empty-state">
      Nenhuma categoria encontrada.
    </p>

    <div class="category-tiles">
      <button
        type="button"
        class="category-tile"
        v-for="group in filteredGroups"
        :key="group.name"
        @click="emit('select', group.name)"
      >
        <span class="category-tile-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
            <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"></circle>
          </svg>
        </span>
        <span class="category-tile-body">
          <span class="category-tile-name">{{ group.name }}</span>
          <span class="category-tile-count">{{ group.count }} {{ itemLabel }}</span>
        </span>
        <svg class="category-tile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-browser {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.category-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  max-width: 360px;
}

.category-search svg {
  width: 20px;
  height: 20px;
  color: #64748b;
  flex-shrink: 0;
}

.category-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}

.empty-state {
  color: #64748b;
  font-size: 0.95rem;
  padding: 1.5rem 0;
}

.category-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.category-tile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: white;
  border: 1px solid #d8e0ea;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(10, 58, 99, 0.05);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.category-tile:hover {
  border-color: #2ba9e0;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(10, 58, 99, 0.1);
}

.category-tile-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  color: white;
}

.category-tile-icon svg {
  width: 22px;
  height: 22px;
}

.category-tile-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.category-tile-name {
  color: #0a3a63;
  font-size: 1.1rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-tile-count {
  align-self: flex-start;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: #5cb947;
  background: #eaf7e5;
  padding: 0.15rem 0.6rem;
  border-radius: 100px;
}

.category-tile-arrow {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: #cbd5e1;
  transition: all 0.2s;
}

.category-tile:hover .category-tile-arrow {
  color: #2ba9e0;
  transform: translateX(3px);
}

@media (max-width: 767px) {
  .category-tiles {
    grid-template-columns: 1fr;
  }

  .category-search {
    max-width: 100%;
  }
}
</style>
