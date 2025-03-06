<script setup lang="ts">
const { title } = useAppConfig()
</script>

<template>
  <header class="h-16 mx-auto duration-200 bg-white border-b border-color-muted">
    <UContainer class="flex items-center justify-between w-full h-full text-xs">
      <AppLink
        to="/cart"
        class=" -full flex-1 basis-0"
      >
        <div class="flex items-center gap-2 uppercase text-xs font-medium">
          <UIcon
            name="i-lucide-chevron-left"
            class="size-4"
          />
          <span>Back to shopping cart</span>
        </div>
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
