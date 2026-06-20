<script setup>
import { homeData } from "~/data/home"

definePageMeta({
  layout: "default",
})
</script>

<template>
  <section>
    <CustomHomeHero :data="homeData" />
  </section>
</template>
