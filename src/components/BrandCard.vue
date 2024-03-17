<template>
  <div
    class="flex gap-3 bg-white rounded-md cursor-pointer"
    @click="callback(brand.id)"
  >
    <h2>{{ brand.name }}</h2>
    <div>{{ brand.description }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Brand } from "@/domain/brand";

defineProps<{
  brand: Brand;
  callback: (id: string) => Promise<void>;
}>();
</script>
