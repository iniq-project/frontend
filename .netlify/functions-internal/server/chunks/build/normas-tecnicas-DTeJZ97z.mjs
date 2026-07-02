import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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

const _imports_0 = publicAssetsURL("/perfis/04.jpg");
const _sfc_main = {
  __name: "normas-tecnicas",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "INIQ » Normas Técnicas & Normalização"
    });
    const activeTab = ref("venda");
    const modalOpen = ref(false);
    const modalMode = ref("venda");
    const modalEyebrow = ref("Venda de Normas");
    const modalTitle = ref("Solicitar Norma");
    const modalRef = ref("");
    const formSubmitted = ref(false);
    const successTitle = ref("Pedido submetido com sucesso");
    const successMsg = ref(
      "Receberá por e-mail os dados de pagamento (Referência Multicaixa). Após confirmação, a norma fica imediatamente disponível na sua área reservada."
    );
    const orderRef = ref("");
    const normas = ref([
      {
        code: "NA 0042:2025",
        title: "Águas de consumo humano — Requisitos de qualidade",
        sector: "Ambiente",
        price: 12500
      },
      {
        code: "NA 0309:2024",
        title: "Cimento Portland — Especificações e ensaios",
        sector: "Construção",
        price: 15e3
      },
      {
        code: "NA 0756:2023",
        title: "Segurança de brinquedos — Requisitos gerais",
        sector: "Gestão",
        price: 9800
      }
    ]);
    const projetosConsulta = ref([
      {
        code: "prNA 1187:2026",
        title: "Rotulagem de produtos alimentares pré-embalados",
        sector: "Alimentar",
        description: "Requisitos de informação obrigatória, declaração nutricional e alergénios na rotulagem de géneros alimentícios.",
        deadline: "30 Jun 2026",
        progress: 62,
        urgent: false
      },
      {
        code: "prNA 1402:2026",
        title: "Sistemas de gestão da qualidade — Fundamentos e vocabulário",
        sector: "Gestão",
        description: "Princípios, conceitos e terminologia de base para os sistemas de gestão da qualidade.",
        deadline: "15 Jul 2026",
        progress: 38,
        urgent: false
      },
      {
        code: "prNA 0991:2026",
        title: "Blocos de betão para alvenaria — Requisitos",
        sector: "Construção",
        description: "Especificações dimensionais, resistência mecânica e métodos de ensaio para blocos de betão.",
        deadline: "12 Jun 2026",
        progress: 88,
        urgent: true
      }
    ]);
    const formData = ref({
      nome: "",
      entidade: "",
      email: "",
      telefone: "",
      nif: "",
      formato: "PDF (digital)",
      contribuicao: "",
      pagamento: "Referência Multicaixa",
      observacoes: ""
    });
    const formatPrice = (price) => {
      return price.toLocaleString("pt-PT");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="combined-card" data-v-73ad7f18><div class="dg-top" data-v-73ad7f18><div class="dg-photo-wrapper" data-v-73ad7f18><img class="dg-photo"${ssrRenderAttr("src", _imports_0)} alt="Chefe do Departamento de Normalização" data-v-73ad7f18><div class="dg-details" data-v-73ad7f18><h3 data-v-73ad7f18>Dra. Inês Cabral</h3><p class="role" data-v-73ad7f18>Chefe do Departamento de Normalização</p></div></div><div class="dg-message" data-v-73ad7f18><h4 data-v-73ad7f18>Mensagem do Responsável</h4><p data-v-73ad7f18> “A normalização é o ponto de partida da qualidade. Construímos, com as comissões técnicas, as referências que dão confiança ao mercado.” </p></div></div><div class="quality-policy-section" data-v-73ad7f18><h4 data-v-73ad7f18>Política de Qualidade para Normalização</h4><p data-v-73ad7f18> O INIQ compromete-se a coordenar e desenvolver o sistema nacional de normalização de Angola, garantindo a conformidade com as melhores práticas internacionais, promovendo a participação transparente de todas as partes interessadas, e garantindo que as normas angolanas apoiem a inovação, a competitividade empresarial e a proteção do consumidor, com foco na melhoria contínua e excelência. </p></div><div class="tabs-bar" data-v-73ad7f18><div class="tabs" data-v-73ad7f18><button class="${ssrRenderClass(["tab-btn", { "is-active": unref(activeTab) === "venda" }])}" data-v-73ad7f18><span class="n" data-v-73ad7f18>01</span> Venda de Normas </button><button class="${ssrRenderClass(["tab-btn", { "is-active": unref(activeTab) === "consulta" }])}" data-v-73ad7f18><span class="n" data-v-73ad7f18>02</span> Projectos em Consulta Pública </button></div></div>`);
      if (unref(activeTab) === "venda") {
        _push(`<div class="tab-panel" data-v-73ad7f18><div class="panel-head" data-v-73ad7f18><span class="eyebrow" data-v-73ad7f18>Venda de Normas</span><h2 data-v-73ad7f18>Catálogo nacional de normas</h2><p data-v-73ad7f18> Pesquise as normas em vigor e solicite a sua aquisição. Ao clicar em <b data-v-73ad7f18>Solicitar</b>, abre-se o formulário de pedido com pagamento por Referência Multicaixa ou Multicaixa Express. </p></div><div class="catalog-toolbar" data-v-73ad7f18><div class="catalog-search" data-v-73ad7f18><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-73ad7f18><circle cx="11" cy="11" r="7" data-v-73ad7f18></circle><path d="m21 21-4.3-4.3" data-v-73ad7f18></path></svg><input type="text" placeholder="Pesquisar por referência ou título…" aria-label="Pesquisar normas" data-v-73ad7f18></div><div class="catalog-filter" data-v-73ad7f18><button class="chip is-active" data-v-73ad7f18>Todos</button><button class="chip" data-v-73ad7f18>Alimentar</button><button class="chip" data-v-73ad7f18>Construção</button><button class="chip" data-v-73ad7f18>Ambiente</button><button class="chip" data-v-73ad7f18>Gestão</button></div></div><div class="catalog" data-v-73ad7f18><!--[-->`);
        ssrRenderList(unref(normas), (norma) => {
          _push(`<div class="catalog-item" data-v-73ad7f18><div class="catalog-item-top" data-v-73ad7f18><div class="catalog-item-code" data-v-73ad7f18>${ssrInterpolate(norma.code)}</div><span class="badge badge--sector badge--green" data-v-73ad7f18>${ssrInterpolate(norma.sector)}</span><div class="catalog-item-price" data-v-73ad7f18><span class="price-value" data-v-73ad7f18>${ssrInterpolate(formatPrice(norma.price))}</span><span class="price-currency" data-v-73ad7f18>AOA</span></div><button class="btn btn--primary" data-v-73ad7f18> Solicitar </button></div><h3 class="catalog-item-title" data-v-73ad7f18>${ssrInterpolate(norma.title)}</h3></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "consulta") {
        _push(`<div class="tab-panel" data-v-73ad7f18><div class="panel-head" data-v-73ad7f18><span class="eyebrow" data-v-73ad7f18>Projectos-Normas em Consulta Pública</span><h2 data-v-73ad7f18>Participe na elaboração das normas</h2><p data-v-73ad7f18> Os projectos abaixo estão em fase de consulta pública. Qualquer interessado pode submeter contribuições dentro do prazo indicado. </p></div><div class="consulta" data-v-73ad7f18><!--[-->`);
        ssrRenderList(unref(projetosConsulta), (projeto) => {
          _push(`<article class="consulta-item" data-v-73ad7f18><div data-v-73ad7f18><div class="consulta-tags" data-v-73ad7f18><span class="consulta-code" data-v-73ad7f18>${ssrInterpolate(projeto.code)}</span><span class="badge badge--sector" data-v-73ad7f18>${ssrInterpolate(projeto.sector)}</span></div><h3 data-v-73ad7f18>${ssrInterpolate(projeto.title)}</h3><p class="consulta-desc" data-v-73ad7f18>${ssrInterpolate(projeto.description)}</p><div class="consulta-bar" data-v-73ad7f18><span style="${ssrRenderStyle({ width: projeto.progress + "%" })}" data-v-73ad7f18></span></div></div><div class="consulta-deadline" data-v-73ad7f18><span class="${ssrRenderClass(["deadline-pill", { urgent: projeto.urgent }])}" data-v-73ad7f18>Termina ${ssrInterpolate(projeto.deadline)}</span><button class="btn btn--green" data-v-73ad7f18> Contribuir </button></div></article>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(modalOpen)) {
        _push(`<div class="${ssrRenderClass([{ open: unref(modalOpen) }, "modal"])}" data-v-73ad7f18><div class="modal-scrim" data-v-73ad7f18></div><div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle" data-v-73ad7f18><div class="modal-head" data-v-73ad7f18><div data-v-73ad7f18><span class="eyebrow" id="modalEyebrow" data-v-73ad7f18>${ssrInterpolate(unref(modalEyebrow))}</span><h3 id="modalTitle" data-v-73ad7f18>${ssrInterpolate(unref(modalTitle))}</h3><div class="modal-ref" id="modalRef" data-v-73ad7f18>${ssrInterpolate(unref(modalRef))}</div></div><button class="modal-close" aria-label="Fechar" data-v-73ad7f18><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-73ad7f18><path d="M6 6l12 12M18 6 6 18" data-v-73ad7f18></path></svg></button></div><div class="modal-body" data-v-73ad7f18>`);
        if (!unref(formSubmitted)) {
          _push(`<div class="form-wrap" id="formWrap" data-v-73ad7f18><form data-v-73ad7f18><div class="field-row" data-v-73ad7f18><div class="field" data-v-73ad7f18><label for="f-nome" data-v-73ad7f18>Nome completo <span class="req" data-v-73ad7f18>*</span></label><input type="text" id="f-nome" name="nome" required placeholder="Nome do requerente"${ssrRenderAttr("value", unref(formData).nome)} data-v-73ad7f18></div><div class="field" data-v-73ad7f18><label for="f-entidade" data-v-73ad7f18>Entidade / Empresa</label><input type="text" id="f-entidade" name="entidade" placeholder="Opcional"${ssrRenderAttr("value", unref(formData).entidade)} data-v-73ad7f18></div></div><div class="field-row" data-v-73ad7f18><div class="field" data-v-73ad7f18><label for="f-email" data-v-73ad7f18>E-mail <span class="req" data-v-73ad7f18>*</span></label><input type="email" id="f-email" name="email" required placeholder="nome@exemplo.ao"${ssrRenderAttr("value", unref(formData).email)} data-v-73ad7f18></div><div class="field" data-v-73ad7f18><label for="f-tel" data-v-73ad7f18>Telefone <span class="req" data-v-73ad7f18>*</span></label><input type="tel" id="f-tel" name="telefone" required placeholder="+244 9XX XXX XXX"${ssrRenderAttr("value", unref(formData).telefone)} data-v-73ad7f18></div></div><div class="field-row" data-v-73ad7f18><div class="field" data-v-73ad7f18><label for="f-nif" data-v-73ad7f18>NIF / BI</label><input type="text" id="f-nif" name="nif" placeholder="Para emissão de recibo"${ssrRenderAttr("value", unref(formData).nif)} data-v-73ad7f18></div><div class="field" data-v-73ad7f18><label for="f-formato" data-v-73ad7f18>Formato <span class="req" data-v-73ad7f18>*</span></label><select id="f-formato" name="formato" required data-v-73ad7f18><option value="PDF (digital)" data-v-73ad7f18${ssrIncludeBooleanAttr(Array.isArray(unref(formData).formato) ? ssrLooseContain(unref(formData).formato, "PDF (digital)") : ssrLooseEqual(unref(formData).formato, "PDF (digital)")) ? " selected" : ""}>PDF (digital)</option><option value="Impresso" data-v-73ad7f18${ssrIncludeBooleanAttr(Array.isArray(unref(formData).formato) ? ssrLooseContain(unref(formData).formato, "Impresso") : ssrLooseEqual(unref(formData).formato, "Impresso")) ? " selected" : ""}>Impresso</option><option value="Digital + Impresso" data-v-73ad7f18${ssrIncludeBooleanAttr(Array.isArray(unref(formData).formato) ? ssrLooseContain(unref(formData).formato, "Digital + Impresso") : ssrLooseEqual(unref(formData).formato, "Digital + Impresso")) ? " selected" : ""}>Digital + Impresso</option></select></div></div>`);
          if (unref(modalMode) === "contrib") {
            _push(`<div class="field" id="contribField" data-v-73ad7f18><label for="f-contrib" data-v-73ad7f18>A sua contribuição</label><textarea id="f-contrib" name="contribuicao" placeholder="Indique o artigo/secção e a redacção alternativa proposta, com a respectiva fundamentação." data-v-73ad7f18>${ssrInterpolate(unref(formData).contribuicao)}</textarea></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(modalMode) === "venda") {
            _push(`<div class="field" id="payField" data-v-73ad7f18><label data-v-73ad7f18>Meio de pagamento <span class="req" data-v-73ad7f18>*</span></label><div class="pay-options" data-v-73ad7f18><label class="${ssrRenderClass([{
              sel: unref(formData).pagamento === "Referência Multicaixa"
            }, "pay-opt"])}" data-v-73ad7f18><input type="radio" name="pagamento" value="Referência Multicaixa"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).pagamento, "Referência Multicaixa")) ? " checked" : ""} checked data-v-73ad7f18><span data-v-73ad7f18><b data-v-73ad7f18>Referência Multicaixa</b><span data-v-73ad7f18>Pague em ATM ou homebanking</span></span></label><label class="${ssrRenderClass([{ sel: unref(formData).pagamento === "Multicaixa Express" }, "pay-opt"])}" data-v-73ad7f18><input type="radio" name="pagamento" value="Multicaixa Express"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).pagamento, "Multicaixa Express")) ? " checked" : ""} data-v-73ad7f18><span data-v-73ad7f18><b data-v-73ad7f18>Multicaixa Express</b><span data-v-73ad7f18>QR code ou link por SMS</span></span></label></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="field" data-v-73ad7f18><label for="f-obs" data-v-73ad7f18>Observações</label><textarea id="f-obs" name="observacoes" placeholder="Informação adicional (opcional)" data-v-73ad7f18>${ssrInterpolate(unref(formData).observacoes)}</textarea></div><div class="modal-foot" data-v-73ad7f18><button type="button" class="btn btn--ghost" data-v-73ad7f18> Cancelar </button><button type="submit" class="btn btn--primary" id="submitBtn" data-v-73ad7f18>${ssrInterpolate(unref(modalMode) === "contrib" ? "Enviar contribuição" : "Submeter pedido")} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-v-73ad7f18><path d="M5 12h14M13 6l6 6-6 6" data-v-73ad7f18></path></svg></button></div></form></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(formSubmitted)) {
          _push(`<div class="modal-success" id="successState" data-v-73ad7f18><div class="ok" data-v-73ad7f18><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-73ad7f18><path d="M20 6 9 17l-5-5" data-v-73ad7f18></path></svg></div><h3 id="successTitle" data-v-73ad7f18>${ssrInterpolate(unref(successTitle))}</h3><p id="successMsg" data-v-73ad7f18>${ssrInterpolate(unref(successMsg))}</p><div class="order-ref" id="orderRef" data-v-73ad7f18>${ssrInterpolate(unref(orderRef))}</div><div class="modal-foot" style="${ssrRenderStyle({ "justify-content": "center" })}" data-v-73ad7f18><button type="button" class="btn btn--primary" data-v-73ad7f18> Concluir </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/normas-tecnicas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const normasTecnicas = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73ad7f18"]]);

export { normasTecnicas as default };
//# sourceMappingURL=normas-tecnicas-DTeJZ97z.mjs.map
