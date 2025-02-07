import type { StoreRegion, StoreRegionCountry } from '@medusajs/types'

// Fix API type
export interface BaseRegionCountryWithRegionId extends StoreRegionCountry {
  region_id: string
}

export function getCountryFromCountryCode(countries: BaseRegionCountryWithRegionId[], countryCode?: string) {
  if (!countryCode)
    return

  return countries.find(country => country?.iso_2 === countryCode)
}

export function getCountriesFromRegions(regions?: StoreRegion[]) {
  if (!regions) {
    return []
  }
  return regions
    .map((region: StoreRegion) => region.countries)
    .flat()
    .sort((a, b) => {
      if (!a?.name || !b?.name) {
        return 0
      }
      return a.name.localeCompare(b.name)
    }) as BaseRegionCountryWithRegionId[]
}
