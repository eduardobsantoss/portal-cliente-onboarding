<script setup lang="ts">
import { QrCode } from 'lucide-vue-next';
import FacialVerification from '@/flows/portal/verificacao-facial/FacialVerification.vue';
import { FACIAL_TOPIC_TEXT, TOPIC_CONTENT_BASE_CLASS } from '@/constants/checklistTopics';
import ChecklistTopic from '@/flows/portal/complete-cadastro/comum/ChecklistTopic.vue';
import ValidationBadge from '@/flows/portal/complete-cadastro/comum/ValidationBadge.vue';

defineProps<{
  facialVerified: boolean;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
  verified: [];
}>();

/** Seção 2: Reconhecimento & Biometria Facial (QR Code). */
</script>

<template>
  <ChecklistTopic
    :is-done="facialVerified"
    :title="FACIAL_TOPIC_TEXT.title"
    :subtitle="FACIAL_TOPIC_TEXT.subtitle"
    :is-open="isOpen"
    :content-class-name="TOPIC_CONTENT_BASE_CLASS"
    @toggle="emit('toggle')"
  >
    <template #icon><QrCode :size="18" /></template>
    <template #badge>
      <ValidationBadge :is-done="facialVerified" done-label="Concluído" variant="topic" />
    </template>

    <FacialVerification :is-verified="facialVerified" @verified="emit('verified')" />
  </ChecklistTopic>
</template>
