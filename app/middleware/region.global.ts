export default defineNuxtRouteMiddleware(async (to) => {
  const newCountryCode = to.params.countryCode as string | undefined
  const { defaultCountry: defaultCountryCode } = useAppConfig()
  const { countryCode, country, setCountry } = useCountry()

  const countries = await useCountries()

  const defaultCountry = getCountryFromCountryCode(countries.value, defaultCountryCode)
  const newCountry = getCountryFromCountryCode(countries.value, newCountryCode)

  // Handle User Country from cookie
  if (countryCode.value && !country.value) {
    const userCountry = getCountryFromCountryCode(countries.value, countryCode.value)
    if (userCountry?.iso_2 !== newCountryCode) {
      setCountry(userCountry)
      return navigateTo(`/${userCountry?.iso_2}`)
    }
    setCountry(newCountry)
    return
  }

  if (newCountry) { // Check if the asked country is valid
    setCountry(newCountry)
    return
  }

  setCountry(defaultCountry)
  return navigateTo(`/${defaultCountry?.iso_2}`)
})
