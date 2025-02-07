import type { StoreProduct, StoreProductOptionValue } from '@medusajs/types'
import { SORT_OPTIONS, type SortOptionsType } from '~/types/filter'

export function getCheapestVariant(product?: StoreProduct) {
  if (!product || !product.id) {
    return
    throw new Error('No product provided')
  }
  return product.variants
    ?.filter(v => !!v.calculated_price)
    .sort((a, b) => {
      if (a.calculated_price?.calculated_amount && b.calculated_price?.calculated_amount) {
        return (
          a.calculated_price?.calculated_amount
          - b.calculated_price?.calculated_amount
        )
      }
      return 0
    })[0]
}

export function getCheapestVariantPriceAmount(product: StoreProduct) {
  return getCheapestVariant(product)?.calculated_price?.calculated_amount
}

export function sortProducts(
  products: StoreProduct[],
  sortBy?: SortOptionsType,
) {
  if (sortBy === SORT_OPTIONS.PRICE_ASC || sortBy === SORT_OPTIONS.PRICE_DESC) {
    return products.sort((a, b) => {
      const priceA = getCheapestVariantPriceAmount(a) || 0
      const priceB = getCheapestVariantPriceAmount(b) || 0
      const diff = priceA! - priceB!

      return sortBy === SORT_OPTIONS.PRICE_ASC ? diff : -diff
    })
  }
  else {
    return products.sort((a, b) => {
      return (
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      )
    })
  }
}

export function optionsAsKeyMap(
  variantOptions: StoreProductOptionValue[] | null,
) {
  return variantOptions?.reduce((acc: Record<string, string>, varOpt: StoreProductOptionValue) => {
    if (!varOpt.option_id) return acc
    acc[varOpt.option_id] = varOpt.value
    return acc
  }, {})
}
