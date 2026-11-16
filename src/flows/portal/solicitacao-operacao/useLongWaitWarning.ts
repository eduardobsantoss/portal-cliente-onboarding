import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

export function useLongWaitWarning(timer: MaybeRefOrGetter<number>) {
  const showLongWaitWarning = ref(false);

  watch(
    () => toValue(timer),
    (value) => {
      if (value > 120) { // Simulating 20 minutes with a shorter time for demo
        showLongWaitWarning.value = true;
      }
    },
    { immediate: true },
  );

  return showLongWaitWarning;
}
