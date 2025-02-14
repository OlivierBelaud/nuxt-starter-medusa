export default defineNuxtRouteMiddleware(async (to) => {
  const newCountryCode = to.params.countryCode as string | undefined
  const { defaultCountry: defaultCountryCode } = useAppConfig()
  const { userCountryCode, setCurrentCountry } = useCurrentCountry()

  // setCurrentCountry({
  //   iso_2: newCountryCode,
  // })
  // return

  const { data } = await useFetchRegions()
  const countries = getCountriesFromRegions(data.value?.regions)

  function getCountryFromCountryCode(countryCode?: string) {
    return countries.find(country => country.iso_2 === countryCode)
  }

  const defaultCountry = getCountryFromCountryCode(defaultCountryCode)
  const newCountry = getCountryFromCountryCode(newCountryCode)

  // Handle User Country from cookie
  if (userCountryCode.value) {
    const userCountry = getCountryFromCountryCode(userCountryCode.value)
    if (userCountry?.iso_2 !== newCountryCode) {
      setCurrentCountry(userCountry)
      return navigateTo(`/${userCountry?.iso_2}`)
    }
    setCurrentCountry(newCountry)
    return
  }

  if (newCountry) { // Check if the asked country is valid
    setCurrentCountry(newCountry)
    return
  }

  setCurrentCountry(defaultCountry)
  return navigateTo(`/${defaultCountry?.iso_2}`)
})
