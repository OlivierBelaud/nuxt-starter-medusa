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
      crawlLinks: true,
    },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  // hub: {
  //   cache: true,
  // },
  hooks: {
    async 'prerender:routes'(ctx) {
      const { regions } = await fetch(`${process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL}/store/regions`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
      }).then(res => res.json())
      const { products } = await fetch(`${process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
      }).then(res => res.json())
      const countries = regions?.map((region: StoreRegion) => region.countries).flat()
      for (const country of countries) {
        ctx.routes.add(`/${country.iso_2.toLowerCase()}`)
        for (const product of products) {
          ctx.routes.add(`/${country.iso_2.toLowerCase()}/products/${product.handle.toLowerCase()}`)
        }
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
    publishableKey: process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    server: true,
  },
})
