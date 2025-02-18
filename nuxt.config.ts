import type { StoreRegion } from '@medusajs/types'

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
      // routes: [
      //   '/at',
      //   '/be',
      //   '/hr',
      //   '/cy',
      //   '/ee',
      //   '/fi',
      //   '/fr',
      //   '/de',
      //   '/gr',
      //   '/ie',
      //   '/it',
      //   '/lv',
      //   '/lt',
      //   '/lu',
      //   '/mt',
      //   '/nl',
      //   '/pt',
      //   '/sk',
      //   '/si',
      //   '/es',
      //   '/gb',
      //   '/us',
      // ],
      crawlLinks: true,
    },
  },
  hooks: {
    async 'prerender:routes'(ctx) {
      const { regions } = await fetch(`https://medusa-base-production.up.railway.app/store/regions`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': 'pk_c4b94535c4afd1c93b8f0dce331bf3177c268bf8bcd6773daed4ff6e3fbf6b07',
        },
      }).then(res => res.json())
      const countries = regions.map((region: StoreRegion) => region.countries).flat()
      for (const country of countries) {
        ctx.routes.add(`/${country.iso_2.toLowerCase()}`)
      }
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  medusa: {
    baseUrl: process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL,
    publishableKey: 'pk_c4b94535c4afd1c93b8f0dce331bf3177c268bf8bcd6773daed4ff6e3fbf6b07',
    server: true,
  },
})
