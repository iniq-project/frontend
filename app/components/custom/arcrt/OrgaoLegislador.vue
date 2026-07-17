<script setup></script>

<template>
  <div class="sub-panel">
    <div class="panel-head">
      <span class="eyebrow">Órgão Legislador</span>
      <h2>Quem elabora os Regulamentos Técnicos</h2>
      <p>
        A elaboração e publicação dos Regulamentos Técnicos em Angola é da
        responsabilidade do Departamento de Regulamentação Técnica do INIQ, em
        articulação com os ministérios sectoriais tutelares de cada área
        regulamentada. O INIQ coordena o processo técnico de elaboração,
        consulta pública e revisão periódica dos regulamentos, garantindo que
        reflectem os interesses de todas as partes envolvidas — indústria,
        entidades reguladoras, academia e consumidores — antes da sua aprovação
        e entrada em vigor.
      </p>
    </div>
  </div>
</template>

<style scoped>
.sub-panel {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.panel-head {
  margin-bottom: 0;
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
  margin: 0 0 0.75rem 0;
  font-weight: 700;
}

.panel-head p {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
}

.note {
  color: #94a3b8;
  font-size: 0.85rem;
  font-style: italic;
}

@media (max-width: 1199px) {
  .sub-panel {
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
