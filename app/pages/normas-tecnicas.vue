<template>
  <div class="combined-card">
    <div class="dg-top">
      <div class="dg-photo-wrapper">
        <img
          class="dg-photo"
          src="/chefe-normalizacao.png"
          alt="Chefe do Departamento de Normalização"
        />
        <div class="dg-details">
          <h3>Dra. Inês Cabral</h3>
          <p class="role">Chefe do Departamento de Normalização</p>
        </div>
      </div>
      <div class="dg-message">
        <h4>Mensagem do Responsável</h4>
        <p>
          “A normalização é o ponto de partida da qualidade. Construímos, com as
          comissões técnicas, as referências que dão confiança ao mercado.”
        </p>
      </div>
    </div>

    <div class="quality-policy-section">
      <h4>Política de Qualidade para Normalização</h4>
      <p>
        O INIQ compromete-se a coordenar e desenvolver o sistema nacional de
        normalização de Angola, garantindo a conformidade com as melhores
        práticas internacionais, promovendo a participação transparente de todas
        as partes interessadas, e garantindo que as normas angolanas apoiem a
        inovação, a competitividade empresarial e a proteção do consumidor, com
        foco na melhoria contínua e excelência.
      </p>
    </div>

    <div class="tabs-bar">
      <div class="tabs">
        <button
          :class="['tab-btn', { 'is-active': activeTab === 'venda' }]"
          @click="activeTab = 'venda'"
        >
          <span class="n">01</span> Venda de Normas
        </button>
        <button
          :class="['tab-btn', { 'is-active': activeTab === 'consulta' }]"
          @click="activeTab = 'consulta'"
        >
          <span class="n">02</span> Projectos em Consulta Pública
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'venda'" class="tab-panel">
      <div class="panel-head">
        <span class="eyebrow">Venda de Normas</span>
        <h2>Catálogo nacional de normas</h2>
        <p>
          Pesquise as normas em vigor e solicite a sua aquisição. Ao clicar em
          <b>Solicitar</b>, abre-se o formulário de pedido com pagamento por
          Referência Multicaixa ou Multicaixa Express.
        </p>
      </div>

      <div class="catalog-toolbar">
        <div class="catalog-search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            placeholder="Pesquisar por referência ou título…"
            aria-label="Pesquisar normas"
          />
        </div>
        <div class="catalog-filter">
          <button class="chip is-active">Todos</button>
          <button class="chip">Alimentar</button>
          <button class="chip">Construção</button>
          <button class="chip">Ambiente</button>
          <button class="chip">Gestão</button>
        </div>
      </div>

      <div class="catalog">
        <div class="catalog-item" v-for="norma in normas" :key="norma.code">
          <div class="catalog-item-top">
            <div class="catalog-item-code">{{ norma.code }}</div>
            <span class="badge badge--sector badge--green">{{
              norma.sector
            }}</span>
            <div class="catalog-item-price">
              <span class="price-value">{{ formatPrice(norma.price) }}</span>
              <span class="price-currency">AOA</span>
            </div>
            <button class="btn btn--primary" @click="openModal('venda', norma)">
              Solicitar
            </button>
          </div>
          <h3 class="catalog-item-title">{{ norma.title }}</h3>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'consulta'" class="tab-panel">
      <div class="panel-head">
        <span class="eyebrow">Projectos-Normas em Consulta Pública</span>
        <h2>Participe na elaboração das normas</h2>
        <p>
          Os projectos abaixo estão em fase de consulta pública. Qualquer
          interessado pode submeter contribuições dentro do prazo indicado.
        </p>
      </div>
      <div class="consulta">
        <article
          class="consulta-item"
          v-for="projeto in projetosConsulta"
          :key="projeto.code"
        >
          <div>
            <div class="consulta-tags">
              <span class="consulta-code">{{ projeto.code }}</span>
              <span class="badge badge--sector">{{ projeto.sector }}</span>
            </div>
            <h3>{{ projeto.title }}</h3>
            <p class="consulta-desc">
              {{ projeto.description }}
            </p>
            <div class="consulta-bar">
              <span :style="{ width: projeto.progress + '%' }"></span>
            </div>
          </div>
          <div class="consulta-deadline">
            <span :class="['deadline-pill', { urgent: projeto.urgent }]"
              >Termina {{ projeto.deadline }}</span
            >
            <button
              class="btn btn--green"
              @click="openModal('contrib', projeto)"
            >
              Contribuir
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="modalOpen"
    class="modal"
    :class="{ open: modalOpen }"
    @click.self="closeModal"
  >
    <div class="modal-scrim" @click="closeModal"></div>
    <div
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div class="modal-head">
        <div>
          <span class="eyebrow" id="modalEyebrow">{{ modalEyebrow }}</span>
          <h3 id="modalTitle">{{ modalTitle }}</h3>
          <div class="modal-ref" id="modalRef">{{ modalRef }}</div>
        </div>
        <button class="modal-close" @click="closeModal" aria-label="Fechar">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="!formSubmitted" class="form-wrap" id="formWrap">
          <form @submit.prevent="handleSubmit">
            <div class="field-row">
              <div class="field">
                <label for="f-nome"
                  >Nome completo <span class="req">*</span></label
                >
                <input
                  type="text"
                  id="f-nome"
                  name="nome"
                  required
                  placeholder="Nome do requerente"
                  v-model="formData.nome"
                />
              </div>
              <div class="field">
                <label for="f-entidade">Entidade / Empresa</label>
                <input
                  type="text"
                  id="f-entidade"
                  name="entidade"
                  placeholder="Opcional"
                  v-model="formData.entidade"
                />
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="f-email">E-mail <span class="req">*</span></label>
                <input
                  type="email"
                  id="f-email"
                  name="email"
                  required
                  placeholder="nome@exemplo.ao"
                  v-model="formData.email"
                />
              </div>
              <div class="field">
                <label for="f-tel">Telefone <span class="req">*</span></label>
                <input
                  type="tel"
                  id="f-tel"
                  name="telefone"
                  required
                  placeholder="+244 9XX XXX XXX"
                  v-model="formData.telefone"
                />
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="f-nif">NIF / BI</label>
                <input
                  type="text"
                  id="f-nif"
                  name="nif"
                  placeholder="Para emissão de recibo"
                  v-model="formData.nif"
                />
              </div>
              <div class="field">
                <label for="f-formato"
                  >Formato <span class="req">*</span></label
                >
                <select
                  id="f-formato"
                  name="formato"
                  required
                  v-model="formData.formato"
                >
                  <option value="PDF (digital)">PDF (digital)</option>
                  <option value="Impresso">Impresso</option>
                  <option value="Digital + Impresso">Digital + Impresso</option>
                </select>
              </div>
            </div>
            <div v-if="modalMode === 'contrib'" class="field" id="contribField">
              <label for="f-contrib">A sua contribuição</label>
              <textarea
                id="f-contrib"
                name="contribuicao"
                placeholder="Indique o artigo/secção e a redacção alternativa proposta, com a respectiva fundamentação."
                v-model="formData.contribuicao"
              ></textarea>
            </div>
            <div v-if="modalMode === 'venda'" class="field" id="payField">
              <label>Meio de pagamento <span class="req">*</span></label>
              <div class="pay-options">
                <label
                  class="pay-opt"
                  :class="{
                    sel: formData.pagamento === 'Referência Multicaixa',
                  }"
                >
                  <input
                    type="radio"
                    name="pagamento"
                    value="Referência Multicaixa"
                    v-model="formData.pagamento"
                    checked
                  />
                  <span
                    ><b>Referência Multicaixa</b
                    ><span>Pague em ATM ou homebanking</span></span
                  >
                </label>
                <label
                  class="pay-opt"
                  :class="{ sel: formData.pagamento === 'Multicaixa Express' }"
                >
                  <input
                    type="radio"
                    name="pagamento"
                    value="Multicaixa Express"
                    v-model="formData.pagamento"
                  />
                  <span
                    ><b>Multicaixa Express</b
                    ><span>QR code ou link por SMS</span></span
                  >
                </label>
              </div>
            </div>
            <div class="field">
              <label for="f-obs">Observações</label>
              <textarea
                id="f-obs"
                name="observacoes"
                placeholder="Informação adicional (opcional)"
                v-model="formData.observacoes"
              ></textarea>
            </div>
            <div class="modal-foot">
              <button type="button" class="btn btn--ghost" @click="closeModal">
                Cancelar
              </button>
              <button type="submit" class="btn btn--primary" id="submitBtn">
                {{
                  modalMode === "contrib"
                    ? "Enviar contribuição"
                    : "Submeter pedido"
                }}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div v-if="formSubmitted" class="modal-success" id="successState">
          <div class="ok">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <h3 id="successTitle">{{ successTitle }}</h3>
          <p id="successMsg">{{ successMsg }}</p>
          <div class="order-ref" id="orderRef">{{ orderRef }}</div>
          <div class="modal-foot" style="justify-content: center">
            <button type="button" class="btn btn--primary" @click="closeModal">
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref("venda")
const modalOpen = ref(false)
const modalMode = ref("venda")
const modalEyebrow = ref("Venda de Normas")
const modalTitle = ref("Solicitar Norma")
const modalRef = ref("")
const formSubmitted = ref(false)
const successTitle = ref("Pedido submetido com sucesso")
const successMsg = ref(
  "Receberá por e-mail os dados de pagamento (Referência Multicaixa). Após confirmação, a norma fica imediatamente disponível na sua área reservada.",
)
const orderRef = ref("")

