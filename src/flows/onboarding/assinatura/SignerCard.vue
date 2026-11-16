<script setup lang="ts">
import { computed } from 'vue';
import { CheckCircle2, Clock } from 'lucide-vue-next';
import type { SignerRepresentative } from '@/types/signer';
import { maskEmail } from '@/utils/maskEmail';

const props = defineProps<{
  rep: SignerRepresentative;
}>();

const emit = defineEmits<{ toggleSign: [] }>();

const isSigned = computed(() => props.rep.status === 'Assinado');
</script>

<template>
  <div
    :class="[
      'p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3',
      isSigned ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50/60 border-slate-200',
    ]"
  >
    <div class="flex items-center gap-3">
      <div
        :class="[
          'w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0',
          isSigned ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-200 text-slate-600',
        ]"
      >
        <CheckCircle2 v-if="isSigned" :size="18" />
        <Clock v-else :size="16" />
      </div>

      <div class="space-y-0.5">
        <div class="flex items-center gap-2 flex-wrap">
          <h4 class="text-xs sm:text-sm font-bold text-slate-900">
            {{ rep.name }}
          </h4>
          <span class="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
            {{ rep.role || (rep.type === 'nao_socio' ? rep.vinculo || 'Procurador' : 'Representante Legal') }}
          </span>
        </div>
        <p class="text-[11px] text-slate-500 font-mono">
          E-mail: {{ maskEmail(rep.email) }} • CPF: {{ rep.cpf }}
        </p>
        <p v-if="isSigned && rep.signedAt" class="text-[10px] text-emerald-700 font-semibold">
          Formalizado digitalmente ({{ rep.signedAt }})
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-center">
      <span
        :class="[
          'text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5',
          isSigned
            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
            : 'bg-amber-100 text-amber-800 border-amber-200',
        ]"
      >
        <template v-if="isSigned">
          <CheckCircle2 :size="13" class="text-emerald-700" />
          Assinado
        </template>
        <template v-else>
          <Clock :size="13" class="text-amber-700" />
          Pendente
        </template>
      </span>

      <button
        type="button"
        class="text-[11px] font-semibold text-slate-500 hover:text-gci underline px-2 py-1"
        @click="emit('toggleSign')"
      >
        {{ isSigned ? 'Desmarcar' : 'Assinar' }}
      </button>
    </div>
  </div>
</template>
