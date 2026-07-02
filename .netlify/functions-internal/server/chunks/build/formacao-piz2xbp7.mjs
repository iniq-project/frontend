import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _imports_0 } from './_virtual_public-vntoedhL.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "formacao",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "INIQ » Formação e Qualificação em Qualidade"
    });
    ref("catalogo");
    const modalOpen = ref(false);
    const modalMode = ref("detalhe");
    const formSubmitted = ref(false);
    const selectedCourse = ref(null);
    const courses = ref([
      {
        id: 1,
        title: "Gestão da Qualidade",
        category: "Qualidade",
        level: "Intermédio",
        duration: "24h",
        modality: "Online",
        startDate: "15 Jul 2026",
        price: 75e3,
        description: "Curso completo sobre sistemas de gestão da qualidade e normas ISO 9001.",
        modules: [
          "Introdução à Qualidade",
          "Normas ISO 9001",
          "Auditorias Internas",
          "Melhoria Contínua"
        ],
        instructor: "Dra. Maria Santos",
        instructorRole: "Especialista em Qualidade",
        thumbnail: "/cover-qualidade.jpg"
      },
      {
        id: 2,
        title: "Metrologia Aplicada",
        category: "Metrologia",
        level: "Básico",
        duration: "16h",
        modality: "Presencial",
        startDate: "22 Jul 2026",
        price: 6e4,
        description: "Fundamentos de metrologia e práticas de calibração.",
        modules: [
          "Princípios de Medição",
          "Instrumentos de Medição",
          "Incerteza de Medição",
          "Calibração"
        ],
        instructor: "Eng. António Bengui",
        instructorRole: "Chefe do Departamento de Metrologia",
        thumbnail: "/cover-metrologia.jpg"
      },
      {
        id: 3,
        title: "Normalização Técnica",
        category: "Normalização",
        level: "Intermédio",
        duration: "20h",
        modality: "Online",
        startDate: "29 Jul 2026",
        price: 65e3,
        description: "Processo de desenvolvimento e aplicação de normas técnicas.",
        modules: [
          "Introdução à Normalização",
          "Estrutura das Normas",
          "Comissões Técnicas",
          "Implementação de Normas"
        ],
        instructor: "Dra. Inês Cabral",
        instructorRole: "Chefe do Departamento de Normalização",
        thumbnail: "/cover-normalizacao.jpg"
      },
      {
        id: 4,
        title: "Segurança Alimentar",
        category: "Segurança Alimentar",
        level: "Avançado",
        duration: "32h",
        modality: "Híbrido",
        startDate: "05 Ago 2026",
        price: 95e3,
        description: "Normas HACCP e segurança alimentar na indústria.",
        modules: [
          "Princípios HACCP",
          "Análise de Riscos",
          "Controlo de Pontos Críticos",
          "Documentação e Auditorias"
        ],
        instructor: "Dra. Ana Paula",
        instructorRole: "Especialista em Segurança Alimentar",
        thumbnail: "/cover-sede.jpg"
      }
    ]);
    const formData = ref({
      nome: "",
      entidade: "",
      email: "",
      telefone: "",
      nif: "",
      pagamento: "Referência Multicaixa",
      observacoes: ""
    });
    const formatPrice = (price) => {
      return price.toLocaleString("pt-PT");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="combined-card" data-v-147c0e9e><div class="dg-top" data-v-147c0e9e><div class="dg-photo-wrapper" data-v-147c0e9e><img class="dg-photo"${ssrRenderAttr("src", _imports_0)} alt="Director-Geral" data-v-147c0e9e><div class="dg-details" data-v-147c0e9e><h3 data-v-147c0e9e>Carmo Adriana dos Santos</h3><p class="role" data-v-147c0e9e>Direcção-Geral</p></div></div><div class="dg-message" data-v-147c0e9e><h4 data-v-147c0e9e>Mensagem do Responsável</h4><p data-v-147c0e9e> “A formação é o pilar da qualidade. Capacitar os profissionais é garantir que os padrões são mantidos e a excelência é alcançada.” </p></div></div><div class="quality-policy-section" data-v-147c0e9e><h4 data-v-147c0e9e>Política de Formação</h4><p data-v-147c0e9e> O INIQ compromete-se a oferecer formação de qualidade, alinhada com as normas internacionais e as necessidades do mercado angolano, promovendo a capacitação técnica e o desenvolvimento profissional contínuo. </p></div><section class="mt-12" data-v-147c0e9e><div class="container" data-v-147c0e9e><div class="panel-head" style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-147c0e9e><span class="eyebrow" data-v-147c0e9e>Catálogo de Cursos</span><h2 data-v-147c0e9e>Escolha o seu curso</h2><p data-v-147c0e9e> Os cursos são geridos pelo INIQ e actualizados regularmente. Clique num curso para ver o programa completo e inscrever-se. </p></div><div class="catalog-toolbar" data-v-147c0e9e><div class="catalog-search" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-147c0e9e><circle cx="11" cy="11" r="7" data-v-147c0e9e></circle><path d="m21 21-4.3-4.3" data-v-147c0e9e></path></svg><input type="text" placeholder="Pesquisar cursos…" aria-label="Pesquisar cursos" data-v-147c0e9e></div><div class="catalog-filter" data-v-147c0e9e><button class="chip is-active" data-v-147c0e9e>Todas as áreas</button><button class="chip" data-v-147c0e9e>Qualidade</button><button class="chip" data-v-147c0e9e>Metrologia</button><button class="chip" data-v-147c0e9e>Normalização</button><button class="chip" data-v-147c0e9e>Segurança Alimentar</button></div></div><div class="course-grid" data-v-147c0e9e><!--[-->`);
      ssrRenderList(unref(courses), (course) => {
        _push(`<article class="course-card" data-v-147c0e9e><div class="course-thumb" data-v-147c0e9e><img${ssrRenderAttr("src", course.thumbnail)}${ssrRenderAttr("alt", course.title)} data-v-147c0e9e><div class="course-badges" data-v-147c0e9e><span class="course-category" data-v-147c0e9e>${ssrInterpolate(course.category)}</span><span class="course-level" data-v-147c0e9e>${ssrInterpolate(course.level)}</span></div></div><div class="course-body" data-v-147c0e9e><h3 class="course-title" data-v-147c0e9e>${ssrInterpolate(course.title)}</h3><p class="course-desc" data-v-147c0e9e>${ssrInterpolate(course.description)}</p><div class="course-meta" data-v-147c0e9e><div class="meta-item" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><rect x="3" y="4" width="18" height="18" rx="2" data-v-147c0e9e></rect><path d="M16 2v4M8 2v4M3 10h18" data-v-147c0e9e></path></svg><span data-v-147c0e9e>${ssrInterpolate(course.duration)}</span></div><div class="meta-item" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><circle cx="12" cy="12" r="10" data-v-147c0e9e></circle><path d="M12 6v6l4 2" data-v-147c0e9e></path></svg><span data-v-147c0e9e>${ssrInterpolate(course.modality)}</span></div></div><div class="course-footer" data-v-147c0e9e><div class="course-price" data-v-147c0e9e><span class="price-value" data-v-147c0e9e>${ssrInterpolate(formatPrice(course.price))}</span><span class="price-currency" data-v-147c0e9e>AOA</span></div><button class="btn btn--green" data-v-147c0e9e>Ver curso</button></div></div></article>`);
      });
      _push(`<!--]--></div></div></section></div>`);
      if (unref(modalOpen)) {
        _push(`<div class="${ssrRenderClass([{ open: unref(modalOpen) }, "modal"])}" data-v-147c0e9e><div class="modal__scrim" data-v-147c0e9e></div><div class="modal__panel modal__panel--wide" role="dialog" aria-modal="true" aria-labelledby="cdTitle" data-v-147c0e9e><button class="modal__close" aria-label="Fechar" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-147c0e9e><path d="M6 6l12 12M18 6 6 18" data-v-147c0e9e></path></svg></button>`);
        if (unref(modalMode) === "detalhe") {
          _push(`<div class="cd show" id="cdView" data-v-147c0e9e><div class="cd__hero" data-v-147c0e9e><img class="cd__hero-img"${ssrRenderAttr("src", unref(selectedCourse)?.thumbnail)}${ssrRenderAttr("alt", unref(selectedCourse)?.title)} data-v-147c0e9e></div><div class="cd__body" data-v-147c0e9e><h3 id="cdTitle" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.title)}</h3><p id="cdDesc" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.description)}</p><div class="cd__meta-grid" data-v-147c0e9e><div class="m" data-v-147c0e9e><div class="lab" data-v-147c0e9e>Duração</div><div class="val" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.duration)}</div></div><div class="m" data-v-147c0e9e><div class="lab" data-v-147c0e9e>Modalidade</div><div class="val" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.modality)}</div></div><div class="m" data-v-147c0e9e><div class="lab" data-v-147c0e9e>Início</div><div class="val" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.startDate)}</div></div><div class="m" data-v-147c0e9e><div class="lab" data-v-147c0e9e>Certificado</div><div class="val" data-v-147c0e9e>INIQ</div></div></div><h4 data-v-147c0e9e>Programa do curso</h4><ul class="cd__modules" data-v-147c0e9e><!--[-->`);
          ssrRenderList(unref(selectedCourse)?.modules, (module, idx) => {
            _push(`<li data-v-147c0e9e>${ssrInterpolate(module)}</li>`);
          });
          _push(`<!--]--></ul><h4 data-v-147c0e9e>O que está incluído</h4><ul class="cd__includes" data-v-147c0e9e><li data-v-147c0e9e><span class="chk" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M20 6 9 17l-5-5" data-v-147c0e9e></path></svg></span> Certificado oficial do INIQ </li><li data-v-147c0e9e><span class="chk" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M20 6 9 17l-5-5" data-v-147c0e9e></path></svg></span> Materiais e manual digital </li><li data-v-147c0e9e><span class="chk" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M20 6 9 17l-5-5" data-v-147c0e9e></path></svg></span> Formadores especialistas </li><li data-v-147c0e9e><span class="chk" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M20 6 9 17l-5-5" data-v-147c0e9e></path></svg></span> Avaliação e acompanhamento </li></ul><h4 data-v-147c0e9e>Formador</h4><div class="cd__instructor" data-v-147c0e9e><div class="av" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.instructor.charAt(0))}</div><div data-v-147c0e9e><b data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.instructor)}</b><span data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.instructorRole)}</span></div></div><div class="cd__cta" data-v-147c0e9e><div class="price" data-v-147c0e9e><span data-v-147c0e9e>${ssrInterpolate(formatPrice(unref(selectedCourse)?.price || 0))}</span><small data-v-147c0e9e>AOA</small></div><button class="btn btn--green" data-v-147c0e9e> Inscrever-se e pagar <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M5 12h14M13 6l6 6-6 6" data-v-147c0e9e></path></svg></button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(modalMode) === "inscricao") {
          _push(`<div class="modal__body" id="enrollView" data-v-147c0e9e><div class="modal__head" style="${ssrRenderStyle({ "padding": "0 0 18px", "position": "static" })}" data-v-147c0e9e><div data-v-147c0e9e><span class="eyebrow" data-v-147c0e9e>Inscrição</span><h3 id="enrollTitle" data-v-147c0e9e>Inscrição no curso</h3><div class="ref" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.title)}</div></div></div><form id="enrollForm" novalidate data-v-147c0e9e><div class="field-row" data-v-147c0e9e><div class="field" data-v-147c0e9e><label for="e-nome" data-v-147c0e9e>Nome completo <span class="req" data-v-147c0e9e>*</span></label><input type="text" id="e-nome" required placeholder="Nome do formando"${ssrRenderAttr("value", unref(formData).nome)} data-v-147c0e9e></div><div class="field" data-v-147c0e9e><label for="e-entidade" data-v-147c0e9e>Entidade / Empresa</label><input type="text" id="e-entidade" placeholder="Opcional"${ssrRenderAttr("value", unref(formData).entidade)} data-v-147c0e9e></div></div><div class="field-row" data-v-147c0e9e><div class="field" data-v-147c0e9e><label for="e-email" data-v-147c0e9e>E-mail <span class="req" data-v-147c0e9e>*</span></label><input type="email" id="e-email" required placeholder="nome@exemplo.ao"${ssrRenderAttr("value", unref(formData).email)} data-v-147c0e9e></div><div class="field" data-v-147c0e9e><label for="e-tel" data-v-147c0e9e>Telefone <span class="req" data-v-147c0e9e>*</span></label><input type="tel" id="e-tel" required placeholder="+244 9XX XXX XXX"${ssrRenderAttr("value", unref(formData).telefone)} data-v-147c0e9e></div></div><div class="field" data-v-147c0e9e><label for="e-nif" data-v-147c0e9e> NIF / BI <span class="hint" style="${ssrRenderStyle({ "display": "inline", "margin": "0" })}" data-v-147c0e9e>(para o recibo)</span></label><input type="text" id="e-nif" placeholder="Opcional"${ssrRenderAttr("value", unref(formData).nif)} data-v-147c0e9e></div><div class="field" data-v-147c0e9e><label data-v-147c0e9e>Meio de pagamento <span class="req" data-v-147c0e9e>*</span></label><div class="pay-options" data-v-147c0e9e><label class="${ssrRenderClass([{ sel: unref(formData).pagamento === "Referência Multicaixa" }, "pay-opt"])}" data-v-147c0e9e><input type="radio" name="epay" value="Referência Multicaixa"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).pagamento, "Referência Multicaixa")) ? " checked" : ""} checked data-v-147c0e9e><span data-v-147c0e9e><b data-v-147c0e9e>Referência Multicaixa</b><span data-v-147c0e9e>Pague em ATM ou homebanking</span></span></label><label class="${ssrRenderClass([{ sel: unref(formData).pagamento === "Multicaixa Express" }, "pay-opt"])}" data-v-147c0e9e><input type="radio" name="epay" value="Multicaixa Express"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).pagamento, "Multicaixa Express")) ? " checked" : ""} data-v-147c0e9e><span data-v-147c0e9e><b data-v-147c0e9e>Multicaixa Express</b><span data-v-147c0e9e>QR code ou link por SMS</span></span></label></div></div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "space-between", "gap": "14px", "padding": "16px", "background": "#f8fafc", "border": "1px solid #e6eff6", "border-radius": "8px", "margin-bottom": "18px", "flex-wrap": "wrap" })}" data-v-147c0e9e><span style="${ssrRenderStyle({ "font-size": "14px", "color": "#475569" })}" data-v-147c0e9e>Total a pagar</span><span style="${ssrRenderStyle({ "font-family": "'Archivo', system-ui, sans-serif", "font-weight": "800", "font-size": "22px", "color": "#0a3a63" })}" data-v-147c0e9e>${ssrInterpolate(formatPrice(unref(selectedCourse)?.price || 0))} <small style="${ssrRenderStyle({ "font-family": "monospace", "font-size": "12px", "color": "#64748b", "font-weight": "500" })}" data-v-147c0e9e>AOA</small></span></div><div class="modal__foot" data-v-147c0e9e><button type="button" class="btn btn--ghost" data-v-147c0e9e> Voltar </button><button type="submit" class="btn btn--primary" id="enrollSubmit" data-v-147c0e9e> Confirmar inscrição <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M5 12h14M13 6l6 6-6 6" data-v-147c0e9e></path></svg></button></div></form></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(formSubmitted)) {
          _push(`<div class="modal__body" id="enrollSuccess" data-v-147c0e9e><div class="modal-success show" style="${ssrRenderStyle({ "display": "block" })}" data-v-147c0e9e><div class="ok" data-v-147c0e9e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-147c0e9e><path d="M20 6 9 17l-5-5" data-v-147c0e9e></path></svg></div><h3 data-v-147c0e9e>Inscrição registada com sucesso</h3><p data-v-147c0e9e> Receberá por e-mail os dados de pagamento. Após a confirmação, terá acesso ao curso e ao material na sua área reservada. </p><div class="order-ref" data-v-147c0e9e>${ssrInterpolate(unref(selectedCourse)?.refNumber)}</div><div class="modal__foot" style="${ssrRenderStyle({ "justify-content": "center" })}" data-v-147c0e9e><button type="button" class="btn btn--primary" data-v-147c0e9e> Concluir </button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/formacao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const formacao = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-147c0e9e"]]);

export { formacao as default };
//# sourceMappingURL=formacao-piz2xbp7.mjs.map
