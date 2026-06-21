<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'INIQ » Contactos',
})

const formSubmitted = ref(false)
const formData = ref({
  nome: '',
  entidade: '',
  email: '',
  telefone: '',
  assunto: '',
  mensagem: ''
})

function handleSubmit() {
  formSubmitted.value = true
  formData.value = {
    nome: '',
    entidade: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  }
}
</script>

<template>
  <div class="combined-card">
    <section class="section">
      <div class="container">
        <div class="ct-quick">
          <div class="ct-quick__item">
            <div class="ct-quick__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path>
              </svg>
            </div>
            <h3>Telefone</h3>
            <p><a href="tel:+244222000000">+244 222 000 000</a><br>+244 923 000 000</p>
          </div>
          <div class="ct-quick__item">
            <div class="ct-quick__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m3 7 9 6 9-6"></path>
              </svg>
            </div>
            <h3>E-mail</h3>
            <p><a href="mailto:geral@iniq.gov.ao">geral@iniq.gov.ao</a><br><a href="mailto:normas@iniq.gov.ao">normas@iniq.gov.ao</a></p>
          </div>
          <div class="ct-quick__item">
            <div class="ct-quick__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Sede</h3>
            <p>Edifício Palácio do Vidro, Largo 17 de Setembro n.º 7 — 5.º Andar, Luanda</p>
          </div>
        </div>

        <div class="ct-grid2">
          <div class="ct-form">
            <h2>Envie-nos uma mensagem</h2>
            <p>
              Preencha o formulário e a equipa do INIQ responderá com a maior brevidade. Os campos marcados com
              <span style="color:#c0392b;">*</span> são obrigatórios.
            </p>

            <div v-if="formSubmitted" class="ct-sent show">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <span><b>Mensagem enviada.</b> Obrigado pelo seu contacto — responderemos por e-mail brevemente.</span>
            </div>

            <form v-else @submit.prevent="handleSubmit" novalidate>
              <div class="field-row">
                <div class="field">
                  <label for="c-nome">Nome completo <span class="req">*</span></label>
                  <input type="text" id="c-nome" name="nome" required placeholder="O seu nome" v-model="formData.nome" />
                </div>
                <div class="field">
                  <label for="c-entidade">Entidade / Empresa</label>
                  <input type="text" id="c-entidade" name="entidade" placeholder="Opcional" v-model="formData.entidade" />
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="c-email">E-mail <span class="req">*</span></label>
                  <input type="email" id="c-email" name="email" required placeholder="nome@exemplo.ao" v-model="formData.email" />
                </div>
                <div class="field">
                  <label for="c-tel">Telefone</label>
                  <input type="tel" id="c-tel" name="telefone" placeholder="+244 9XX XXX XXX" v-model="formData.telefone" />
                </div>
              </div>
              <div class="field">
                <label for="c-assunto">Assunto <span class="req">*</span></label>
                <select id="c-assunto" name="assunto" required v-model="formData.assunto">
                  <option value="">Seleccione um assunto…</option>
                  <option>Normas Técnicas / Normalização</option>
                  <option>Metrologia</option>
                  <option>Acreditação / Registo</option>
                  <option>Certificação de produtos a importar</option>
                  <option>Formação e Certificação</option>
                  <option>Prémio Nacional da Qualidade</option>
                  <option>Imprensa / Comunicação</option>
                  <option>Outro assunto</option>
                </select>
              </div>
              <div class="field">
                <label for="c-msg">Mensagem <span class="req">*</span></label>
                <textarea id="c-msg" name="mensagem" required placeholder="Descreva o seu pedido…" style="min-height:130px;" v-model="formData.mensagem"></textarea>
              </div>
              <div class="modal__foot" style="justify-content:flex-start;">
                <button type="submit" class="btn btn--primary">
                  Enviar mensagem
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div class="ct-info">
            <div class="ct-info__card">
              <h3>Instituto Nacional das Infra-Estruturas da Qualidade</h3>
              <div class="ct-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div><div class="k">Morada</div><div class="v">Edifício Palácio do Vidro<br>Largo 17 de Setembro, n.º 7 — 5.º Andar<br>Luanda · República de Angola</div></div>
              </div>
              <div class="ct-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path>
                </svg>
                <div><div class="k">Telefone</div><div class="v"><a href="tel:+244222000000">+244 222 000 000</a></div></div>
              </div>
              <div class="ct-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3 7 9 6 9-6"></path>
                </svg>
                <div><div class="k">E-mail</div><div class="v"><a href="mailto:geral@iniq.gov.ao">geral@iniq.gov.ao</a></div></div>
              </div>
              <div class="ct-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 7v5l3 2"></path>
                </svg>
                <div><div class="k">Horário</div><div class="v">Segunda a Sexta · 08h00 — 15h30</div></div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top:clamp(48px,6vw,76px);">
          <div class="section-head" style="max-width:640px;">
            <span class="eyebrow">Direcções e serviços</span>
            <h2 style="font-size:clamp(24px,3vw,34px);">Contactos por área</h2>
          </div>
          <div class="ct-dept">
            <div class="dept">
              <h4>Normalização</h4>
              <div class="role">Normas técnicas · Comissões · Venda</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:normas@iniq.gov.ao">normas@iniq.gov.ao</a></p>
            </div>
            <div class="dept">
              <h4>Metrologia</h4>
              <div class="role">Calibração · Verificação</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:metrologia@iniq.gov.ao">metrologia@iniq.gov.ao</a></p>
            </div>
            <div class="dept">
              <h4>Avaliação da Conformidade</h4>
              <div class="role">Certificação · Importação</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:conformidade@iniq.gov.ao">conformidade@iniq.gov.ao</a></p>
            </div>
            <div class="dept">
              <h4>Formação</h4>
              <div class="role">Cursos · Certificação de competências</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:formacao@iniq.gov.ao">formacao@iniq.gov.ao</a></p>
            </div>
            <div class="dept">
              <h4>Comunicação e Imprensa</h4>
              <div class="role">Media · Eventos</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:comunicacao@iniq.gov.ao">comunicacao@iniq.gov.ao</a></p>
            </div>
            <div class="dept">
              <h4>Direcção-Geral</h4>
              <div class="role">Secretariado executivo</div>
              <p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><a href="mailto:dg@iniq.gov.ao">dg@iniq.gov.ao</a></p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="section section--tight" style="padding-top:0;">
      <div class="container">
        <div class="ct-map">
          <div class="ct-map__pin">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div><b>Sede do INIQ</b><span>Edifício Palácio do Vidro · Largo 17 de Setembro, Luanda</span></div>
          </div>
          <iframe title="Mapa — Sede do INIQ, Luanda" src="https://www.openstreetmap.org/export/embed.html?bbox=13.2200%2C-8.8200%2C13.2500%2C-8.8000&amp;layer=mapnik&amp;marker=-8.8100%2C13.2350" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.combined-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.08);
}

