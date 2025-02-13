<script lang="ts" setup>
const { title } = useAppConfig()

const {
  minimal,
} = defineProps<{
  minimal?: boolean
}>()
</script>

<template>
  <div
    class="flex w-full text-color-dimmed text-xs"
    :class="[minimal ? 'py-4 justify-center' : 'mb-16 justify-between']"
  >
    <div
      v-if="!minimal"
      class=""
    >
      © 2025 {{ title }}. All rights reserved.
    </div>
    <div class="flex gap-x-2 items-center">
      <div>Powered by</div>
      <NuxtLink
        href="https://medusajs.com"
        target="_blank"
        class="hover:text-color-muted"
      >
        <UIcon
          name="i-simple-icons-medusa"
          class="size-5"
        />
      </NuxtLink>
      <span>&</span>
      <NuxtLink
        href="https://nuxt.com/"
        target="_blank"
        class="hover:text-color-muted"
      >
        <UIcon
          name="i-simple-icons-nuxtdotjs"
          class="size-6"
        />
      </NuxtLink>
    </div>
  </div>
</template>
