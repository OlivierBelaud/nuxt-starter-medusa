// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/medusa',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxthub/core',
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
  },

  // routeRules: {
  //   '/**/': { swr: true },
  //   '/**/products/**': { swr: true },
  //   '/**/collections/**': { swr: true },
  //   '/**/categories/**': { swr: true },
  //   '/**/store': { swr: true },
  //   '/**/account': { swr: true },
  //   // '/**/cart': { swr: true },
  //   // '/**/checkout': { swr: true },
  // },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: true,
    // componentIslands: {
    //   selectiveClient: true,
    // },
  },
  compatibilityDate: '2024-11-06',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  // hub: {
  //   cache: true,
  // },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  medusa: {
    baseUrl: 'https://medusa-base-production.up.railway.app',
    publishableKey: 'pk_c4b94535c4afd1c93b8f0dce331bf3177c268bf8bcd6773daed4ff6e3fbf6b07',
    server: true,
  },
})
