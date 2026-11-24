<script setup lang="ts">
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';
import { publicAsset } from '@/utils/publicAsset';

// Painel só de foto (V3.1): sem texto, sem círculos decorativos. Some abaixo de 1024px, como antes.
// Véu azul padrão do tema (`--scrim-photo`, o mesmo das outras fotos), para a foto não ficar clara demais.
const photoSrc = publicAsset('assets/refactor/campo-soja.jpeg');
</script>

<template>
  <div class="hidden flex-[65_1_0%] lg:flex">
    <TcPhotoSection
      :src="photoSrc"
      position="center"
      min-height="calc(100dvh - 2 * var(--page-gutter))"
      class="w-full"
      aria-hidden="true"
    />
  </div>
</template>
