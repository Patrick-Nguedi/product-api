<template>
  <div v-if="isLoading" class="p-5 flex justify-center items-center">
    <InLoading />
  </div>
  <div class="flex flex-col gap-2 p-10" v-else>
    <EditProduct
      v-if="shouldOpenEditModalForm"
      :product="product"
      @close="changeOpenEditModalState"
      @refresh="fetchProductDetails"
    />
    <TwBreadcrumb :breadcrumb="breadcrumb" />
    <div
      class="bg-white rounded-lg p-10 flex justify-between border border-gray-600"
    >
      <div class="flex flex-col gap-2">
        <span>{{ t("name") }}</span>
        <div>{{ product.name }}</div>
      </div>
      <div class="flex gap-2 items-center">
        <ButtonWrapper
          @click="changeOpenEditModalState"
          :disabled="isPerformDelete"
          :label="t('edit')"
          :theme="THEME.BLUE"
        />
        <ButtonWrapper
          @click="deleteProduct"
          :is-loading="isPerformDelete"
          :label="t('delete')"
          :theme="THEME.RED"
        />
      </div>
    </div>
    <div
      class="bg-white rounded-lg p-10 flex gap-5 border border-gray-600"
    >
      <div class="flex flex-col gap-5 shrink-0">
        <span>{{ t("createdAt") }}</span>
        <span>{{ getLocalDateTime(product.createdAt) }}</span>
      </div>
      <div class="border-l border-gray-100 pl-4 flex flex-col gap-4 basis-full">
        <h2>{{ t("editionDates") }}</h2>
        <div
          v-for="editionDate in product.editionDates"
          :key="editionDate"
          class="flex flex-col gap-2"
        >
          <span>{{ getLocalDateTime(editionDate) }}</span>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-lg p-10 flex flex-col gap-2 border border-gray-600"
    >
      <span>{{ t("description") }}</span>
      <div>{{ product.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditProduct from "@/components/EditProduct.vue";
import InLoading from "@/components/InLoading.vue";
import TwBreadcrumb from "@/components/TwBreadcrumb.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";
import { NullableProduct, Product } from "@/domain/product";
import { useApiStore } from "@/stores/api";
import { getLocalDateTime } from "@/utils/clock";
import { THEME } from "@/utils/enum";
import type { Link } from "@/utils/type";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const api = useApiStore();

const product = ref<Product>(NullableProduct()) as Ref<Product>;
const props = defineProps<{
  productId: string;
}>();

const { t } = useI18n({
  messages: {
    en: {
      products: "Products",
      name: "Wording",
      description: "Description",
      edit: "Edit",
      delete: "Delete",
      editionDates: "Edition dates",
      createdAt: "Created on",
    },
    fr: {
      products: "Produits",
      name: "Libelle",
      description: "Description",
      edit: "Editer",
      delete: "Supprimer",
      editionDates: "Dates d'édition",
      createdAt: "Créé le",
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
