<script setup lang="ts">
import Login from '@/flows/onboarding/login/Login.vue';
import CreatePasswordModal from './CreatePasswordModal.vue';

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Login />
  <CreatePasswordModal :is-open="true" @close="emit('close')" />
</template>
