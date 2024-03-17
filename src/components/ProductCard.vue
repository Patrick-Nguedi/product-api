<template>
  <section
    @click="callback(product.id)"
    class="rounded-lg p-4 bg-white space-y-4 divide divide-y border hover:shadow hover:border-blue-500 cursor-pointer"
  >
    <div>
      <div class="flex gap-x-2 items-center">
        <span class="text-sm text-gray-500">{{ t("name_lbl") }}</span>
        <h1 data-test="product-name" class="text-blue-500">{{ product.name }}</h1>
      </div>
      <div class="flex gap-x-2 items-center">
        <span class="text-sm text-gray-500">{{ t("brand_lbl") }}</span>
        <span data-test="product-brand" class="text-blue-500">{{ product.brand.name }}</span>
      </div>
    </div>
    <div class="flex gap-x-2 items-center">
      <span class="text-sm text-gray-500">{{ t("decription_lbl") }}</span>
      <p data-test="product-description" class="text-sm text-blue-500">{{ product.description }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from "@/domain/product";
import { useI18n } from "vue-i18n";

defineProps<{
  product: Product;
  callback: (id: string) => Promise<void>;
}>();

const { t } = useI18n({
  messages: {
    en: {
      name_lbl: "Name:",
      brand_lbl: "Brand:",
      decription_lbl: "Description:",

    },
    fr: {
      name_lbl: "Nom:",
      brand_lbl: "Marque:",
      decription_lbl: "Description:",
    },
  },
});
</script>
