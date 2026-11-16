<script setup lang="ts">
defineProps<{
  inputId: string;
  className: string;
}>();

/** Label que abre o seletor de arquivos do `FileUpload` com o mesmo `id`. */
</script>

<template>
  <label :for="inputId" :class="className">
    <slot />
  </label>
</template>