const normas = ref([
  {
    code: "NA 0042:2025",
    title: "Águas de consumo humano — Requisitos de qualidade",
    sector: "Ambiente",
    price: 12500,
  },
  {
    code: "NA 0309:2024",
    title: "Cimento Portland — Especificações e ensaios",
    sector: "Construção",
    price: 15000,
  },
  {
    code: "NA 0756:2023",
    title: "Segurança de brinquedos — Requisitos gerais",
    sector: "Gestão",
    price: 9800,
  },
])

const projetosConsulta = ref([
  {
    code: "prNA 1187:2026",
    title: "Rotulagem de produtos alimentares pré-embalados",
    sector: "Alimentar",
    description:
      "Requisitos de informação obrigatória, declaração nutricional e alergénios na rotulagem de géneros alimentícios.",
    deadline: "30 Jun 2026",
    progress: 62,
    urgent: false,
  },
  {
    code: "prNA 1402:2026",
    title: "Sistemas de gestão da qualidade — Fundamentos e vocabulário",
    sector: "Gestão",
    description:
      "Princípios, conceitos e terminologia de base para os sistemas de gestão da qualidade.",
    deadline: "15 Jul 2026",
    progress: 38,
    urgent: false,
  },
  {
    code: "prNA 0991:2026",
    title: "Blocos de betão para alvenaria — Requisitos",
    sector: "Construção",
    description:
      "Especificações dimensionais, resistência mecânica e métodos de ensaio para blocos de betão.",
    deadline: "12 Jun 2026",
    progress: 88,
    urgent: true,
  },
])

