import type { StoreRegion } from '@medusajs/types'

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
  routeRules: {
    '/**/': { prerender: true },
    '/**/products/**': { prerender: true },
    '/**/collections/**': { prerender: true },
    '/**/categories/**': { prerender: true },
    '/**/account': { prerender: true },
    '/**/store': { prerender: true },
    '/**/cart': { prerender: true },
    '/**/checkout': { prerender: true },
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
      const { collections } = await fetch(`${process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL}/store/collections`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
      }).then(res => res.json())
      const { product_categories: categories } = await fetch(`${process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
      }).then(res => res.json())
      const countries = regions?.map((region: StoreRegion) => region.countries).flat()
      for (const country of countries) {
        ctx.routes.add(`/${country.iso_2}`)
        ctx.routes.add(`/${country.iso_2}/account`)
        ctx.routes.add(`/${country.iso_2}/store`)
        ctx.routes.add(`/${country.iso_2}/cart`)
        ctx.routes.add(`/${country.iso_2}/checkout`)
        for (const product of products) {
          ctx.routes.add(`/${country.iso_2}/products/${product.handle}`)
        }
        for (const collection of collections) {
          ctx.routes.add(`/${country.iso_2}/collections/${collection.handle}`)
        }
        for (const category of categories) {
          ctx.routes.add(`/${country.iso_2}/categories/${category.handle}`)
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
