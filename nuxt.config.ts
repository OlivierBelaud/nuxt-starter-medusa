// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    medusaBackendUrl: '',
    medusaPublishableKey: '',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: true,
    componentIslands: {
      selectiveClient: true,
    },
  },
  compatibilityDate: '2024-11-06',
  nitro: {
    prerender: {
      // TODO: Get all pages dynamically
      routes: [
        '/at',
        '/be',
        '/hr',
        '/cy',
        '/ee',
        '/fi',
        '/fr',
        '/de',
        '/gr',
        '/ie',
        '/it',
        '/lv',
        '/lt',
        '/lu',
        '/mt',
        '/nl',
        '/pt',
        '/sk',
        '/si',
        '/es',
        '/gb',
        '/us'
      ],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
