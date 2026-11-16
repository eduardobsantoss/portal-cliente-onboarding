<script setup lang="ts">
import CanhotoExplanationCard from './CanhotoExplanationCard.vue';
import RecognitionLinkExplanationCard from './RecognitionLinkExplanationCard.vue';

const emit = defineEmits<{ continue: [] }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <CanhotoExplanationCard />

    <RecognitionLinkExplanationCard @continue="emit('continue')" />
  </div>
</template>
