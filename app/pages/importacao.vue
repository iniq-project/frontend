<script setup lang="ts">
import { inject, watch, ref, computed } from "vue"
import gql from "@/gql/importacao/index.gql"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Validação, Verificação e Certificação de Produtos e Serviços",
})

const { query } = useSquidex()
const data = await query(gql, { key: "importacao" })

const leader = computed(
  () => data.value?.data?.queryHomeimportacaoContents?.[0]?.data?.leader,
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
