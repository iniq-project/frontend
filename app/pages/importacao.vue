<script setup lang="ts">
import { inject, watch, ref, computed, type Ref } from "vue"
import gql from "@/gql/importacao/index.gql"
import validacaoQuery from "@/gql/importacao/validacao.gql"
import verificacaoQuery from "@/gql/importacao/verificacao.gql"
import certificacaoQuery from "@/gql/importacao/certificacao.gql"
import { readImportacaoProcesso } from "@/utils/importacao-processo"

definePageMeta({
  layout: "default",
})

useHead({
  title: "INIQ » Validação, Verificação e Certificação de Produtos e Serviços",
})

const { query } = useSquidex()
const [data, validacaoData, verificacaoData, certificacaoData] = await Promise.all([
  query(gql, { key: "importacao" }),
  query(validacaoQuery, { key: "importacaovalidacao" }),
  query(verificacaoQuery, { key: "importacaoverificacao" }),
  query(certificacaoQuery, { key: "importacaocertificacao" }),
])

const leader = computed(
  () => data.value?.data?.queryHomeimportacaoContents?.[0]?.data?.leader,
)

const validacao = computed(
  () => validacaoData.value?.data?.queryImportacaovalidacaoContents?.[0]?.data,
)

const verificacao = computed(
  () => verificacaoData.value?.data?.queryImportacaoverificacaoContents?.[0]?.data,
)

const certificacao = computed(
  () => certificacaoData.value?.data?.queryImportacaocertificacaoContents?.[0]?.data,
)

const candidaturaAberta = ref(false)

const route = useRoute()
const activeSubItemId = inject<Ref<string | null>>("activeSubItemId")
const activeTab = ref<string | null>(null)
const isSubItemSelected = ref(false)

watch(
  [() => activeSubItemId?.value ?? null, () => route.query.processo],
  ([injected, query]) => {
    const next = readImportacaoProcesso(injected) || readImportacaoProcesso(query)
    isSubItemSelected.value = !!next
    activeTab.value = next
    candidaturaAberta.value = false
  },
  { immediate: true },
)
</script>

<template>
  <div class="combined-card">
    <template v-if="!isSubItemSelected">
      <CustomHero :data="leader" />
    </template>

    <CustomImportacaoValidacao
      v-if="activeTab === 'validacao'"
      :eyebrow="validacao?.eyebrow"
      :title="validacao?.title"
      :description="validacao?.description"
      :list-title="validacao?.listTitle"
      :items="validacao?.items || []"
    />

    <CustomImportacaoVerificacao
      v-if="activeTab === 'verificacao'"
      :eyebrow="verificacao?.eyebrow"
      :title="verificacao?.title"
      :description="verificacao?.description"
      :button-text="verificacao?.buttonText"
      @candidatar="candidaturaAberta = true"
    />

    <CustomImportacaoCertificacao
      v-if="activeTab === 'certificacao'"
      :eyebrow="certificacao?.eyebrow"
      :title="certificacao?.title"
      :description="certificacao?.description"
      :steps="certificacao?.steps || []"
    />

    <CustomImportacaoCandidaturaModal
      :open="candidaturaAberta"
      @close="candidaturaAberta = false"
    />
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}
</style>
