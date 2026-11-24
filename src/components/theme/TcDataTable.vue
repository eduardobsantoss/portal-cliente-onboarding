<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { computed, getCurrentInstance, ref, watchEffect } from 'vue';

/**
 * Tabela de dados (guidelines §7.3): sem borda externa, rolagem horizontal no wrapper e primeira coluna fixa.
 * Slots: `cell-<key>` (célula customizada, recebe `row` e `value`), `row-actions` (botões de ícone no fim
 * da linha) e `empty`. O clique na linha só dispara `rowClick` fora de checkboxes, botões e links.
 */
interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right';
  numeric?: boolean;
}

type RowId = string | number;

const props = defineProps<{
  columns: Column[];
  rows: Row[];
  rowKey: keyof Row & string;
  selectable?: boolean;
  selected?: RowId[];
  /** Descrição da tabela para leitores de tela (fica invisível). */
  caption: string;
}>();

const emit = defineEmits<{
  select: [id: RowId, checked: boolean];
  selectAll: [checked: boolean];
  rowClick: [row: Row];
}>();

defineSlots<{
  [slot: `cell-${string}`]: (props: { row: Row; value: unknown }) => unknown;
  'row-actions'?: (props: { row: Row }) => unknown;
  empty?: () => unknown;
}>();

// A linha só vira clicável (cursor, foco, Enter) se quem usa escutar `rowClick`.
const isRowClickable = !!getCurrentInstance()?.vnode.props?.onRowClick;

const selectedSet = computed(() => new Set(props.selected ?? []));
const idOf = (row: Row) => row[props.rowKey] as RowId;
const isSelected = (row: Row) => selectedSet.value.has(idOf(row));

const selectedCount = computed(() => props.rows.filter(isSelected).length);
const allSelected = computed(() => props.rows.length > 0 && selectedCount.value === props.rows.length);
const someSelected = computed(() => selectedCount.value > 0 && !allSelected.value);

const headerCheckbox = ref<HTMLInputElement | null>(null);
watchEffect(() => {
  if (headerCheckbox.value) headerCheckbox.value.indeterminate = someSelected.value;
});

const hasRowActions = computed(() => !!getCurrentInstance()?.slots['row-actions']);
const columnCount = computed(
  () => props.columns.length + (props.selectable ? 1 : 0) + (hasRowActions.value ? 1 : 0),
);

const INTERACTIVE = 'input, button, a, select, textarea, label, [data-no-row-click]';
const onRowClick = (event: Event, row: Row) => {
  if (!isRowClickable) return;
  if ((event.target as HTMLElement).closest(INTERACTIVE)) return;
  emit('rowClick', row);
};

const alignClass = (column: Column) =>
  column.align === 'right' || column.numeric ? 'text-right' : 'text-left';
const numericClass = (column: Column) => (column.numeric ? 'tabular-nums' : '');

// A primeira coluna de dados (depois do checkbox, se houver) fica fixa na rolagem horizontal.
const stickyClass = (index: number) =>
  index === 0
    ? props.selectable
      ? 'sticky left-[var(--space-14)] bg-inherit'
      : 'sticky left-0 bg-inherit'
    : '';
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse text-left">
      <caption class="sr-only">
        {{ props.caption }}
      </caption>

      <thead>
        <tr class="bg-[var(--surface-page)]">
          <th
            v-if="props.selectable"
            scope="col"
            class="sticky left-0 z-[1] h-[var(--space-12)] w-[var(--space-14)] border-b border-[color:var(--border-default)] bg-[var(--surface-page)] px-[var(--space-4)]"
          >
            <input
              ref="headerCheckbox"
              type="checkbox"
              aria-label="Selecionar todas as linhas"
              class="block size-[var(--space-5)] cursor-pointer accent-[var(--gci-base)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
              :checked="allSelected"
              @change="emit('selectAll', ($event.target as HTMLInputElement).checked)"
            />
          </th>

          <th
            v-for="(column, index) in props.columns"
            :key="column.key"
            scope="col"
            class="h-[var(--space-12)] whitespace-nowrap border-b border-[color:var(--border-default)] bg-[var(--surface-page)] px-[var(--space-4)] text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--text-muted)]"
            :class="[alignClass(column), index === 0 ? stickyClass(index) + ' z-[1]' : '']"
          >
            {{ column.label }}
          </th>

          <th
            v-if="hasRowActions"
            scope="col"
            class="h-[var(--space-12)] border-b border-[color:var(--border-default)] px-[var(--space-4)]"
          >
            <span class="sr-only">Ações</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="props.rows.length === 0">
          <td :colspan="columnCount" class="p-[var(--space-6)]">
            <slot name="empty" />
          </td>
        </tr>

        <tr
          v-for="row in props.rows"
          :key="String(idOf(row))"
          class="min-h-[var(--space-16)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--surface-soft)] motion-reduce:transition-none"
          :class="[
            isSelected(row) ? 'bg-[var(--surface-soft)]' : 'bg-[var(--surface-page)]',
            isRowClickable
              ? 'cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--border-strong)]'
              : '',
          ]"
          :tabindex="isRowClickable ? 0 : undefined"
          @click="onRowClick($event, row)"
          @keydown.enter="onRowClick($event, row)"
        >
          <td
            v-if="props.selectable"
            class="sticky left-0 z-[1] h-[var(--space-16)] w-[var(--space-14)] border-b border-[color:var(--border-subtle)] bg-inherit px-[var(--space-4)]"
          >
            <input
              type="checkbox"
              :aria-label="`Selecionar linha ${String(row[props.columns[0]?.key as keyof Row] ?? '')}`"
              class="block size-[var(--space-5)] cursor-pointer accent-[var(--gci-base)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
              :checked="isSelected(row)"
              @change="emit('select', idOf(row), ($event.target as HTMLInputElement).checked)"
            />
          </td>

          <td
            v-for="(column, index) in props.columns"
            :key="column.key"
            class="h-[var(--space-16)] border-b border-[color:var(--border-subtle)] px-[var(--space-4)] text-[length:var(--text-base)] text-[color:var(--text-strong)]"
            :class="[alignClass(column), numericClass(column), stickyClass(index), index === 0 ? 'z-[1]' : '']"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>

          <td
            v-if="hasRowActions"
            data-no-row-click
            class="h-[var(--space-16)] border-b border-[color:var(--border-subtle)] px-[var(--space-4)]"
          >
            <div class="flex items-center justify-end gap-[var(--space-1)]">
              <slot name="row-actions" :row="row" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
