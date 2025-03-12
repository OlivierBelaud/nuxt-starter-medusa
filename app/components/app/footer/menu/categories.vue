<script lang="ts" setup>
const { data } = await useFetchCategories()
const categories = computed(() => data.value?.product_categories.filter(category => !category.parent_category))
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
        <ul
          v-if="category.category_children.length"
          class="grid grid-cols-1 gap-y-2 pl-4 pt-2"
        >
          <li
            v-for="children in category.category_children"
            :key="children.id"
          >
            <AppLink
              :to="`/categories/${children.handle}`"
            >
              {{ children.name }}
            </AppLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
