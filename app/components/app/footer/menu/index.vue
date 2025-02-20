<script lang="ts" setup>
const { title } = useAppConfig()
</script>

<template>
  <footer class="flex flex-col gap-y-6 sm:flex-row items-start justify-between py-40">
    <AppLink
      to="/"
      class="text-lg uppercase font-medium text-color-highlighted"
    >
      {{ title }}
    </AppLink>
    <div class="gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 text-sm">
      <AppFooterMenuCategories />
      <AppFooterMenuCollections />
      <AppFooterMenuBrand />
    </div>
  </footer>
</template>
