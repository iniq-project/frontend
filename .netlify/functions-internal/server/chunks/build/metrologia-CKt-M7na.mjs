import { _ as __nuxt_component_0 } from './nuxt-link-C5VAGYI6.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const _imports_0 = publicAssetsURL("/perfis/03.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "metrologia",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "INIQ » Metrologia"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "combined-card" }, _attrs))} data-v-e002c7cb><div class="dg-top" data-v-e002c7cb><div class="dg-photo-wrapper" data-v-e002c7cb><img class="dg-photo"${ssrRenderAttr("src", _imports_0)} alt="Chefe do Departamento de Metrologia" data-v-e002c7cb><div class="dg-details" data-v-e002c7cb><h3 data-v-e002c7cb>Eng.º António Bengui</h3><p class="role" data-v-e002c7cb>Chefe do Departamento de Metrologia</p></div></div><div class="dg-message" data-v-e002c7cb><h4 data-v-e002c7cb>Mensagem do Responsável</h4><p data-v-e002c7cb> “Medições fiáveis são a base do comércio justo e da indústria. Asseguramos a rastreabilidade de cada medição ao Sistema Internacional de Unidades.” </p></div></div><div class="quality-policy-section" data-v-e002c7cb><h4 data-v-e002c7cb>Política de Qualidade para Metrologia</h4><p data-v-e002c7cb> O INIQ compromete-se a garantir a fiabilidade e rastreabilidade das medições em Angola, alinhando-se com os padrões internacionais (BIPM, OIML) e promovendo a confiança no mercado, a proteção do consumidor e a competitividade industrial, com foco na melhoria contínua e excelência. </p></div><section class="mt-12" data-v-e002c7cb><div class="container" data-v-e002c7cb><div class="panel-head" data-v-e002c7cb><span class="eyebrow" data-v-e002c7cb>Serviços</span><h2 data-v-e002c7cb>Serviços de metrologia ao seu dispor</h2></div><div class="mserv" data-v-e002c7cb><div class="mserv__item" data-v-e002c7cb><span class="chk" data-v-e002c7cb><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-e002c7cb><path d="M20 6 9 17l-5-5" data-v-e002c7cb></path></svg></span><div data-v-e002c7cb><b data-v-e002c7cb>Calibração de instrumentos</b><p data-v-e002c7cb>Massa, volume, temperatura, pressão, dimensional e mais.</p></div></div><div class="mserv__item" data-v-e002c7cb><span class="chk" data-v-e002c7cb><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-e002c7cb><path d="M20 6 9 17l-5-5" data-v-e002c7cb></path></svg></span><div data-v-e002c7cb><b data-v-e002c7cb>Verificação metrológica legal</b><p data-v-e002c7cb>Verificação inicial e periódica de instrumentos sujeitos a controlo.</p></div></div><div class="mserv__item" data-v-e002c7cb><span class="chk" data-v-e002c7cb><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-e002c7cb><path d="M20 6 9 17l-5-5" data-v-e002c7cb></path></svg></span><div data-v-e002c7cb><b data-v-e002c7cb>Emissão de certificados</b><p data-v-e002c7cb>Certificados de calibração e de verificação com rastreabilidade ao SI.</p></div></div><div class="mserv__item" data-v-e002c7cb><span class="chk" data-v-e002c7cb><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-v-e002c7cb><path d="M20 6 9 17l-5-5" data-v-e002c7cb></path></svg></span><div data-v-e002c7cb><b data-v-e002c7cb>Aprovação de modelo</b><p data-v-e002c7cb>Avaliação e aprovação de modelos de instrumentos de medição.</p></div></div></div></div></section><section class="section" data-v-e002c7cb><div class="container" data-v-e002c7cb><div class="cta-band" data-v-e002c7cb><div data-v-e002c7cb><h2 data-v-e002c7cb>Precisa de calibrar ou verificar instrumentos?</h2><p data-v-e002c7cb>Contacte o Laboratório Nacional de Metrologia do INIQ e solicite um orçamento para os seus equipamentos.</p></div><div class="cta-band__actions" data-v-e002c7cb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contactos",
        class: "btn btn--ghost"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Solicitar calibração`);
          } else {
            return [
              createTextVNode("Solicitar calibração")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/metrologia.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const metrologia = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e002c7cb"]]);

export { metrologia as default };
//# sourceMappingURL=metrologia-CKt-M7na.mjs.map
