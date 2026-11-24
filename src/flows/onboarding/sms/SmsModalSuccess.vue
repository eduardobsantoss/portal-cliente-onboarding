<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2 } from 'lucide-vue-next';
import TcNotice from '@/components/theme/TcNotice.vue';
</script>

<template>
  <motion.div :initial="{ opacity: 0, scale: 0.95 }" :animate="{ opacity: 1, scale: 1 }">
    <TcNotice tone="success" :icon="CheckCircle2" title="Celular confirmado com sucesso!">
      A validação foi atualizada no seu checklist cadastral.
    </TcNotice>
  </motion.div>
</template>
