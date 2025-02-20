<script setup lang="ts">
const { title } = useAppConfig()
</script>

<template>
  <header class="h-16 mx-auto duration-200 bg-white border-b border-color-muted">
    <UContainer class="flex items-center justify-between w-full h-full text-xs">
      <AppLink
        to="/cart"
        class="uppercase text-xs font-medium h-full flex items-center gap-2 flex-1 basis-0"
      >
        <UIcon
          name="i-lucide-chevron-left"
          class="size-4"
        />
        <span>Back to shopping cart</span>
      </AppLink>
      <AppLink
        to="/"
        class="uppercase text-lg font-medium h-full flex items-center"
      >
        {{ title }}
      </AppLink>
      <div class="flex-1 basis-0" />
    </UContainer>
  </header>
</template>
