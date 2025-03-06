<script setup lang="ts">
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtLoadingIndicator color="black" />
    <main class="relative">
      <slot />
    </main>
    <AppFooter />
  </UApp>
</template>
