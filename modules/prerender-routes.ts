import type { StoreRegion } from '@medusajs/types'
import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-prerender-routes',
  },
  async setup() {
    const pages = await getDynamicPages()
    addPrerenderRoutes(pages)
  },
})

async function getDynamicPages(): Promise<string[]> {
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

  const routes = new Set<string>()
  for (const country of countries) {
    routes.add(`/${country.iso_2}`)
    routes.add(`/${country.iso_2}/account`)
    routes.add(`/${country.iso_2}/store`)
    routes.add(`/${country.iso_2}/cart`)
    routes.add(`/${country.iso_2}/checkout`)
    for (const product of products) {
      routes.add(`/${country.iso_2}/products/${product.handle}`)
    }
    for (const collection of collections) {
      routes.add(`/${country.iso_2}/collections/${collection.handle}`)
    }
    for (const category of categories) {
      routes.add(`/${country.iso_2}/categories/${category.handle}`)
    }
  }
  return Array.from(routes)
}
