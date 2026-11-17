<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{
  open: boolean;
  labelledby: string;
  variant: 'fullscreen' | 'centered';
}>();

const emit = defineEmits<{
  close: [];
}>();

const root = ref<HTMLElement | null>(null);
let opener: HTMLElement | null = null;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Elementos que o Tab realmente alcança: visíveis e, em grupos de rádio, só o marcado.
const getFocusable = (): HTMLElement[] => {
  if (!root.value) return [];
  return Array.from(root.value.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.getAttribute('aria-hidden') === 'true') return false;
    if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return false;
    if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
      const group = root.value!.querySelectorAll<HTMLInputElement>(
        `input[type="radio"][name="${el.name}"]`,
      );
      const checked = Array.from(group).find((r) => r.checked);
      return checked ? checked === el : group[0] === el;
    }
    return true;
  });
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    emit('close');
    return;
  }
  if (event.key !== 'Tab') return;

  const items = getFocusable();
  if (items.length === 0) {
    event.preventDefault();
    return;
  }
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  const inside = !!active && !!root.value?.contains(active);

  if (!inside) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

const activate = async () => {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  document.addEventListener('keydown', onKeydown);
  await nextTick();
  getFocusable()[0]?.focus();
};

const deactivate = () => {
  document.removeEventListener('keydown', onKeydown);
  // Devolve o foco a quem abriu o diálogo (se ainda estiver na página).
  if (opener && opener.isConnected) opener.focus();
  opener = null;
};

watch(
  () => props.open,
  (isOpen, wasOpen) => {
    if (isOpen && !wasOpen) activate();
    else if (!isOpen && wasOpen) deactivate();
  },
  { immediate: true, flush: 'post' },
);

onBeforeUnmount(() => {
  if (props.open) deactivate();
});
</script>

<template>
  <Transition name="tc-dialog">
    <!--
      A raiz carrega .theme-client para que os tokens existam também fora da página tematizada.
      No modo centered o overlay vem do style inline (a regra .theme-client não é "layered" e venceria uma classe utilitária).
    -->
    <div
      v-if="open"
      ref="root"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="labelledby"
      class="theme-client fixed inset-0"
      :class="
        variant === 'fullscreen'
          ? 'z-[100] overflow-y-auto p-[var(--page-gutter)]'
          : 'z-[120] flex overflow-y-auto p-[var(--page-gutter)]'
      "
      :style="variant === 'centered' ? { background: 'rgba(4, 26, 32, 0.72)' } : undefined"
      @click.self="variant === 'centered' && emit('close')"
    >
      <div
        v-if="variant === 'fullscreen'"
        class="flex min-h-full flex-col"
      >
        <slot />
      </div>
      <div
        v-else
        class="relative m-auto w-full max-w-[480px] rounded-[var(--radius-xl)] bg-[var(--surface-card)] p-[var(--space-9)] shadow-[var(--shadow-float)]"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tc-dialog-enter-active,
.tc-dialog-leave-active {
  transition: opacity 0.3s ease;
}
.tc-dialog-enter-from,
.tc-dialog-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .tc-dialog-enter-active,
  .tc-dialog-leave-active {
    transition: none;
  }
}
</style>
