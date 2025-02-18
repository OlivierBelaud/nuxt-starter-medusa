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
  //   public: {
  //     medusaBackendUrl: process.env.MEDUSA_PUBLIC_BACKEND_URL,
  //     medusaPublishableKey: process.env.MEDUSA_PUBLIC_PUBLISHABLE_KEY,
  //   },
  },

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
  // hooks: {
  //   async 'prerender:routes'(ctx) {
  //     const { pages } = await fetch('https://api.some-cms.com/pages').then(
  //       res => res.json(),
  //     )
  //     for (const page of pages) {
  //       ctx.routes.add(`/${page.name}`)
  //     }
  //   },
  // },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  medusa: {
    baseUrl: process.env.MEDUSA_URL,
    publishableKey: 'pk_c4b94535c4afd1c93b8f0dce331bf3177c268bf8bcd6773daed4ff6e3fbf6b07',
    server: true,
  },
})
