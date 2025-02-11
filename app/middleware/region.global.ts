export default defineNuxtRouteMiddleware(async (to) => {
  const paramCountryCode = to.params.countryCode as string | undefined
  const { defaultCountry } = useAppConfig()

  const { userCountryCode, setCountry } = useUserCountry()

  if (!userCountryCode.value && !paramCountryCode) {
    return navigateTo(`/${defaultCountry}`)
  }

  const { data } = await useFetchRegions()
  const countries = getCountriesFromRegions(data.value?.regions)

  if (userCountryCode.value) {
    const countryFromCookie = countries.find(country => country.iso_2 === userCountryCode.value)
    if (countryFromCookie?.iso_2 !== paramCountryCode) {
      return navigateTo(`/${countryFromCookie?.iso_2}`)
    }
    return
  }

  if (paramCountryCode) {
    const countryFromNavigation = countries.find(country => country.iso_2 === paramCountryCode)
    if (!countryFromNavigation) {
      const countryFromDefault = countries.find(country => country.iso_2 === defaultCountry)
      if (countryFromDefault)
        setCountry(countryFromDefault)
      return navigateTo(`/${defaultCountry}`)
    }
    setCountry(countryFromNavigation)
  }
})
