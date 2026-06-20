<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="combined-card">
    <div class="dg-top">
      <div class="dg-photo-wrapper">
        <img
          class="dg-photo"
          :src="data.director.foto"
          :alt="data.director.nome"
        />

        <div class="dg-details">
          <h3>{{ data.director.nome }}</h3>
          <p class="role">{{ data.director.cargo }}</p>
          <p class="phone">{{ data.director.telefone }}</p>
        </div>
      </div>

      <div class="dg-message">
        <h4>Mensagem do Director-Geral</h4>
        <p>"{{ data.mensagem }}"</p>
      </div>
    </div>

    <div class="quality-policy-section">
      <h4>{{ data.politicaQualidade.titulo }}</h4>
      <p>
        {{ data.politicaQualidade.descricao }}
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
