<template>
  <div class="flex flex-col gap-7 items-center justify-center min-h-[60vh]">
    <div>
      <img :src="path" class="object-scale-down" />
    </div> 
    <span data-test="empty-description" class="text-blue-900 font-thin font-sans text-2xl">{{ t(description) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

withDefaults(
  defineProps<{
    description?: string;
  }>(),
  {
    description: "emptyList",
  },
);

const { t } = useI18n({
  messages: {
    en: {
      emptyList: "Empty list",
    },
    fr: {
      emptyList: "Liste vide",
    },
  },
});

const path = computed(() => new URL("../assets/empty-list.png", import.meta.url)
    .href);
</script>
