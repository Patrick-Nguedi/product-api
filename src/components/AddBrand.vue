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
        <TextField v-model="brand.name" :label="t('title')" />
        <TextareaField v-model="brand.description" :label="t('description')" />
        <div class="flex gap-2 justify-end items-center">
          <ButtonWrapper
            :label="t('cancel')"
            :theme="THEME.BORDER_BLUE"
            @click="close"
          />
          <ButtonWrapper
            :label="t('create')"
            :theme="THEME.BLUE"
            @click="createBrand"
          />
        </div>
      </section>
    </section>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, type Ref } from "vue";

import { THEME } from "@/utils/enum";

import ButtonWrapper from "@/components/ButtonWrapper.vue";
import TextField from "@/components/TextField.vue";
import TextareaField from "@/components/TextareaField.vue";
import CloseButton from "@/components/CloseButton.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useApiStore } from "@/stores/api";
import { type Builder } from "@/domain/brand";

const api = useApiStore();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const { t } = useI18n({
  messages: {
    en: {
      title: "Brand",
      description: "Description",
      create: "Create",
      cancel: "Cancel",
      formTitle: "Add brand form",
    },
    fr: {
      title: "Marque",
      description: "Description",
      create: "Créer",
      cancel: "Annuler",
      formTitle: "Formulaire d'ajout de marque",
    },
  },
});

const brand = ref<Builder>({
  name: "",
  description: "",
}) as Ref<Builder>;

const close = (): void => {
  emit("close");
};

const isLoading = ref<boolean>(false);

const createBrand = async (): Promise<void> => {
  isLoading.value = true;
  const productId = await api.createBrand(brand.value);
  if (productId) {
    emit("refresh");
  }
  isLoading.value = false;
};
</script>
