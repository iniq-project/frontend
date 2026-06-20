<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
    <div class="combined-card">
      <div class="dg-top">
        <div class="dg-photo-wrapper">
          <img class="dg-photo" src="/director-geral.png" alt="Director-Geral" />
          <div class="dg-details">
            <h3>Carmo Adriana dos Santos</h3>
            <p class="role">Direcção-Geral</p>
            <p class="phone">+244 222 000 000</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Director-Geral</h4>
          <p>
            "A qualidade é o alicerce silencioso de uma economia diversificada e
            competitiva. No INIQ, trabalhamos para que cada produto e serviço em
            Angola corresponda a padrões reconhecidos, protegendo o consumidor e
            abrindo portas ao comércio internacional."
          </p>
        </div>
      </div>
      <div class="quality-policy-section">
        <h4>Política de Qualidade</h4>
        <p>
          O INIQ compromete-se a coordenar e desenvolver o Sistema Nacional da
          Qualidade de Angola, garantindo a conformidade com normas
          internacionais, promovendo a inovação, a competitividade empresarial e a
          proteção do consumidor, através de serviços de normalização, metrologia,
          acreditação e avaliação da conformidade, com foco na melhoria contínua e
          excelência.
        </p>
      </div>
    </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
  overflow: hidden;
}
.dg-top {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid #e6eff6;
}
.dg-photo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}
.dg-photo {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #5cb947;
  box-shadow: 0 4px 10px rgba(92, 185, 71, 0.15);
}
.dg-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}
.dg-details h3 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
}
.dg-details .role {
  margin: 0;
  font-size: 1rem;
  color: #5cb947;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.dg-details .phone {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}
.dg-message {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: flex-start;
}
.dg-message h4 {
  margin: 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #5cb947;
  padding-left: 0.75rem;
}
.dg-message p {
  margin: 0;
  font-size: 1.15rem;
  color: #334155;
  line-height: 1.7;
  font-style: italic;
  font-weight: 500;
}
.quality-policy-section {
  padding: 1.5rem 2rem 2rem 2rem;
}
.quality-policy-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.35rem;
  color: #0a3a63;
  font-weight: 700;
  border-left: 4px solid #2ba9e0;
  padding-left: 0.75rem;
}
.quality-policy-section p {
  margin: 0;
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.8;
}
</style>
