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

  runtimeConfig: {
  },
  // routeRules: {
  //   '/**/': { swr: true },
  //   '/**/products/**': { prerender: true },
  //   '/**/collections/**': { swr: true },
  //   '/**/categories/**': { swr: true },
  //   '/**/account': { prerender: true },
  //   '/**/store': { prerender: true },
  //   '/**/cart': { prerender: true },
  //   '/**/checkout': { prerender: true },
  // },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // payloadExtraction: true,
    // componentIslands: {
    //   selectiveClient: true,
    // },
  },
  compatibilityDate: '2024-11-06',
  nitro: {
    // Use pattern to avoid 100 the Cloudflare 100 routes limit
    // https://hub.nuxt.com/docs/recipes/pre-rendering#cloudflare-100-routes-limit
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            '/**/products/**',
            '/**/collections/**',
            '/**/categories/**',
            '/**/account',
            '/**/store',
            '/**/cart',
            '/**/checkout',
          ],
        },
      },
    },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    cache: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  medusa: {
    baseUrl: process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL,
    publishableKey: process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    server: true,
  },
})
