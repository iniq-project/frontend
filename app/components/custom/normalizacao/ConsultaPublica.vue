<script setup>
import { ref } from "vue"
import { useCategoryGroups } from "@/composables/useCategoryGroups"

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Participe na elaboração das normas",
  },
  description: {
    type: String,
    default:
      "Os projectos abaixo estão em fase de consulta pública. Qualquer interessado pode ler o documento do projecto e submeter contribuições dentro do prazo indicado, sem necessidade de conta ou autenticação.",
  },
})

const {
  groups,
  selectedCategory,
  itemsInCategory,
  selectCategory,
  backToCategories,
} = useCategoryGroups(() => props.projects, "sector")

const viewMode = ref("list")
const selectedProject = ref(null)

const commentForm = ref({ nome: "", email: "", telefone: "", comentario: "" })
const commentErrors = ref({})
const commentSubmitted = ref(false)

const resetCommentForm = () => {
  commentForm.value = { nome: "", email: "", telefone: "", comentario: "" }
  commentErrors.value = {}
  commentSubmitted.value = false
}

const openDetail = (project) => {
  selectedProject.value = project
  viewMode.value = "detail"
  resetCommentForm()
}

const backToList = () => {
  viewMode.value = "list"
  selectedProject.value = null
}

const validateComment = () => {
  const newErrors = {}
  if (!commentForm.value.nome.trim()) newErrors.nome = true
  if (
    !commentForm.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentForm.value.email)
  ) {
    newErrors.email = true
  }
  if (!commentForm.value.telefone.trim()) newErrors.telefone = true
  if (!commentForm.value.comentario.trim()) newErrors.comentario = true
  commentErrors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleCommentSubmit = () => {
  if (!validateComment()) return
  commentSubmitted.value = true
}
</script>

