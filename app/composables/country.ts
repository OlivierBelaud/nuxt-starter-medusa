export const useUserCountry = () => {
  const countryCodeFromCookie = useCookie('country_code', {
    maxAge: 60 * 60 * 24 * 365,
  })

  const setUserCountry = (country?: BaseRegionCountryWithRegionId) => {
    if (!country)
      return null
    countryCodeFromCookie.value = country.iso_2
  }

  return {
    userCountryCode: computed(() => countryCodeFromCookie.value || undefined),
    setUserCountry,
  }
}

// CurrentCountryStore
export const useCurrentCountry = () => {
  const { userCountryCode, setUserCountry } = useUserCountry()

  const country = useState<BaseRegionCountryWithRegionId | undefined>('country', () => undefined)

  function setCurrentCountry(newCountry?: BaseRegionCountryWithRegionId) {
    if (!newCountry)
      return
    country.value = newCountry
    setUserCountry(newCountry)
  }

  return {
    userCountryCode,
    currentCountry: readonly(country),
    currentCountryCode: computed(() => country.value?.iso_2),
    currentRegionId: computed(() => country.value?.region_id),
    setCurrentCountry,
  }
}
