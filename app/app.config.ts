export default defineAppConfig({
  title: 'Nuxt Medusa Storefront',
  defaultCountry: 'fr',
  defaultProductsPerPage: 12,
  homepageCollections: ['latest-drops', 'weekly-picks', 'sale'],
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
  },
})
