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
        <nav class="flex items-center space-x-6 flex-1 basis-0 justify-end">
          <AppLink
            to="/store"
            class="hidden sm:flex"
          >
            Store
          </AppLink>
          <AppLink
            to="/account"
            class="hidden sm:flex"
          >
            Account
          </AppLink>
          <!-- <LazyCartDropdown /> -->
        </nav>
      </UContainer>
      <AppHeaderSideMenu
        v-model="isSideMenuOpen"
      />
    </header>
  </div>
</template>
