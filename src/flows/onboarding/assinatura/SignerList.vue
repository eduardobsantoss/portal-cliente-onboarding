<script setup lang="ts">
import { Users } from 'lucide-vue-next';
import type { SignerRepresentative } from '@/types/signer';
import SignerCard from './SignerCard.vue';

defineProps<{
  reps: SignerRepresentative[];
  allSigned: boolean;
}>();

const emit = defineEmits<{ toggleSign: [id: string] }>();
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
        <Users :size="15" class="text-gci" />
        Signatários
      </h3>
      <span class="text-[11px] text-slate-400">
        {{ allSigned ? 'Todas as assinaturas coletadas' : 'Aguardando formalização' }}
      </span>
    </div>

    <div class="space-y-2.5">
      <SignerCard
        v-for="rep in reps"
        :key="rep.id"
        :rep="rep"
        @toggle-sign="emit('toggleSign', rep.id)"
      />
    </div>
  </div>
</template>
