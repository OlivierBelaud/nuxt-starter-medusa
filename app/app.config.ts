export default defineAppConfig({
  title: 'Nuxt Medusa Storefront',
  defaultCountry: 'fr',
  defaultProductsPerPage: 4,
  homepageCollections: ['latest-drops', 'weekly-picks', 'sale'],
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
  },
})
