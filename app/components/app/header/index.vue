<script setup lang="ts">
const { title } = useAppConfig()

const isSideMenuOpen = ref(false)
</script>

<template>
  <div class="sticky top-0 inset-x-0 z-50">
    <header class="h-16 mx-auto duration-200 bg-white border-b border-color-muted">
      <UContainer class="flex items-center justify-between w-full h-full text-xs">
        <div
          class="cursor-pointer h-full flex items-center flex-1 basis-0"
          @click="isSideMenuOpen = !isSideMenuOpen"
        >
          Menu
        </div>
        <AppLink
          to="/"
          class="uppercase text-lg font-medium h-full flex items-center"
        >
          {{ title }}
        </AppLink>
        <div class="flex-1 basis-0">
          <nav class="flex items-center space-x-6">
            <AppLink
              to="/account"
              class="hidden sm:flex"
            >
              Account
            </AppLink>
            <LazyCartDropdown />
          </nav>
        </div>
      </UContainer>
      <AppHeaderSideMenu
        v-model="isSideMenuOpen"
      />
    </header>
  </div>
</template>