.section {
  padding: 2rem;
}

.section--tight {
  padding: 1rem 2rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.ct-quick {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ct-quick__item {
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 12px;
}

.ct-quick__ico {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #5cb947, #2ba9e0);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
}

.ct-quick__ico svg {
  width: 32px;
  height: 32px;
}

.ct-quick__item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #0a3a63;
  font-weight: 700;
}

.ct-quick__item p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.ct-quick__item a {
  color: #2ba9e0;
  text-decoration: none;
  font-weight: 500;
}

.ct-grid2 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.ct-form h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  color: #0a3a63;
  font-weight: 700;
}

.ct-form p {
  margin: 0 0 1.5rem 0;
  color: #475569;
}

.ct-sent {
  display: none;
  padding: 1.5rem;
  background: rgba(92, 185, 71, 0.1);
  border-radius: 10px;
  color: #2e7d32;
  gap: 1rem;
  align-items: flex-start;
}

.ct-sent.show {
  display: flex;
}

.ct-sent svg {
  width: 2rem;
  height: 2rem;
  flex: none;
}

.ct-sent b {
  display: block;
  font-size: 1.1rem;
}

.field {
  margin-bottom: 1.125rem;
}

.field label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.4375rem;
  color: #475569;
}

.field label .req {
  color: #c0392b;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 1px solid #d0d9e3;
  border-radius: 8px;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 0.9375rem;
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
  box-shadow: 0 0 0 3px rgba(43, 169, 224, 0.15);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal__foot {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: #0a3a63;
  color: white;
}

.btn--primary:hover {
  background: #082e4f;
}

.ct-info__card {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.ct-info__card h3 {
  margin: 0 0 1.25rem 0;
  font-size: 1.1rem;
  color: #0a3a63;
  font-weight: 700;
}

.ct-line {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
  align-items: flex-start;
}

.ct-line svg {
  width: 24px;
  height: 24px;
  color: #2ba9e0;
  margin-top: 0.125rem;
}

.ct-line .k {
  font-family: monospace;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.ct-line .v {
  color: #475569;
  line-height: 1.6;
}

.ct-line a {
  color: #2ba9e0;
  text-decoration: none;
  font-weight: 500;
}

.ct-hours h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #0a3a63;
  font-weight: 700;
}

.ct-hours__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e6eff6;
}

.ct-hours__row:last-child {
  border-bottom: none;
}

.ct-hours__row .d {
  font-weight: 600;
  color: #475569;
}

.ct-hours__row .h {
  font-weight: 600;
  color: #0a3a63;
}

.ct-hours__row .closed {
  font-family: monospace;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.section-head {
  margin-bottom: 1.5rem;
}

.section-head .eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba9e0;
  margin-bottom: 0.5rem;
}

.section-head .eyebrow::before {
  content: "";
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5cb947, #2ba9e0);
}

.section-head h2 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
}

.ct-dept {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.dept {
  background: #f8fafc;
  border: 1px solid #e6eff6;
  border-radius: 10px;
  padding: 1.25rem;
}

.dept h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  color: #0a3a63;
  font-weight: 700;
}

.dept .role {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.dept p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dept svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #2ba9e0;
}

.dept a {
  color: #2ba9e0;
  text-decoration: none;
  font-weight: 500;
}

.ct-map {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6eff6;
}

.ct-map iframe {
  width: 100%;
  height: 400px;
  border: none;
}

.ct-map__pin {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(10, 58, 99, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ct-map__pin svg {
  width: 2rem;
  height: 2rem;
  color: #2ba9e0;
}

.ct-map__pin b {
  display: block;
  color: #0a3a63;
  font-weight: 700;
}

.ct-map__pin span {
  display: block;
  color: #475569;
  font-size: 0.9rem;
}
</style>
