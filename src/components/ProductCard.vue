<template>
  <section
    @click="callback(product.id)"
    class="rounded-lg bg-white max-w-xs space-y-4 divide divide-y border hover:shadow cursor-pointer"
  >
    <div>
      <h1>{{ product.name }}</h1>
      <span>{{ product.brand.name }}</span>
    </div>
    <p>{{ product.description }}</p>
  </section>
</template>

<script setup lang="ts">
import type { Product } from "@/domain/product";

defineProps<{
  product: Product;
  callback: (id: string) => Promise<void>;
}>();
</script>
