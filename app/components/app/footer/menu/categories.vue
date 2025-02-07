<script lang="ts" setup>
const { data } = useFetchCategories()
const categories = computed(() => data.value?.product_categories)
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="font-medium text-color-highlighted">
      Categories
    </div>
    <ul class="grid grid-cols-1 gap-y-2">
      <li
        v-for="category in categories"
        :key="category.id"
      >
        <AppLink
          :to="`/categories/${category.handle}`"
        >
          {{ category.name }}
        </AppLink>
      </li>
    </ul>
  </div>
</template>
