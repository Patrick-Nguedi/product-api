<template>
  <button
    :data-test="label"
    :disabled="disabled || isLoading"
    :class="[
      'font-bold outline-none text-xs flex justify-center items-center rounded px-2 py-1',
      theme.toLowerCase(),
      { 'cursor-pointer': !disabled || !isLoading },
    ]"
  >
    <span class="loader" v-if="isLoading"></span>
    <slot v-else name="content" :label="label">{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  theme: string;
  disabled?: boolean;
  isLoading?: boolean;
}>();
</script>

<style scoped>
.blue {
  @apply bg-blue-500 text-white;
}

.border_blue {
  @apply border border-gray-300 text-black;
}

.gray {
  @apply bg-gray-200/80 text-gray-900/40;
}

.dark_gray {
  @apply bg-gray-900 text-white;
}

.red {
  @apply bg-red-500 text-white;
}

.green {
  @apply bg-green-600 text-white;
}

.light_blue {
  @apply bg-blue-400 text-white;
}

.loader {
  @apply w-6 h-6 rounded-full border-2 border-gray-100 border-t-indigo-800 animate-spin;
}
</style>
