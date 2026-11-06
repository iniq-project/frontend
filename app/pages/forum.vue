<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import gql from "@/gql/forum/index.gql"

definePageMeta({
  layout: "default",
})

await useServiceTitle("forum")

const { query } = useSquidex()
const data = await query(gql, { key: "forum" })

const leader = computed(
  () => data.value?.data?.queryHomeforumContents?.[0]?.data?.leader,
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
