import type { StoreRegion } from '@medusajs/types'

const isPartial = process.env.NUXT_PUBLIC_PARTIAL_PRE_RENDERING === 'true'
const medusaBackendUrl = process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL || ''
const medusaPublishableKey = process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''

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
    '/**/products/**': { prerender: isPartial },
    '/**/collections/**': { prerender: isPartial, swr: !isPartial },
    '/**/categories/**': { prerender: isPartial, swr: !isPartial },
    '/**/store': { prerender: isPartial, swr: !isPartial },
    '/**/account': { prerender: isPartial },
    // '/**/cart': { prerender: isPartial },
    // '/**/checkout': { prerender: isPartial },
  },

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
  nitro: {
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            ...(isPartial
              ? [
                  '/**/products/**',
                  '/**/collections/**',
                  '/**/categories/**',
                  '/**/account',
                  '/**/store',
                  // '/**/cart',
                  // '/**/checkout',
                ]
              : []),
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
      const { regions } = await fetch(`${medusaBackendUrl}/store/regions`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': medusaPublishableKey,
        },
      }).then(res => res.json())
      const { products } = await fetch(`${medusaBackendUrl}/store/products`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': medusaPublishableKey,
        },
      }).then(res => res.json())
      const { collections } = await fetch(`${medusaBackendUrl}/store/collections`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': medusaPublishableKey,
        },
      }).then(res => res.json())
      const { product_categories: categories } = await fetch(`${medusaBackendUrl}/store/product-categories`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': medusaPublishableKey,
        },
      }).then(res => res.json())
      const countries = regions?.map((region: StoreRegion) => region.countries).flat()
      for (const country of countries) {
        ctx.routes.add(`/${country.iso_2}`)
        if (isPartial) {
          ctx.routes.add(`/${country.iso_2}/account`)
          ctx.routes.add(`/${country.iso_2}/store`)
          // ctx.routes.add(`/${country.iso_2}/cart`)
          // ctx.routes.add(`/${country.iso_2}/checkout`)
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
