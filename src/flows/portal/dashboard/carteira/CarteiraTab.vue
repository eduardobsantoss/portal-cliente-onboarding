<script setup lang="ts">
import type { Titulo } from '@/types/titulo';
import CarteiraPagination from './CarteiraPagination.vue';
import CarteiraSummary from './CarteiraSummary.vue';
import CarteiraTitlesTable from './CarteiraTitlesTable.vue';
import CarteiraToolbar from './CarteiraToolbar.vue';

const props = defineProps<{
  titulosList: Titulo[];
  selectedTitulos: number[];
}>();

const emit = defineEmits<{
  selectTitulo: [id: number];
  selectAllTitulos: [ids: number[]];
  openDetails: [titulo: Titulo];
  openResolve: [];
  openFilter: [];
  openConfirmacao: [];
}>();
</script>

<template>
  <div class="space-y-6">
    <!-- Carteira Summary & Chart -->
    <CarteiraSummary />

    <!-- Carteira Table -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <CarteiraToolbar
        :selected-count="props.selectedTitulos.length"
        @open-confirmacao="emit('openConfirmacao')"
        @open-filter="emit('openFilter')"
      />
      <CarteiraTitlesTable
        :titulos-list="props.titulosList"
        :selected-titulos="props.selectedTitulos"
        @select="(id: number) => emit('selectTitulo', id)"
        @select-all="(ids: number[]) => emit('selectAllTitulos', ids)"
        @open-details="(titulo: Titulo) => emit('openDetails', titulo)"
        @open-resolve="emit('openResolve')"
      />

      <!-- Pagination Footer -->
      <CarteiraPagination :total="props.titulosList.length" />
    </div>
  </div>
</template>
