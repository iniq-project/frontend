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
</script>

<template>
  <section>
    <CustomHomeHero :data="homeData" />
  </section>
</template>
