import { unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead, _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = {
  __name: "CustomHomeHero",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "combined-card" }, _attrs))} data-v-c1e81658><div class="dg-top" data-v-c1e81658><div class="dg-photo-wrapper" data-v-c1e81658><img class="dg-photo"${ssrRenderAttr("src", __props.data.director.foto)}${ssrRenderAttr("alt", __props.data.director.nome)} data-v-c1e81658><div class="dg-details" data-v-c1e81658><h3 data-v-c1e81658>${ssrInterpolate(__props.data.director.nome)}</h3><p class="role" data-v-c1e81658>${ssrInterpolate(__props.data.director.cargo)}</p><p class="phone" data-v-c1e81658>${ssrInterpolate(__props.data.director.telefone)}</p></div></div><div class="dg-message" data-v-c1e81658><h4 data-v-c1e81658>Mensagem do Director-Geral</h4><p data-v-c1e81658>&quot;${ssrInterpolate(__props.data.mensagem)}&quot;</p></div></div><div class="quality-policy-section" data-v-c1e81658><h4 data-v-c1e81658>${ssrInterpolate(__props.data.politicaQualidade.titulo)}</h4><p data-v-c1e81658>${ssrInterpolate(__props.data.politicaQualidade.descricao)}</p></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/custom/home/Hero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c1e81658"]]);
const homeData = {
  director: {
    nome: "Carmo Adriana dos Santos",
    cargo: "Direcção-Geral",
    telefone: "+244 222 000 000",
    foto: "/director-geral.png"
  },
  mensagem: "A qualidade é o alicerce silencioso de uma economia diversificada e competitiva. No INIQ, trabalhamos para que cada produto e serviço em Angola corresponda a padrões reconhecidos, protegendo o consumidor e abrindo portas ao comércio internacional.",
  politicaQualidade: {
    titulo: "Política de Qualidade",
    descricao: "O INIQ compromete-se a coordenar e desenvolver o Sistema Nacional da Qualidade de Angola, garantindo a conformidade com as melhores práticas internacionais, promovendo a participação transparente de todas as partes interessadas, e garantindo que as normas angolanas apoiem a inovação, a competitividade empresarial e a proteção do consumidor, com foco na melhoria contínua e excelência. Estamos empenhados em fornecer serviços de qualidade que atendam às expectativas dos nossos clientes e da sociedade angolana, através de metrologia, normalização, ensaios, certificação e acreditação."
  }
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "INIQ » Instituto Nacional das Infra-Estruturas da Qualidade"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomHomeHero = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_CustomHomeHero, { data: unref(homeData) }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cm1brh1Q.mjs.map