const formData = ref({
  nome: "",
  entidade: "",
  email: "",
  telefone: "",
  nif: "",
  formato: "PDF (digital)",
  contribuicao: "",
  pagamento: "Referência Multicaixa",
  observacoes: "",
})

const formatPrice = (price: number) => {
  return price.toLocaleString("pt-PT")
}

const openModal = (mode: string, item: any) => {
  modalMode.value = mode
  formSubmitted.value = false

  if (mode === "venda") {
    modalEyebrow.value = "Venda de Normas"
    modalTitle.value = "Solicitar Norma"
    modalRef.value = `${item.code} — ${item.title}`
    successTitle.value = "Pedido submetido com sucesso"
    successMsg.value = `Receberá por e-mail os dados de pagamento (${formData.value.pagamento}). Após confirmação, a norma fica imediatamente disponível na sua área reservada.`
  } else {
    modalEyebrow.value = "Consulta Pública"
    modalTitle.value = "Submeter Contribuição"
    modalRef.value = `${item.code} — ${item.title}`
    successTitle.value = "Contribuição enviada com sucesso"
    successMsg.value =
      "A sua contribuição foi registada e será analisada pela Comissão Técnica responsável. Receberá por e-mail o resultado do tratamento."
  }

  // Reset form
  formData.value = {
    nome: "",
    entidade: "",
    email: "",
    telefone: "",
    nif: "",
    formato: "PDF (digital)",
    contribuicao: "",
    pagamento: "Referência Multicaixa",
    observacoes: "",
  }

  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const handleSubmit = () => {
  // Generate reference
  const refNumber = Math.floor(10000 + Math.random() * 89999)
  orderRef.value = `REF: INIQ-2026-${refNumber}`
  formSubmitted.value = true
}
</script>

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
  padding: 1.5rem 2rem 1.5rem 2rem;
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
