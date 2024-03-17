<template>
  <div v-if="isLoading" class="p-5 flex justify-center items-center">
    <InLoading />
  </div>
  <div class="flex flex-col gap-2 px-5 py-10 md:px-10" v-else>
    <EditProduct
      v-if="shouldOpenEditModalForm"
      :product="product"
      @close="changeOpenEditModalState"
      @refresh="fetchProductDetails"
    />
    <Breadcrumb :breadcrumb="breadcrumb" />
    <div
      class="bg-blue-50 border bordder-white w-full rounded-lg p-5 flex flex-col gap-y-3 shadow-md mt-4"
    >
      <div class="flex flex-col items-start w-full">
        <div class="flex gap-x-2 order-2 items-center">
          <span class="text-sm text-gray-500">{{ t("name") }}</span>
          <div data-test="product-name" class="text-blue-500 font-semibold">{{ product.name }}</div>
        </div>
        <div class="flex gap-x-3 items-center order-1 self-end">
          <div class="p-1 cursor-pointer border border-blue-500 rounded-md">
            <EditIcon class="w-5 h-5" @click="changeOpenEditModalState" />
          </div>
          <div class="p-1 cursor-pointer border border-red-500 rounded-md">
            <DeleteIcon class="w-5 h-5" @click="deleteProduct" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 w-full">
        <div class="flex gap-x-2 items-center">
          <span class="text-sm text-gray-500">{{ t("brand") }}</span>
          <span data-test="product-brand" class="text-blue-500 font-medium">
            {{ product.brand.name }}
          </span>
        </div>
        <div class="flex gap-x-2 w-full items-center">
          <span class="text-sm text-gray-500">
            {{ t("createdAt") }}
          </span>
          <span data-test="product-createdAt" class="text-blue-500 font-medium">
           {{ getLocalDateTime(product.createdAt) }}
          </span>
        </div>
        <div class="flex gap-x-2 w-full items-center">
          <span class="text-sm text-gray-500">{{ t("description") }}</span>
          <div data-test="product-description" class="text-blue-500 font-medium">{{ product.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import { useApiStore } from "@/stores/api";
import { THEME } from "@/utils/enum";
import EditProduct from "@/components/EditProduct.vue";
import InLoading from "@/components/InLoading.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import DeleteIcon from "@/components/svg/DeleteIcon.vue";
import EditIcon from "@/components/svg/EditIcon.vue";
import { NullableProduct, Product } from "@/domain/product";
import { getLocalDateTime } from "@/utils/clock";
import type { Link } from "@/utils/type";

const api = useApiStore();

const product = ref<Product>(NullableProduct()) as Ref<Product>;
const props = defineProps<{
  productId: string;
}>();

const { t } = useI18n({
  messages: {
    en: {
      products: "Products",
      name: "Name:",
      description: "Description:",
      edit: "Edit",
      delete: "Delete",
      createdAt: "Created on:",
      brand: "Brand:",
    },
    fr: {
      products: "Produits",
      name: "Libelle",
      description: "Description",
      edit: "Editer",
      delete: "Supprimer",
      createdAt: "Créé le",
      brand: "Marque:",
    },
  },
});

const breadcrumb = computed((): Link[] => {
  return [
    {
      name: t("products"),
      path: "/",
    },
    {
      name: product.value.name,
      path: "",
    },
  ];
});

const shouldOpenEditModalForm = ref<boolean>(false);
const changeOpenEditModalState = () => {
  shouldOpenEditModalForm.value = !shouldOpenEditModalForm.value;
};

const isLoading = ref<boolean>(false);
const fetchProductDetails = async (): Promise<void> => {
  isLoading.value = true;
  product.value = await api.getProductById(props.productId);
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchProductDetails();
});

const isPerformDelete = ref<boolean>(false);
const deleteProduct = async (): Promise<void> => {
  isPerformDelete.value = true;
  await api.deleteProduct(props.productId);
  isPerformDelete.value = false;
};
</script>
