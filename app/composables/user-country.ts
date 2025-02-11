export const useUserCountry = () => {
  const regionIdFromCookie = useCookie('user_region')
  const countryCodeFromCookie = useCookie('user_country')

  const setCountry = (country: BaseRegionCountryWithRegionId) => {
    regionIdFromCookie.value = country.region_id
    countryCodeFromCookie.value = country.iso_2
  }

  return {
    userRegionId: readonly(regionIdFromCookie),
    userCountryCode: readonly(countryCodeFromCookie),
    setCountry,
  }
}
