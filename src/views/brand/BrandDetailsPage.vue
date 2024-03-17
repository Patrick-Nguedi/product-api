<template>
  <div v-if="isLoading" class="p-5 flex justify-center items-center">
    <InLoading />
  </div>
  <div class="flex flex-col gap-2 p-10" v-else>
    <EditBrand
      v-if="shouldOpenEditModalForm"
      :brand="brand"
      @close="changeOpenEditModalState"
      @refresh="fetchBrandDetails"
    />
    <TwBreadcrumb :breadcrumb="breadcrumb" />
    <div
      class="bg-white rounded-lg p-10 flex justify-between border border-gray-600"
    >
      <div class="flex flex-col gap-2">
        <span>{{ t("brand") }}</span>
        <div>{{ brand.name }}</div>
      </div>
      <div class="flex gap-2 items-center">
        <TwButton
          @click="changeOpenEditModalState"
          :disabled="isPerformDelete"
          :cta="t('edit')"
          :theme="THEME.BLUE"
        />
        <TwButton
          :is-loading="isPerformDelete"
          @click="deleteBrand"
          :cta="t('delete')"
          :theme="THEME.RED"
        />
      </div>
    </div>
    <div
      class="bg-white rounded-lg p-10 flex flex-col gap-2 border border-gray-600"
    >
      <span>{{ t("description") }}</span>
      <div>{{ brand.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditBrand from "@/components/EditBrand.vue";
import InLoading from "@/components/InLoading.vue";
import TwBreadcrumb from "@/components/TwBreadcrumb.vue";
import TwButton from "@/components/TwButton.vue";
import { NullableBrand, type Brand } from "@/domain/brand";
import { useApiStore } from "@/stores/api";
import { THEME } from "@/utils/enum";
import type { Link } from "@/utils/type";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const api = useApiStore();

const brand = ref<Brand>(NullableBrand()) as Ref<Brand>;
const props = defineProps<{
  brandId: string;
}>();

const { t } = useI18n({
  messages: {
    en: {
      brands: "Brands",
      name: "Brand",
      description: "Description",
      edit: "Edit",
      delete: "Delete",
    },
    fr: {
      brands: "Marques",
      name: "Marque",
      description: "Description",
      edit: "Editer",
      delete: "Supprimer",
    },
  },
});

const breadcrumb = computed((): Link[] => {
  return [
    {
      name: t("brands"),
      path: "/brands",
    },
    {
      name: brand.value.name,
      path: "",
    },
  ];
});

const shouldOpenEditModalForm = ref<boolean>(false);
const changeOpenEditModalState = () => {
  shouldOpenEditModalForm.value = !shouldOpenEditModalForm.value;
};

const isLoading = ref<boolean>(false);
const fetchBrandDetails = async (): Promise<void> => {
  isLoading.value = true;
  brand.value = await api.getBrandById(props.brandId);
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchBrandDetails();
});

const isPerformDelete = ref<boolean>(false);
const deleteBrand = async (): Promise<void> => {
  isPerformDelete.value = true;
  await api.deleteBrand(props.brandId);
  isPerformDelete.value = false;
};
</script>
