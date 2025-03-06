export const useCountry = () => {
  const countryCodeFromCookie = useCookie('country_code', {
    maxAge: 60 * 60 * 24 * 365,
  })
  const country = useState<BaseRegionCountryWithRegionId | undefined>('country', () => undefined)

  const setCountry = (newCountry?: BaseRegionCountryWithRegionId) => {
    if (!newCountry)
      return null
    country.value = newCountry
    countryCodeFromCookie.value = newCountry.iso_2
  }

  return {
    countryCode: computed(() => countryCodeFromCookie.value || undefined),
    country: readonly(country),
    setCountry: setCountry,
  }
}

export const useCountries = async () => {
  const NuxtApp = useNuxtApp()
  const countries = ref<BaseRegionCountryWithRegionId[] | undefined>(NuxtApp.payload.data['countries'])

  if (!countries.value) {
    const { data } = await useFetchCountries()
    countries.value = data.value
  }

  return countries
}
