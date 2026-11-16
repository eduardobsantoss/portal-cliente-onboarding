<script setup lang="ts">
import { computed } from 'vue';
import { FileText } from 'lucide-vue-next';
import { CARTEIRA_TABLE_COLUMNS } from '@/constants/carteiraColumns';
import type { Titulo } from '@/types/titulo';
import { comparePendingFirst } from '@/utils/titulos';
import CarteiraTitleRow from './CarteiraTitleRow.vue';

const props = defineProps<{
  titulosList: Titulo[];
  selectedTitulos: number[];
}>();

const emit = defineEmits<{
  select: [id: number];
  selectAll: [ids: number[]];
  openDetails: [titulo: Titulo];
  openResolve: [];
}>();

const COLUMN_CLASS = 'px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap';

const sortedTitulos = computed(() => [...props.titulosList].sort(comparePendingFirst));
const allSelected = computed(() => props.selectedTitulos.length === props.titulosList.length);
</script>

<template>
  <div class="overflow-x-auto custom-scrollbar">
    <table class="w-full text-left border-collapse min-w-[1200px]">
      <thead>
        <tr class="bg-slate-50/50">
          <th class="pl-6 py-4 w-10">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-slate-300 text-agro-orange focus:ring-agro-orange cursor-pointer"
              :checked="allSelected"
              @change="emit('selectAll', props.titulosList.map(t => t.id))"
            />
          </th>
          <th v-for="column in CARTEIRA_TABLE_COLUMNS" :key="column.label" :class="`${COLUMN_CLASS}${column.center ? ' text-center' : ''}`">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50">
        <template v-if="props.titulosList.length > 0">
          <CarteiraTitleRow
            v-for="row in sortedTitulos"
            :key="row.id"
            :row="row"
            :selected-titulos="props.selectedTitulos"
            @select="(id: number) => emit('select', id)"
            @open-details="(titulo: Titulo) => emit('openDetails', titulo)"
            @open-resolve="emit('openResolve')"
          />
        </template>
        <tr v-else>
          <td :colspan="13" class="py-12 text-center text-slate-400">
            <FileText :size="28" class="mx-auto mb-2 text-slate-300" />
            <p class="text-xs font-semibold text-slate-600">Nenhum título cadastrado</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Seus títulos aparecerão aqui quando forem originados.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
