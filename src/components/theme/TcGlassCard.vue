<script setup lang="ts">
// Só é válido dentro de TcPhotoSection ou TcBrandSection (vidro exige fundo de foto ou azul).
</script>

<template>
  <div
    class="rounded-[var(--radius-lg)] border border-[color:var(--glass-border)] bg-[var(--glass-bg)] p-[var(--space-5)] backdrop-blur-md"
  >
    <slot />
  </div>
</template>
