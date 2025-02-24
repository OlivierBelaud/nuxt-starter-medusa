<script setup lang="ts">
</script>

<template>
  <div>
    <ClientOnly>
      <StoreCatalog
        title="All products"
      />
      <template #fallback>
        <StoreCatalog
          title="All products"
        />
      </template>
    </ClientOnly>
  </div>
</template>
