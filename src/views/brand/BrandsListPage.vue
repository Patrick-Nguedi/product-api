<template>
  <div class="p-10">
    <AddBrand
      @close="shouldDisplayAddModal = false"
      @refresh="fetchBrandsList"
      v-if="shouldDisplayAddModal"
    />
    <div class="flex justify-between items-start">
      <h2 class="flex flex-col gap-0.5">
        <span class="text-xl text-gray-900 font-bold">
          {{ t("products") }}
        </span>
        <span class="text-sm font-light">{{ t("description") }}</span>
      </h2>
      <TwButton
        class="text-sm py-2"
        :theme="THEME.BLUE"
        :cta="t('addProduct')"
        @click="shouldDisplayAddModal = true"
      />
    </div>
    <InLoading v-if="isLoading" />
    <div
      v-else-if="brands.length > 0"
      class="max-w-[1920px] m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl:grid-col-5 gap-2"
    >
      <BrandCard
        v-for="brand in brands"
        :key="brand.id"
        :brand="brand"
        :callback="goToBrandDetails"
      />
    </div>
    <EmptyList v-else />
  </div>
</template>

<script setup lang="ts">
import AddBrand from "@/components/AddBrand.vue";
import type { Brand } from "@/domain/brand";
import { useApiStore } from "@/stores/api";
import { THEME } from "@/utils/enum";
import { defineAsyncComponent, onBeforeMount, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const EmptyList = defineAsyncComponent(
  () => import("@/components/EmptyList.vue"),
);
const BrandCard = defineAsyncComponent(
  () => import("@/components/BrandCard.vue"),
);

const api = useApiStore();

const isLoading = ref<boolean>(false);
const brands = ref([]) as Ref<Brand[]>;

const router = useRouter();
const goToBrandDetails = async (brandId: string) => {
  await router.push(`brands/${brandId}`);
};

const shouldDisplayAddModal = ref<boolean>(false);

const fetchBrandsList =async (): Promise<void> => {
  shouldDisplayAddModal.value = false
  isLoading.value = true;
  brands.value = await api.getAllBrands();
  isLoading.value = false;
}

onBeforeMount(async () => {
  await fetchBrandsList();
});

const { t } = useI18n({
  messages: {
    en: {
      products: "List of Brands",
      addProduct: "+Add brand",
      description: "Here you will find a list of available brands",
    },
    fr: {
      products: "Liste des marques",
      addProduct: "+Ajouter une marque",
      description: "Ici vous trouverez une liste de marques",
    },
  },
});
</script>
