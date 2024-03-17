<template>
  <ModalWrapper>
    <section class="bg-white rounded-xl flex flex-col w-[90%] max-w-[500px]">
      <section
        class="font-semibold flex flex-col p-4 border-b border-dashed border-gray-200"
      >
        <CloseButton class="self-end" @click="close" />
        <div class="text-lg">{{ t("formTitle") }}</div>
      </section>
      <section class="p-5 flex flex-col gap-4">
        <TextField v-model="product.name" :label="t('title')" />
        <DropdownField
          v-model="product.brand"
          :options="brandList"
          :label="t('type')"
        />
        <TextareaField
          v-model="product.description"
          :label="t('description')"
        />
        <div class="flex gap-2 justify-end items-center">
          <ButtonWrapper
            :label="t('cancel')"
            :theme="THEME.BORDER_BLUE"
            @click="close"
          />
          <ButtonWrapper
            :label="t('edit')"
            :theme="THEME.BLUE"
            @click="createHoliday"
          />
        </div>
      </section>
    </section>
  </ModalWrapper>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, ref, type Ref } from "vue";

import { THEME } from "@/utils/enum";
import { BrandItem } from "@/utils/interface";

import ButtonWrapper from "@/components/ButtonWrapper.vue";
import TextField from "@/components/TextField.vue";
import DropdownField from "@/components/DropdownField.vue";
import TextareaField from "@/components/TextareaField.vue";
import CloseButton from "@/components/CloseButton.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useApiStore } from "@/stores/api";
import type { Builder, Product } from "@/domain/product";

const api = useApiStore();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const { t } = useI18n({
  messages: {
    en: {
      type: "Brand",
      description: "Description",
      title: "Wording",
      edit: "Save",
      cancel: "Cancel",
      formTitle: "Add product form",
    },
    fr: {
      type: "Marque",
      description: "Description",
      title: "Libellé",
      edit: "Enregistrer",
      cancel: "Annuler",
      formTitle: "Formulaire d'ajout de produit",
    },
  },
});

const props = defineProps<{
  product: Product;
}>();

const product = ref<Builder>({
  name: props.product.name,
  description: props.product.description,
  brand: props.product.brand,
}) as Ref<Builder>;

const brandList = ref<BrandItem[]>([]);

onBeforeMount(async () => {
  const list = await api.getAllBrands();
  brandList.value = list.map((item) => new BrandItem(item));
});

const close = (): void => {
  emit("close");
};

const isLoading = ref<boolean>(false);

const createHoliday = async (): Promise<void> => {
  isLoading.value = true;

  const payload = props.product;
  payload.name = product.value.name;
  payload.description = product.value.description;
  payload.brand = product.value.brand;

  await api.editProduct(payload);
  emit("refresh");
  isLoading.value = false;
};
</script>