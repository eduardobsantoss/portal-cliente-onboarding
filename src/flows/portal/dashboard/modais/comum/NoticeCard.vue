<script setup lang="ts">
/** Cartão informativo (ícone + título + texto) dos modais de envio de arquivos. */
defineProps<{
  title: string;
  text: string;
  className: string;
  iconBoxClassName: string;
  titleClassName: string;
  textClassName: string;
}>();
</script>

<template>
  <div :class="className">
    <div :class="iconBoxClassName"><slot name="icon" /></div>
    <div>
      <h4 :class="titleClassName">{{ title }}</h4>
      <p :class="textClassName">{{ text }}</p>
    </div>
  </div>
</template>
