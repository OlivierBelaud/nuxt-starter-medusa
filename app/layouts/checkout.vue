<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <AppHeaderCheckout />
    <NuxtLoadingIndicator color="black" />
    <main class="relative">
      <slot />
    </main>
    <AppFooterMinimal />
  </UApp>
</template>
