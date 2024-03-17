<template>
  <div class="py-10 px-5">
    <AddProduct
      @close="shouldDisplayAddModal = false"
      @refresh="fetchProductsList"
      v-if="shouldDisplayAddModal"
    />
    <div class="flex flex-col gap-y-4 pb-4 lg:flex-row lg:justify-between lg:items-start">
      <h2 class="flex flex-col gap-2">
        <span class="text-xl text-gray-900 font-bold">
          {{ t("products") }}
        </span>
        <span class="text-sm font-light">{{ t("description") }}</span>
      </h2>
      <ButtonWrapper
        class="text-sm py-2 w-[30%] lg:w-fit self-end"
        :theme="THEME.BLUE"
        :label="t('addProduct')"
        @click="shouldDisplayAddModal = true"
      />
    </div>
    <InLoading v-if="isLoading" />
    <div
      v-else-if="products.length > 0"
      class="max-w-[1920px] m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 xl:grid-col-5 gap-2"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :callback="goToProductDetails"
        :data-test="`${product.id}-product`"
      />
    </div>
    <EmptyList v-else />
  </div>
</template>

<script setup lang="ts">
import AddProduct from "@/components/AddProduct.vue";
import InLoading from "@/components/InLoading.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";
import type { Product } from "@/domain/product";
import { useApiStore } from "@/stores/api";
import { THEME } from "@/utils/enum";
import { defineAsyncComponent, onBeforeMount, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const EmptyList = defineAsyncComponent(
  () => import("@/components/EmptyList.vue")
);
const ProductCard = defineAsyncComponent(
  () => import("@/components/ProductCard.vue")
);

const api = useApiStore();

const isLoading = ref<boolean>(false);
const products = ref([]) as Ref<Product[]>;

const router = useRouter();
const goToProductDetails = async (productId: string) => {
  await router.push(`products/${productId}`);
};

const shouldDisplayAddModal = ref<boolean>(false);

const fetchProductsList =async (): Promise<void> => {
  shouldDisplayAddModal.value = false
  isLoading.value = true;
  products.value = await api.getAllProducts();
  isLoading.value = false;
}

onBeforeMount(async () => {
  await fetchProductsList();
});

const { t } = useI18n({
  messages: {
    en: {
      products: "List of products",
      addProduct: "+Add product",
      description: "Here you will find a list of available products",
    },
    fr: {
      products: "Liste des produits",
      addProduct: "+Ajouter un produit",
      description: "Ici vous trouverez une liste de produits disponibles",
    },
  },
});
</script>