<template>
  <div class="tab-panel">
    <template v-if="viewMode === 'list' && !selectedCategory">
      <div class="panel-head">
        <span class="eyebrow">Projectos de Normas em Consulta Pública</span>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <UiCategoryTiles
        :groups="groups"
        item-label="projectos"
        @select="selectCategory"
      />
    </template>

    <template v-else-if="viewMode === 'list' && selectedCategory">
      <button type="button" class="back-link" @click="backToCategories">
        ← Voltar às categorias
      </button>
      <div class="panel-head">
        <span class="eyebrow">{{ selectedCategory }}</span>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="consulta">
        <article
          class="consulta-item"
          v-for="project in itemsInCategory"
          :key="project.code"
        >
          <div>
            <div class="consulta-tags">
              <span class="consulta-code">{{ project.code }}</span>
              <span class="badge badge--sector badge--green">{{
                project.sector
              }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="consulta-desc">{{ project.description }}</p>
          </div>
          <div class="consulta-deadline">
            <span :class="['deadline-pill', { urgent: project.urgent }]">
              Termina {{ project.deadline }}
            </span>
            <button class="btn btn--green" @click="openDetail(project)">
              Ver projecto
            </button>
          </div>
        </article>
      </div>
    </template>

    <template v-else-if="viewMode === 'detail' && selectedProject">
      <button type="button" class="back-link" @click="backToList">
        ← Voltar à lista
      </button>
      <div class="panel-head">
        <div class="consulta-tags">
          <span class="consulta-code">{{ selectedProject.code }}</span>
          <span class="badge badge--sector badge--green">{{
            selectedProject.sector
          }}</span>
          <span :class="['deadline-pill', { urgent: selectedProject.urgent }]">
            Termina {{ selectedProject.deadline }}
          </span>
        </div>
        <h2>{{ selectedProject.title }}</h2>
      </div>

      <div class="detail-grid" :class="{ 'no-document': !selectedProject.documentUrl }">
        <div class="document-panel">
          <h4>Documento do projecto</h4>
          <p class="documento-text">{{ selectedProject.documento }}</p>

          <template v-if="selectedProject.documentUrl">
            <div class="pdf-toolbar">
              <a :href="selectedProject.documentUrl" download class="btn btn--ghost btn--sm">
                Descarregar (PDF)
              </a>
              <a
                :href="selectedProject.documentUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--ghost btn--sm"
              >
                Abrir noutro separador
              </a>
            </div>
            <div class="pdf-frame">
              <UiPdfViewer :src="selectedProject.documentUrl" />
            </div>
          </template>
          <p v-else class="documento-caption">
            Documento ainda não foi carregado pela Comissão Técnica responsável.
          </p>
        </div>

        <div class="comment-panel">
          <h4>Submeter Contribuição</h4>

          <div v-if="!commentSubmitted" class="comment-form">
            <form @submit.prevent="handleCommentSubmit">
              <div class="field">
                <label for="cp-nome">Nome <span class="req">*</span></label>
                <input
                  type="text"
                  id="cp-nome"
                  placeholder="O seu nome"
                  v-model="commentForm.nome"
                  :class="{ error: commentErrors.nome }"
                />
                <span v-if="commentErrors.nome" class="error-text">Por favor, informe o seu nome</span>
              </div>
              <div class="field">
                <label for="cp-email">E-mail <span class="req">*</span></label>
                <input
                  type="email"
                  id="cp-email"
                  placeholder="nome@exemplo.com"
                  v-model="commentForm.email"
                  :class="{ error: commentErrors.email }"
                />
                <span v-if="commentErrors.email" class="error-text">Por favor, informe um e-mail válido</span>
              </div>
              <div class="field">
                <label for="cp-tel">Número de Telefone <span class="req">*</span></label>
                <input
                  type="tel"
                  id="cp-tel"
                  placeholder="+244 9XX XXX XXX"
                  v-model="commentForm.telefone"
                  :class="{ error: commentErrors.telefone }"
                />
                <span v-if="commentErrors.telefone" class="error-text">Por favor, informe o número de telefone</span>
              </div>
              <div class="field">
                <label for="cp-comentario">Comentário <span class="req">*</span></label>
                <textarea
                  id="cp-comentario"
                  rows="8"
                  placeholder="Indique o artigo/secção e a redacção alternativa proposta, com a respectiva fundamentação."
                  v-model="commentForm.comentario"
                  :class="{ error: commentErrors.comentario }"
                ></textarea>
                <span v-if="commentErrors.comentario" class="error-text">Por favor, escreva o seu comentário</span>
              </div>
              <button type="submit" class="btn btn--green btn--block">
                Enviar contribuição
              </button>
            </form>
          </div>

          <div v-else class="comment-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <h5>Contribuição enviada com sucesso</h5>
            <p>
              A sua contribuição foi registada e será analisada pela Comissão Técnica responsável.
              Receberá por e-mail o resultado do tratamento.
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
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

.panel-head p {
  margin: 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
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
  align-items: center;
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

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0a3a63;
  text-decoration: underline;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.back-link:hover {
  color: #5cb947;
}

.documento-text {
  margin: 0 0 1rem 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.7;
  white-space: pre-line;
}

.documento-caption {
  margin: 0.5rem 0 0 0;
  color: #64748b;
  font-size: 0.85rem;
  font-style: italic;
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
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn--ghost:hover {
  border-color: #2ba9e0;
}

.btn--sm {
  padding: 0.5rem 0.9rem;
  font-size: 0.85rem;
}

.btn--block {
  width: 100%;
  justify-content: center;
  display: flex;
}

.detail-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1.5rem;
  align-items: start;
}

.detail-grid.no-document {
  grid-template-columns: 1fr;
  max-width: 560px;
}

.document-panel,
.comment-panel {
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  min-width: 0;
}

.document-panel {
  overflow: hidden;
}

.document-panel h4,
.comment-panel h4 {
  margin: 0 0 0.75rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
  font-weight: 700;
}

.pdf-toolbar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.pdf-frame {
  width: 100%;
  height: 70vh;
  min-height: 420px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #d0d9e3;
  border-radius: 8px;
  background: white;
}

.comment-form .field {
  margin-bottom: 1rem;
}

.comment-form label {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: #475569;
}

.comment-form label .req {
  color: #dc2626;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #d0d9e3;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.9rem;
  color: #0f172a;
  background: white;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.comment-form textarea {
  resize: vertical;
  min-height: 180px;
}

.comment-form input.error,
.comment-form textarea.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.comment-form input:focus,
.comment-form textarea:focus {
  outline: none;
  border-color: #2ba9e0;
  box-shadow: 0 0 0 3px rgba(27, 143, 214, 0.15);
}

.error-text {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: #dc2626;
  font-weight: 500;
}

.comment-success {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.comment-success svg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(52, 161, 63, 0.13);
  color: #34a13f;
  padding: 12px;
  margin-bottom: 0.75rem;
}

.comment-success h5 {
  margin: 0 0 0.5rem 0;
  color: #0a3a63;
  font-size: 1.05rem;
}

.comment-success p {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 1199px) {
  .tab-panel {
    padding: 1.25rem 1rem 1.5rem;
  }

  .consulta-item {
    flex-direction: column;
    gap: 1rem;
  }

  .consulta-deadline {
    align-items: flex-start;
    min-width: 0;
    width: 100%;
  }

  .consulta-deadline .btn--green {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid.no-document {
    max-width: 100%;
  }

  .pdf-frame {
    height: 60vh;
    min-height: 320px;
  }
}

@media (max-width: 767px) {
  .panel-head h2 {
    font-size: 1.25rem;
  }
}
</style>
