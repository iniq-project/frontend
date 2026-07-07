// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "",
      meta: [
        { charset: "utf-8" },
        { name: "author", content: "Hernany Simão" },
        { name: "keyword", content: "" },
        { name: "description", content: "" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { property: "og:description", content: "" },
        { property: "og:locale", content: "pt_AO" }
      ],
    },
  },

  devtools: {
    enabled: true
  },

  nitro: {
    preset: "netlify"
  },

  css: [
    "~/assets/css/main.css"
  ],

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/apollo"
  ],

  // @ts-ignore
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${process.env.SQUIDEX_URL}/api/content/${process.env.SQUIDEX_APP_NAME}/graphql`,
      }
    },
  },

  runtimeConfig: {
    squidex: {
      clientId: process.env.SQUIDEX_CLIENT_ID,
      clientSecret: process.env.SQUIDEX_CLIENT_SECRET,
    },

    public: {
      appName: process.env.APP_NAME,
      url: process.env.SQUIDEX_URL,
      apiBaseURL: `${process.env.SQUIDEX_URL}/api/content/${process.env.SQUIDEX_APP_NAME}/`,
      apiBaseAssetsURL: `${process.env.SQUIDEX_URL}/api/apps/${process.env.SQUIDEX_APP_NAME}/assets`,
    },

    backendUrl: process.env.NUXT_BACKEND_URL || "http://localhost:3001",
  },

  routeRules: {
    "/": {
      prerender: true
    }
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs"
      }
    }
  },

  // Configuração para permitir acesso via ngrok
  vite: {
    server: {
      allowedHosts: true
    }
  },

  ssr: true
})