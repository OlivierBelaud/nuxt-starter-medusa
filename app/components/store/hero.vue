<script setup lang="ts">
</script>

<template>
  <div class="h-[75vh] w-full flex flex-col justify-center items-center text-center bg-color-muted border-b border-color-muted sm:p-32 gap-6">
    <div>
      <h1 class="text-3xl leading-10 tracking-tight text-color-highlighted">
        Ecommerce Starter Template
      </h1>
      <h2 class="text-3xl leading-10 tracking-tight">
        Powered by Medusa and Nuxt
      </h2>
    </div>
    <UButton
      to="https://github.com/OlivierBelaud/nuxt-starter-medusa"
      target="_blank"
      color="neutral"
      variant="subtle"
      :trailing="true"
      icon="i-simple-icons-github"
    >
      View on GitHub
    </UButton>
  </div>
</template>
