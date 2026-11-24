<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

/**
 * Menu suspenso (guidelines §7.3), posicionado sob o `anchor` com `getBoundingClientRect` (sem biblioteca).
 * Vai para o `<body>` com `.theme-client` na raiz. Esc e clique fora emitem `close`; ao abrir, o foco vai
 * para o primeiro item; setas Cima/Baixo (e Home/End) movem o foco; ao fechar, o foco volta ao `anchor`.
 * Use `TcMenuItem` para os itens e `<hr>` para separar seções.
 */
const props = withDefaults(
  defineProps<{
    open: boolean;
    /** Elemento que abre o menu (o botão), já resolvido: `triggerRef.value`. */
    anchor: HTMLElement | null;
    /** Vira o `aria-label` do menu. */
    label: string;
    placement?: 'bottom-end' | 'bottom-start';
  }>(),
  { placement: 'bottom-end' },
);

const emit = defineEmits<{
  close: [];
}>();

const GAP_PX = 8;
const ITEM_SELECTOR = '[role^="menuitem"]:not([disabled]):not([aria-disabled="true"])';

const panel = ref<HTMLElement | null>(null);
const position = ref<Record<string, string>>({});
// Quando o menu fecha por clique fora ou Tab, o foco já está onde o usuário quis: não o devolvemos ao anchor.
let skipFocusReturn = false;

const reposition = () => {
  if (!props.anchor) return;
  const rect = props.anchor.getBoundingClientRect();
  const top = `${rect.bottom + GAP_PX}px`;
  position.value =
    props.placement === 'bottom-end'
      ? { top, right: `${document.documentElement.clientWidth - rect.right}px` }
      : { top, left: `${rect.left}px` };
};

const items = () =>
  panel.value ? Array.from(panel.value.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) : [];

const moveFocus = (target: 'first' | 'last' | 'next' | 'previous') => {
  const list = items();
  if (list.length === 0) return;
  const current = list.indexOf(document.activeElement as HTMLElement);
  const index =
    target === 'first'
      ? 0
      : target === 'last'
        ? list.length - 1
        : target === 'next'
          ? (current + 1) % list.length
          : (current - 1 + list.length) % list.length;
  list[index]?.focus();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    emit('close');
  } else if (event.key === 'Tab') {
    skipFocusReturn = true;
    emit('close');
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveFocus('next');
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveFocus('previous');
  } else if (event.key === 'Home') {
    event.preventDefault();
    moveFocus('first');
  } else if (event.key === 'End') {
    event.preventDefault();
    moveFocus('last');
  }
};

const onPointerDown = (event: PointerEvent) => {
  const target = event.target as Node;
  if (panel.value?.contains(target) || props.anchor?.contains(target)) return;
  skipFocusReturn = true;
  emit('close');
};

const listen = () => {
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, true);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('pointerdown', onPointerDown);
};
const unlisten = () => {
  window.removeEventListener('resize', reposition);
  window.removeEventListener('scroll', reposition, true);
  document.removeEventListener('keydown', onKeydown);
  document.removeEventListener('pointerdown', onPointerDown);
};

watch(
  () => props.open,
  async (isOpen, wasOpen) => {
    if (isOpen) {
      skipFocusReturn = false;
      reposition();
      listen();
      await nextTick();
      moveFocus('first');
    } else if (wasOpen) {
      unlisten();
      if (!skipFocusReturn) props.anchor?.focus();
      skipFocusReturn = false;
    }
  },
  { immediate: true, flush: 'post' },
);

onBeforeUnmount(unlisten);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="panel"
      role="menu"
      :aria-label="label"
      class="theme-client fixed z-[var(--z-dropdown)] min-w-[280px] rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] p-[var(--space-2)] shadow-[var(--shadow-float)] [&_hr]:my-[var(--space-2)] [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[color:var(--border-subtle)]"
      :style="position"
    >
      <slot />
    </div>
  </Teleport>
</template>
