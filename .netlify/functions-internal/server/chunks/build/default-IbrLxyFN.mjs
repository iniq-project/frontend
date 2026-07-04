import { _ as __nuxt_component_0$1 } from './nuxt-link-C5VAGYI6.mjs';
import { ref, watch, mergeProps, unref, withCtx, renderSlot, defineComponent, computed, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc, f as useRoute } from './server.mjs';
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

const _imports_0 = publicAssetsURL("/iniq-logo.png");
const _imports_1 = publicAssetsURL("/gov-mindcom-t.png");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HeaderComponent",
  __ssrInlineRender: true,
  props: {
    menuOpen: { type: Boolean }
  },
  emits: ["toggleMenu"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const pageTitles = {
      "/": "Instituto Nacional das Infra-Estruturas da Qualidade",
      "/normas-tecnicas": "Normas Técnicas & Normalização",
      "/metrologia": "Metrologia",
      "/acreditacao": "Registo, Cadastro e Acreditação",
      "/importacao": "Validação, Verificação e Certificação de Produtos a Importar",
      "/formacao": "Formação e Qualificação em Qualidade",
      "/rotulos": "Conformidade de Rótulos e Embalagens",
      "/regulamentos": "Regulamentos Técnicos",
      "/premio-qualidade": "Prémio Nacional da Qualidade",
      "/contactos": "Contactos"
    };
    const pageTitle = computed(() => pageTitles[route.path] || "Instituto Nacional das Infra-Estruturas da Qualidade");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "new-header" }, _attrs))} data-v-c91ad715><div class="logo-left" data-v-c91ad715>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="INIQ" data-v-c91ad715${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "INIQ"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-center" data-v-c91ad715><h1 data-v-c91ad715>${ssrInterpolate(unref(pageTitle))}</h1></div><div class="header-actions" data-v-c91ad715><button type="button" class="${ssrRenderClass([{ open: __props.menuOpen }, "menu-toggle"])}"${ssrRenderAttr("aria-expanded", __props.menuOpen)} aria-controls="services-menu" aria-label="Abrir menu de serviços" data-v-c91ad715><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-c91ad715><path d="M4 7h16M4 12h16M4 17h16" data-v-c91ad715></path></svg></button><div class="logo-right" data-v-c91ad715><a href="https://mindcom.gov.ao/home" target="_blank" rel="noopener noreferrer" data-v-c91ad715><img${ssrRenderAttr("src", _imports_1)} alt="Governo de Angola" data-v-c91ad715></a></div></div></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/HeaderComponent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-c91ad715"]]), { __name: "UiHeaderComponent" });
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar-left" }, _attrs))} data-v-53f10afe><div class="sidebar-content" data-v-53f10afe><div class="eyebrow" data-v-53f10afe>`);
  ssrRenderSlot(_ctx.$slots, "eyebrow", {}, () => {
    _push(`Quem Somos`);
  }, _push, _parent);
  _push(`</div><h2 class="main-title" data-v-53f10afe>`);
  ssrRenderSlot(_ctx.$slots, "title", {}, () => {
    _push(`O Instituto Nacional das Infra-Estruturas da Qualidade`);
  }, _push, _parent);
  _push(`</h2><div class="about-text" data-v-53f10afe>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`<ul data-v-53f10afe><li data-v-53f10afe> Criado pelo Decreto Presidencial n.º 95/21, de Abril de 2021 </li><li data-v-53f10afe> Instituto público sob superintendência do Ministério da Indústria e Comércio </li><li data-v-53f10afe> Compete coordenar o Sistema Nacional da Qualidade </li></ul>`);
  }, _push, _parent);
  _push(`</div></div><div class="sidebar-footer" data-v-53f10afe><div class="gov-info" data-v-53f10afe>Edificio Palacio do vidro <br data-v-53f10afe> Largo 17 de Setembro n° 7 <br data-v-53f10afe> 5° Andar, Ala Esquerda.</div></div></aside>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SideBarComponent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-53f10afe"]]), { __name: "UiSideBarComponent" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavigatorBarComponent",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props) {
    const route = useRoute();
    const isHomePage = computed(() => route.path === "/");
    const isActive = (path) => {
      return route.path === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        id: "services-menu",
        class: "sidebar-right"
      }, _attrs))} data-v-e7dd88d8><button type="button" class="drawer-close" aria-label="Fechar menu" data-v-e7dd88d8><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-e7dd88d8><path d="M6 6l12 12M18 6 6 18" data-v-e7dd88d8></path></svg></button>`);
      if (!unref(isHomePage)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "back-btn",
          onClick: ($event) => _ctx.$emit("close")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`← Voltar à Página Inicial`);
            } else {
              return [
                createTextVNode("← Voltar à Página Inicial")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 data-v-e7dd88d8>Serviços</h2><nav class="services-list" data-v-e7dd88d8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/normas-tecnicas",
        class: ["service-item", { active: isActive("/normas-tecnicas") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>01</span><span data-v-e7dd88d8${_scopeId}>Normas Técnicas &amp; Normalização</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "01"),
              createVNode("span", null, "Normas Técnicas & Normalização")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/metrologia",
        class: ["service-item", { active: isActive("/metrologia") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>02</span><span data-v-e7dd88d8${_scopeId}>Metrologia</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "02"),
              createVNode("span", null, "Metrologia")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/acreditacao",
        class: ["service-item", { active: isActive("/acreditacao") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>03</span><span data-v-e7dd88d8${_scopeId}>Registo, Cadastro e Acreditação</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "03"),
              createVNode("span", null, "Registo, Cadastro e Acreditação")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/importacao",
        class: ["service-item", { active: isActive("/importacao") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>04</span><span data-v-e7dd88d8${_scopeId}>Validação, Verificação e Certificação de Produtos a Importar</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "04"),
              createVNode("span", null, "Validação, Verificação e Certificação de Produtos a Importar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/formacao",
        class: ["service-item", { active: isActive("/formacao") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>05</span><span data-v-e7dd88d8${_scopeId}>Formação e Qualificação em Qualidade</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "05"),
              createVNode("span", null, "Formação e Qualificação em Qualidade")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rotulos",
        class: ["service-item", { active: isActive("/rotulos") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>06</span><span data-v-e7dd88d8${_scopeId}>Conformidade de Rótulos e Embalagens</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "06"),
              createVNode("span", null, "Conformidade de Rótulos e Embalagens")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/regulamentos",
        class: ["service-item", { active: isActive("/regulamentos") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>07</span><span data-v-e7dd88d8${_scopeId}>Regulamentos Técnicos</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "07"),
              createVNode("span", null, "Regulamentos Técnicos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/premio-qualidade",
        class: ["service-item", { active: isActive("/premio-qualidade") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="n" data-v-e7dd88d8${_scopeId}>08</span><span data-v-e7dd88d8${_scopeId}>Prémio Nacional da Qualidade</span>`);
          } else {
            return [
              createVNode("span", { class: "n" }, "08"),
              createVNode("span", null, "Prémio Nacional da Qualidade")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="area-reservada-wrapper" data-v-e7dd88d8><a href="https://reliable-haupia-87ded0.netlify.app/admin" target="_blank" rel="noopener noreferrer" class="area-reservada" data-v-e7dd88d8> Área Reservada </a></div></aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/NavigatorBarComponent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-e7dd88d8"]]), { __name: "UiNavigatorBarComponent" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PartnerCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const partners = [
      { img: "/parceiros/abnt-logot.png", name: "ABNT", url: "https://abnt.org.br" },
      { img: "/parceiros/astmlogot.png", name: "ASTM", url: "https://www.astm.org" },
      { img: "/parceiros/codex-logot.jpg", name: "Codex", url: "https://www.fao.org/fao-who-codexalimentarius/home/en/" },
      { img: "/parceiros/iec-logot.jpg", name: "IEC", url: "https://www.iec.ch" },
      { img: "/parceiros/intilogot.png", name: "INTI", url: "https://www.inti.gob.ar" },
      { img: "/parceiros/ipqlogot.png", name: "IPQ", url: "https://www.ipq.pt" },
      { img: "/parceiros/iso-logot.png", name: "ISO", url: "https://www.iso.org" },
      { img: "/parceiros/logo_sadcas.png", name: "SADCAS", url: "https://www.sadcas.org" },
      { img: "/parceiros/oilmlogote.jpg", name: "OIML", url: "https://www.oiml.org" },
      { img: "/parceiros/sadclogot.png", name: "SADC", url: "https://www.sadc.int" },
      { img: "/parceiros/sadecstanlogot.png", name: "SADCESTAN", url: "https://www.sadc.int/pillars/standards-quality-infrastructure" }
    ];
    const allPartners = ref([...partners, ...partners]);
    const currentPosition = ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "partner-carousel" }, _attrs))} data-v-9b6341ff><button class="carousel-btn prev" data-v-9b6341ff><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9b6341ff><path d="M15 18l-6-6 6-6" data-v-9b6341ff></path></svg></button><div class="carousel-container" data-v-9b6341ff><div class="carousel-track" style="${ssrRenderStyle({ transform: `translateX(-${currentPosition.value}px)` })}" data-v-9b6341ff><!--[-->`);
      ssrRenderList(allPartners.value, (partner, index) => {
        _push(`<a class="partner-slide"${ssrRenderAttr("href", partner.url)} target="_blank" rel="noopener noreferrer" data-v-9b6341ff><img${ssrRenderAttr("src", partner.img)}${ssrRenderAttr("alt", partner.name)} data-v-9b6341ff></a>`);
      });
      _push(`<!--]--></div></div><button class="carousel-btn next" data-v-9b6341ff><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9b6341ff><path d="M9 18l6-6-6-6" data-v-9b6341ff></path></svg></button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/PartnerCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-9b6341ff"]]), { __name: "UiPartnerCarousel" });
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    const closeMenu = () => {
      menuOpen.value = false;
    };
    watch(() => route.path, closeMenu);
    watch(menuOpen, (open) => {
      (void 0).body.style.overflow = open ? "hidden" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiHeaderComponent = __nuxt_component_0;
      const _component_UiSideBarComponent = __nuxt_component_1;
      const _component_UiNavigatorBarComponent = __nuxt_component_2;
      const _component_UiPartnerCarousel = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "new-layout" }, _attrs))} data-v-d016259a>`);
      _push(ssrRenderComponent(_component_UiHeaderComponent, {
        onToggleMenu: toggleMenu,
        "menu-open": unref(menuOpen)
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([{ open: unref(menuOpen) }, "mobile-overlay"])}" aria-hidden="true" data-v-d016259a></div><div class="main-container" data-v-d016259a>`);
      _push(ssrRenderComponent(_component_UiSideBarComponent, { class: "sidebar-left" }, {
        eyebrow: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "sidebar-eyebrow", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "sidebar-eyebrow", {}, void 0, true)
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "sidebar-title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "sidebar-title", {}, void 0, true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "sidebar-content", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "sidebar-content", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<main class="center-content" data-v-d016259a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_UiNavigatorBarComponent, {
        class: ["sidebar-right", { open: unref(menuOpen) }],
        onClose: closeMenu
      }, null, _parent));
      _push(`<div class="carousel-spacer" data-v-d016259a></div><div class="partner-carousel-wrapper" data-v-d016259a>`);
      _push(ssrRenderComponent(_component_UiPartnerCarousel, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d016259a"]]);

export { _default as default };
//# sourceMappingURL=default-IbrLxyFN.mjs.map
