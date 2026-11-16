import { onBeforeUnmount, onMounted } from 'vue';

/** Trava o scroll do body enquanto o componente que chama este composable estiver montado. */
export function useBodyScrollLock() {
  let previousOverflow = '';

  onMounted(() => {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = previousOverflow;
  });
}
