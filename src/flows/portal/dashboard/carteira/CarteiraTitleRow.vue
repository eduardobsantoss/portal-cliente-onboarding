<script setup lang="ts">
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next';
import type { Titulo } from '@/types/titulo';

/** Linha da tabela da carteira (seleção, situação do título e dados). */
const props = defineProps<{
  row: Titulo;
  selectedTitulos: number[];
}>();

const emit = defineEmits<{
  select: [id: number];
  openDetails: [titulo: Titulo];
  openResolve: [];
}>();
</script>

<template>
  <tr
    :class="`hover:bg-slate-50/50 transition-colors group cursor-pointer ${props.selectedTitulos.includes(props.row.id) ? 'bg-orange-50/30' : ''}`"
  >
    <td class="pl-6 py-4" @click.stop>
      <input
        type="checkbox"
        class="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
        :checked="props.selectedTitulos.includes(props.row.id)"
        @change="emit('select', props.row.id)"
      />
    </td>
    <td class="px-6 py-4 text-center">
      <div v-if="props.row.actionStatus === 'Pendência'" class="flex flex-col items-center gap-1.5">
        <span class="flex items-center justify-center gap-1.5 bg-orange-100 text-agro-orange px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm shadow-agro-orange/10 whitespace-nowrap">
          <AlertCircle :size="10" />
          PENDENTE DE CONFIRMAÇÃO
        </span>
        <button
          class="text-[9px] font-black text-gci uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-agro-orange hover:text-agro-orange transition-all active:scale-95 shadow-sm"
          @click.stop="emit('openResolve')"
        >
          RESOLVA AQUI
        </button>
      </div>
      <div v-else-if="props.row.actionStatus === 'Pendente de Análise' || props.row.actionStatus === 'Confirmado'" class="flex items-center justify-center">
        <span :class="`flex items-center gap-1.5 ${props.row.actionStatus === 'Confirmado' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'} px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm ${props.row.actionStatus === 'Confirmado' ? 'shadow-green-600/20' : 'shadow-green-600/10'}`">
          <CheckCircle2 :size="10" />
          {{ props.row.actionStatus }}
        </span>
      </div>
      <span v-else class="text-[10px] text-slate-300 font-bold uppercase tracking-widest">-</span>
    </td>
    <td class="px-6 py-4 min-w-[180px]" @click="emit('openDetails', props.row)">
      <p class="font-bold text-xs text-gci">{{ props.row.titulo }}</p>
      <p class="text-[10px] text-slate-400 font-medium">Grupo AgroTech</p>
    </td>
    <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.lastro }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.numero }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.cessao }}</td>
    <td class="px-6 py-4 text-center" @click="emit('openDetails', props.row)">
      <span :class="`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border whitespace-nowrap block w-fit mx-auto ${props.row.statusColor}`">
        {{ props.row.status }}
      </span>
    </td>
    <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.criacao }}</td>
    <td class="px-6 py-4 font-bold text-xs text-gci whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.valorNominal }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.valorAquisicao }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.valorPresente }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.vencimento }}</td>
    <td class="px-6 py-4 text-xs text-slate-500 font-bold whitespace-nowrap" @click="emit('openDetails', props.row)">{{ props.row.sacado }}</td>
  </tr>
</template>
