export const useUserCountry = () => {
  const countryCodeFromCookie = useCookie('user_country')

  const setUserCountry = (country?: BaseRegionCountryWithRegionId) => {
    if (!country) {
      return
    }
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
    if (!newCountry) {
      return
    }
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
