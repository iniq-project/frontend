<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import gql from "@/gql/premio-qualidade/index.gql"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » FIQ-CPLP / Fórum da I.E da Qualidade da CPLP",
})

const { query } = useSquidex()
const data = await query(gql, { key: "premio" })

const leader = computed(
  () => data.value?.data?.queryHomepremioqualidadeContents?.[0]?.data?.leader,
)

const activeSubItemId = inject("activeSubItemId")
const isSubItemSelected = ref(false)

if (activeSubItemId) {
  watch(
    activeSubItemId,
    (newId: unknown) => {
      isSubItemSelected.value = !!newId
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>
  </div>
</template>
