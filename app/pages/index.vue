<script setup>
import { homeData } from "~/data/home"
import home from "@/gql/home.gql"

useHead({
  title: "INIQ » Instituto Nacional das Infra-Estruturas da Qualidade",
})

definePageMeta({
  layout: "default",
})

const { query } = useSquidex()
const data = await query(home, { key: "home" })

const leader = computed(
  () => data.value?.data.queryHomeresponsibleContents?.[0]?.data?.leader,
)
</script>

<template>
  <section>
    <CustomHomeHero :data="leader" />
  </section>
</template>
