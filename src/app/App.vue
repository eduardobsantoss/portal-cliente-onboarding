<script setup lang="ts">
import { reactive } from 'vue';
import { useOnboardingFlow } from '@/hooks/useOnboardingFlow';
import OnboardingRouter from '@/app/OnboardingRouter.vue';
import DemoBackButton from '@/components/layout/DemoBackButton.vue';

// `reactive` desembrulha os refs do composable para uso direto nos templates (flow.currentView).
const flow = reactive(useOnboardingFlow());
</script>

<template>
  <OnboardingRouter :flow="flow" />
  <DemoBackButton :visible="flow.canGoBack" @back="flow.goBack" />
</template>
