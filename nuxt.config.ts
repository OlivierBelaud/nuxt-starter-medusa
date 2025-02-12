import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/medusa',
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
    // FIX: Pb with NuxtHub, Github Action and env var access during build time
    medusaBackendUrl: 'https://medusa-base-production.up.railway.app',
    medusaPublishableKey: 'pk_c4b94535c4afd1c93b8f0dce331bf3177c268bf8bcd6773daed4ff6e3fbf6b07',
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
        '/us',
      ],
      crawlLinks: true,
    },
  },

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
