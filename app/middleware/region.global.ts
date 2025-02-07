export default defineNuxtRouteMiddleware(async (to) => {
  const countryCodeParam = to.params.countryCode as string
  const { defaultCountry } = useAppConfig()

  const { data } = await useFetchRegions()
  const countries = getCountriesFromRegions(data.value?.regions)

  const { setCurrentCountryCode, setCountries, setRegionId, currentCountryCode } = useRegions()

  if (currentCountryCode.value !== countryCodeParam) {
    setCurrentCountryCode(countryCodeParam || defaultCountry)
    setCountries(countries)
    setRegionId()
  }

  if (
    !countryCodeParam
    || (
      countryCodeParam !== defaultCountry
      && !countries?.find(country => country?.iso_2 === countryCodeParam)
    )
  ) {
    return navigateTo(`/${defaultCountry}`)
  }
})
