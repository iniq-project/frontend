<script setup>
import { homeData } from "~/data/home"

definePageMeta({
  layout: "default",
})

useHead({
  title: 'INIQ » Instituto Nacional das Infra-Estruturas da Qualidade',
})
</script>

<template>
  <section>
    <CustomHomeHero :data="homeData" />
  </section>
</template>
