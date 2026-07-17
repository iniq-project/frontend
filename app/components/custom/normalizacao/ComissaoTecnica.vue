<script setup>
import { ref } from "vue"

const props = defineProps({
  comissoes: {
    type: Array,
    default: () => [],
  },
  normas: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["view-norma"])

const activeView = ref("info")

const normasDaComissao = (comissao) => {
  return comissao.normaReferences
    .map((reference) => props.normas.find((n) => n.reference === reference))
    .filter(Boolean)
}
</script>

<template>
  <div class="tab-panel">
    <div class="panel-head">
      <span class="eyebrow">Comissão Técnica</span>
      <h2>Comissões Técnicas de Normalização</h2>
    </div>

    <div class="view-toggle">
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'info' }"
        @click="activeView = 'info'"
      >
        Ver Informações
      </button>
      <button
        type="button"
        class="toggle-btn"
        :class="{ 'is-active': activeView === 'lista' }"
        @click="activeView = 'lista'"
      >
        Lista de Comissões Técnicas
      </button>
    </div>

    <div v-if="activeView === 'info'" class="info-block">
      <h3>Comissões Técnicas de Normalização (CT) — INIQ</h3>
      <p>
        As Comissões Técnicas de Normalização (CT) são os órgãos operacionais e permanentes do
        Instituto Nacional das Infra-Estruturas de Qualidade (INIQ) responsáveis por criar,
        analisar e atualizar as Normas Angolanas (NA). Funcionam sob a coordenação do
        Departamento de Normalização do INIQ, que atua como o Organismo Nacional de
        Normalização (ONN) de Angola.
      </p>

      <h4>1.1 Princípios Fundamentais</h4>
      <p>
        Para garantir a imparcialidade e a qualidade das normas, as CTs regem-se por três
        pilares do sistema internacional de normalização:
      </p>
      <ul class="info-list">
        <li><b>Consenso</b> — as decisões e aprovações de normas devem refletir o acordo geral entre as partes.</li>
        <li><b>Representatividade</b> — devem incluir todos os setores interessados na matéria.</li>
        <li><b>Paridade</b> — nenhum grupo de interesse individual pode dominar as decisões.</li>
      </ul>

      <h4>1.2 Composição de uma CT</h4>
      <p>
        Uma Comissão Técnica é um fórum de especialistas composto por representantes de vários
        setores da sociedade angolana:
      </p>
      <ul class="info-list">
        <li><b>Empresas e Indústria</b> — produtores, fabricantes e prestadores de serviços do setor.</li>
        <li><b>Entidades Públicas e Reguladores</b> — ministérios tutelares, ordens profissionais e reguladores de mercado.</li>
        <li><b>Academia e Investigação</b> — universidades, institutos superiores e laboratórios de ensaio.</li>
        <li><b>Defesa do Consumidor</b> — associações que salvaguardam os interesses do utilizador final.</li>
      </ul>
      <p>
        <b>Estrutura de Liderança:</b> cada comissão possui um Presidente (que modera os debates
        técnicos) e um Secretário Técnico (responsável pela gestão administrativa).
      </p>

      <h4>1.3 Principais Funções</h4>
      <ul class="info-list">
        <li><b>Elaborar e Adotar Normas</b> — redigir novos projetos de Normas Angolanas (NA) ou propor a adoção integrada de normas internacionais (como as normas ISO).</li>
        <li><b>Rever e Atualizar</b> — avaliar periodicamente se as normas vigentes continuam adequadas à evolução tecnológica e económica do país.</li>
        <li><b>Prestar Apoio Técnico</b> — esclarecer dúvidas do mercado e de instituições sobre a interpretação técnica das normas do seu setor.</li>
      </ul>

      <h4>1.4 Como Integrar uma Comissão Técnica?</h4>
      <p>
        O acesso às comissões é voluntário e baseia-se em dois fluxos principais, dependendo da
        iniciativa:
      </p>
      <ul class="info-list">
        <li><b>Convite Direto</b> — o INIQ mapeia os principais especialistas do mercado para uma determinada área e envia um convite oficial à instituição para indicar representantes (titular e suplente).</li>
        <li><b>Manifestação de Interesse</b> (sujeita a aprovação) — qualquer entidade pública ou privada, universidade ou especialista independente pode submeter um pedido formal ao INIQ para integrar uma CT ativa. A candidatura é avaliada e aprovada pelo ONN para garantir o equilíbrio e a competência técnica do grupo.</li>
      </ul>
      <p class="legal-note">
        <b>Nota de Enquadramento Legal:</b> o funcionamento do Sistema Angolano da Qualidade
        (SAQ) e das Comissões Técnicas é regulado pelos Decretos Presidenciais n.º 95/21
        (Estatuto Orgânico do INIQ) e n.º 164/21 (Regime Jurídico do SAQ).
      </p>
    </div>

    <div v-if="activeView === 'lista'" class="comissoes">
      <article class="comissao-item" v-for="comissao in comissoes" :key="comissao.id">
        <div class="comissao-head">
          <h3>{{ comissao.nome }}</h3>
          <span class="badge badge--sector badge--green">{{ comissao.sector }}</span>
        </div>
        <div class="comissao-lideranca">
          <span><b>Presidente:</b> {{ comissao.presidente }}</span>
          <span><b>Secretário Técnico:</b> {{ comissao.secretarioTecnico }}</span>
        </div>
        <div class="normas-publicadas">
          <span class="normas-label">Normas publicadas</span>
          <ul>
            <li
              v-for="norma in normasDaComissao(comissao)"
              :key="norma.reference"
            >
              <button
                type="button"
                class="norma-link"
                @click="emit('view-norma', norma.reference)"
              >
                <span class="norma-ref">{{ norma.reference }}</span>
                <span class="norma-title">{{ norma.title }}</span>
                <span
                  class="badge badge--estado"
                  :class="{ revogada: norma.estado === 'revogada' }"
                >
                  {{ norma.estado === "revogada" ? "Revogada" : "Em vigor" }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.tab-panel {
  display: block !important;
  padding: 1.5rem 2rem 2rem 2rem;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.panel-head {
  margin-bottom: 1.5rem;
}

.panel-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
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
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.toggle-btn {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: #0a3a63;
}

.toggle-btn.is-active {
  background: #0a3a63;
  border-color: #0a3a63;
  color: white;
}

.info-block {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.75rem 2rem;
}

.info-block h3 {
  margin: 0 0 1rem 0;
  color: #0a3a63;
  font-size: 1.3rem;
  font-weight: 700;
}

.info-block h4 {
  margin: 1.75rem 0 0.75rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.65rem;
}

.info-block h4:first-of-type {
  margin-top: 1.5rem;
}

.info-block p {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.7;
}

.info-list {
  list-style: none;
  margin: 0 0 0.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.info-list li {
  position: relative;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.info-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #5cb947;
  font-weight: bold;
}

.info-list li b,
.info-block p b {
  color: #0a3a63;
}

.legal-note {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e6eff6;
  font-size: 0.875rem;
  font-style: italic;
  color: #64748b;
}

.comissoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comissao-item {
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.comissao-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.comissao-head h3 {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.comissao-lideranca {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eff6;
  font-size: 0.875rem;
  color: #475569;
}

.comissao-lideranca b {
  color: #0a3a63;
}

.badge--sector {
  font-family: monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.badge--green {
  background: #eaf7e5;
  color: #5cb947;
}

.badge--estado {
  margin-left: auto;
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
}

.badge--estado.revogada {
  background: #fef2f2;
  color: #dc2626;
}

.normas-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.normas-publicadas ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.norma-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.85rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.norma-link:hover {
  border-color: #2ba9e0;
  background: #eff6fc;
}

.norma-ref {
  font-family: monospace;
  font-size: 0.85rem;
  color: #64748b;
  flex-shrink: 0;
}

.norma-title {
  color: #0a3a63;
  font-size: 0.9rem;
  font-weight: 600;
  flex: 1;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .info-block {
    padding: 1.5rem;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }

  .toggle-btn {
    flex: 1 1 auto;
    text-align: center;
  }

  .norma-link {
    flex-wrap: wrap;
  }

  .badge--estado {
    margin-left: 0;
  }

  .comissao-lideranca {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
