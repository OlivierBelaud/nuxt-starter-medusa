export const useCurrentCountryCode = () => {
  const route = useRoute()

  return {
    currentCountryCode: computed(() => route.params.countryCode as string),
  }
}

export const useRegions = () => {
  const currentCountryCode = useState<string | undefined>('country-code', () => undefined)
  const countries = useState<BaseRegionCountryWithRegionId[]>('countries', () => [])
  const region_id = useCookie('region_id')

  const currentCountry = computed(() =>
    getCountryFromCountryCode(countries.value, currentCountryCode.value),
  )

  const currentRegionId = computed(() =>
    currentCountry.value?.region_id,
  )

  const setCurrentCountryCode = (countryCode: string) => {
    currentCountryCode.value = countryCode
  }

  const setCountries = (newCountries: BaseRegionCountryWithRegionId[]) => {
    countries.value = newCountries
  }

  const setRegionId = () => {
    region_id.value = currentRegionId.value
  }

  return {
    currentCountryCode: readonly(currentCountryCode),
    countries: readonly(countries),
    currentCountry,
    currentRegionId,
    setCurrentCountryCode,
    setCountries,
    setRegionId,
  }
}
