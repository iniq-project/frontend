<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
    <div class="combined-card">
      <div class="dg-top">
        <div class="dg-photo-wrapper">
          <img
            class="dg-photo"
            src="/chefe-metrologia.png"
            alt="Chefe do Departamento de Metrologia"
          />
          <div class="dg-details">
            <h3>Eng.º António Bengui</h3>
            <p class="role">Chefe do Departamento de Metrologia</p>
          </div>
        </div>
        <div class="dg-message">
          <h4>Mensagem do Responsável</h4>
          <p>
            “Medições fiáveis são a base do comércio justo e da indústria. Asseguramos a rastreabilidade de cada medição ao Sistema Internacional de Unidades.”
          </p>
        </div>
      </div>

      <div class="quality-policy-section">
        <h4>Política de Qualidade para Metrologia</h4>
        <p>
          O INIQ compromete-se a garantir a fiabilidade e rastreabilidade das medições em Angola, alinhando-se com os padrões internacionais (BIPM, OIML) e promovendo a confiança no mercado, a proteção do consumidor e a competitividade industrial, com foco na melhoria contínua e excelência.
        </p>
      </div>
      <section class="mt-12">
        <div class="container">
          <div class="panel-head">
            <span class="eyebrow">Serviços</span>
            <h2>Serviços de metrologia ao seu dispor</h2>
          </div>
          <div class="mserv">
            <div class="mserv__item">
              <span class="chk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              <div><b>Calibração de instrumentos</b><p>Massa, volume, temperatura, pressão, dimensional e mais.</p></div>
            </div>
            <div class="mserv__item">
              <span class="chk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              <div><b>Verificação metrológica legal</b><p>Verificação inicial e periódica de instrumentos sujeitos a controlo.</p></div>
            </div>
            <div class="mserv__item">
              <span class="chk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              <div><b>Emissão de certificados</b><p>Certificados de calibração e de verificação com rastreabilidade ao SI.</p></div>
            </div>
            <div class="mserv__item">
              <span class="chk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              <div><b>Aprovação de modelo</b><p>Avaliação e aprovação de modelos de instrumentos de medição.</p></div>
            </div>
          </div>
 
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band">
            <div>
              <h2>Precisa de calibrar ou verificar instrumentos?</h2>
              <p>Contacte o Laboratório Nacional de Metrologia do INIQ e solicite um orçamento para os seus equipamentos.</p>
            </div>
            <div class="cta-band__actions">
              <NuxtLink to="/contactos" class="btn btn--ghost">Solicitar calibração</NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>


<style scoped>
.tab-panel {
  display: block !important;
}

.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
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
  padding: 1.5rem 2rem 0 2rem;
  border-top: 1px solid #e6eff6;
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

.tabs-bar {
  padding: 0 2rem;
  border-bottom: 1px solid #e6eff6;
}

.tabs {
  display: flex;
  gap: 0;
  border-bottom: none;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  margin-right: 2rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #0a3a63;
}

.tab-btn.is-active {
  color: #0a3a63;
  border-bottom-color: #5cb947;
}

.tab-btn .n {
  font-weight: 700;
  color: #5cb947;
  font-size: 1rem;
}

.tab-panel {
  padding: 1.5rem 2rem 2rem 2rem;
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

.panel-head p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
}

.catalog-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex: 1;
  min-width: 250px;
}

.catalog-search svg {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.catalog-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}

.catalog-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  border: 1px solid #d0d9e3;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
}

.chip:hover {
  border-color: #0a3a63;
}

.chip.is-active {
  background: #0a3a63;
  border-color: #0a3a63;
  color: white;
  font-weight: 600;
}

.catalog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.catalog-item {
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}

.catalog-item:hover {
  border-color: #2ba9e0;
}

.catalog-item-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.catalog-item-code {
  font-family: monospace;
  font-weight: 500;
  color: #64748b;
  font-size: 0.9rem;
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

.catalog-item-price {
  margin-left: auto;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-value {
  font-weight: 700;
  color: #0a3a63;
  font-size: 1.25rem;
}

.price-currency {
  font-size: 0.85rem;
  color: #64748b;
}

.catalog-item-title {
  margin: 0;
  color: #0a3a63;
  font-size: 1.15rem;
  font-weight: 700;
}

.btn--primary {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: #0a3a63;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--primary:hover {
  background: #082e4f;
}

.btn--green {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: #5cb947;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--green:hover {
  background: #4aa838;
}

.btn--ghost {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #d0d9e3;
  background: white;
  color: #0a3a63;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}

.consulta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.consulta-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.consulta-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.consulta-code {
  font-family: monospace;
  font-weight: 600;
  color: #0a3a63;
  font-size: 0.9rem;
}

.consulta-item h3 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.1rem;
  font-weight: 700;
}

.consulta-desc {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

.consulta-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
}

.consulta-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
  border-radius: 3px;
}

.consulta-deadline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
  min-width: 200px;
}

.deadline-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  background: #eff6fc;
  color: #0a3a63;
  font-weight: 600;
  font-size: 0.9rem;
}

.deadline-pill.urgent {
  background: #fef2f2;
  color: #dc2626;
}

/* Modal Styles */
.modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: none;
}

.modal.open {
  display: block;
}

.modal-scrim {
  position: absolute;
  inset: 0;
  background: rgba(16, 33, 48, 0.55);
  backdrop-filter: blur(3px);
}

.modal-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 24px 56px -18px rgba(10, 58, 99, 0.3),
    0 8px 20px -10px rgba(16, 33, 48, 0.12);
}

.modal-head {
  position: sticky;
  top: 0;
  background: white;
  padding: 24px 28px 18px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  z-index: 2;
}

.modal-head .eyebrow {
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

.modal-head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.modal-head h3 {
  font-size: 22px;
  margin: 0;
  color: #0a3a63;
}

.modal-ref {
  font-family: monospace;
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
}

.modal-close {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #64748b;
}

.modal-close:hover {
  border-color: #2ba9e0;
  color: #0a3a63;
}

.modal-body {
  padding: 24px 28px 28px;
}

.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 7px;
  color: #475569;
}

.field label .req {
  color: #dc2626;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d0d9e3;
  border-radius: 6px;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(27, 143, 214, 0.15);
}

.field textarea {
  resize: vertical;
  min-height: 84px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pay-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.pay-opt {
  border: 1.5px solid #d0d9e3;
  border-radius: 6px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: 0.15s;
}

.pay-opt:hover {
  border-color: #2ba9e0;
}

.pay-opt input {
  width: auto;
  margin-top: 3px;
  accent-color: #0a3a63;
}

.pay-opt.sel {
  border-color: #0a3a63;
  background: #eff6fc;
}

.pay-opt b {
  font-size: 14.5px;
  font-family: "Archivo", system-ui, sans-serif;
  display: block;
  color: #0a3a63;
}

.pay-opt span:last-child {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 2px;
  display: block;
}

.modal-foot {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  flex-wrap: wrap;
}

.modal-success {
  text-align: center;
  padding: 20px 10px 6px;
  display: block;
}

.modal-success .ok {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(52, 161, 63, 0.13);
  color: #34a13f;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
}

.modal-success .ok svg {
  width: 36px;
  height: 36px;
}

.modal-success h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #0a3a63;
}

.modal-success p {
  color: #475569;
  max-width: 420px;
  margin: 0 auto;
}

.order-ref {
  display: inline-block;
  font-family: monospace;
  font-size: 14px;
  color: #0a3a63;
  background: #eff6fc;
  border: 1px dashed #d0d9e3;
  border-radius: 6px;
  padding: 12px 20px;
  margin: 22px 0;
}
</style>
