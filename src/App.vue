<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const navBar = ref<HTMLElement | undefined>(undefined);
const height = ref<string | undefined>(undefined);

const route = useRoute();
const router = useRouter();

const goTo = async (path: string): Promise<void> => {
  await router.push("/" + path);
};

onMounted(() => {
  height.value = navBar.value?.getBoundingClientRect().height + "px";
});

const { t } = useI18n({
  messages: {
    en: {
      products: "Products",
      brands: "Brands"
    },
    fr: {
      products: "Produits",
      brands: "Marques"
    },
  }
})
</script>

<template>
  <section>
    <header
      class="py-2 divide-x text-gray-900 cursor-pointer font-thin divide-gray-400 flex gap-4 items-center justify-center"
      ref="navBar"
    >
      <span
        @click="goTo('products')"
        :class="[
          'px-7 transition ease-in duration-300',
          { 'font-light text-xl text-blue-900': route.meta.tag === 'product' },
        ]"
      >
        {{ t("products") }}
      </span>
      <span
        @click="goTo('brands')"
        :class="[
          'px-7 transition ease-in duration-300',
          { 'font-light text-xl text-blue-900': route.meta.tag === 'brand' },
        ]"
      >
        {{ t("brands") }}
      </span>
    </header>
    <main class="--base-height">
      <RouterView></RouterView>
    </main>
  </section>
</template>

<style scoped>
.--base-height {
  height: calc(100vh - v-bind(height));
}
</style>
