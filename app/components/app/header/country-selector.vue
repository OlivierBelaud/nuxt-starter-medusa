<script setup lang="ts">
const {
  countries,
} = defineProps<{
  countries?: BaseRegionCountryWithRegionId[]
}>()

const emit = defineEmits<{
  'select:country': []
}>()

const route = useRoute()

const isOpen = ref(false)

function handleCountryChange(newCountry: BaseRegionCountryWithRegionId) {
  const path = route.path.split('/').slice(2).join('/') ? `/${route.path.split('/').slice(2).join('/')}` : ''
  navigateTo(`/${newCountry.iso_2}${path}`)
  isOpen.value = false
  setTimeout(() => {
    emit('select:country')
  }, 200)
}
</script>

<template>
  <UPopover
    ref="countrySelectorPopover"
    v-model:open="isOpen"
    mode="hover"
    :content="{
      align: 'start',
      side: 'top',
      sideOffset: 12,
    }"
    :ui="{ content: 'min-w-80' }"
  >
    <slot />
    <template #content>
      <ul class="py-2 max-h-96 overflow-auto">
        <li
          v-for="country in countries"
          :key="country.iso_2"
          class="hover:bg-color-elevated"
        >
          <ULink
            active-class="text-color-highlighted"
            class="flex items-center w-full px-4 py-3"
            @click="handleCountryChange(country)"
          >
            <div class="flex items-center space-x-2 uppercase text-sm">
              <UIcon :name="`i-flag-${country.iso_2}-4x3`" />
              <span>{{ country.display_name }}</span>
            </div>
          </ULink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
