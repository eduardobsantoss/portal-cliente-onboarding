<script setup lang="ts">
import { Smartphone } from 'lucide-vue-next';
import SmsVerification from '@/flows/onboarding/sms/SmsVerification.vue';
import { CHECKLIST_MASKED_PHONE } from '@/constants/documentChecklist';
import { SMS_TOPIC_TEXT, TOPIC_CONTENT_BASE_CLASS } from '@/constants/checklistTopics';
import ChecklistTopic from '@/flows/portal/complete-cadastro/comum/ChecklistTopic.vue';
import ValidationBadge from '@/flows/portal/complete-cadastro/comum/ValidationBadge.vue';

defineProps<{
  phoneVerified: boolean;
  phoneVerifiedAt: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
  verified: [];
}>();

/** Seção 1: Confirmação do Telefone por SMS (reaproveita o SmsVerification do onboarding). */
</script>

<template>
  <ChecklistTopic
    :is-done="phoneVerified"
    :title="SMS_TOPIC_TEXT.title"
    :subtitle="SMS_TOPIC_TEXT.subtitle"
    :is-open="isOpen"
    :content-class-name="TOPIC_CONTENT_BASE_CLASS"
    @toggle="emit('toggle')"
  >
    <template #icon><Smartphone :size="18" /></template>
    <template #badge>
      <ValidationBadge :is-done="phoneVerified" done-label="Concluído" variant="topic" />
    </template>

    <SmsVerification
      :is-verified="phoneVerified"
      :masked-phone="CHECKLIST_MASKED_PHONE"
      :verified-at="phoneVerifiedAt"
      @verified="emit('verified')"
    />
  </ChecklistTopic>
</template>
