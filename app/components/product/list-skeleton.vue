<script lang="ts" setup>
</script>

<template>
  <ul
    class="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8"
  >
    <li
      v-for="product in 4"
      :key="product"
    >
      <ProductCard
        :product="undefined"
      />
    </li>
  </ul>
</template>
