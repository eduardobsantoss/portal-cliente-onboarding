<script setup lang="ts">
/**
 * Shared "eyebrow + title + description" header used at the top of page sections.
 * All classes are supplied by the caller so each section keeps its exact spacing,
 * color and alignment.
 */
interface SectionHeadingProps {
  eyebrow?: string;
  wrapperClass?: string;
  eyebrowClass?: string;
  titleClass?: string;
  descriptionClass?: string;
}

withDefaults(defineProps<SectionHeadingProps>(), {
  eyebrow: '',
  wrapperClass: '',
  eyebrowClass: '',
  titleClass: '',
  descriptionClass: '',
});
</script>

<template>
  <div :class="wrapperClass">
    <span v-if="eyebrow" :class="eyebrowClass">{{ eyebrow }}</span>
    <h2 :class="titleClass">
      <slot />
    </h2>
    <p v-if="$slots.description" :class="descriptionClass">
      <slot name="description" />
    </p>
  </div>
</template>
