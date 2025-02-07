export const SORT_OPTIONS = {
  CREATED_AT: 'created_at',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
} as const

export type SortOptionsType = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]
