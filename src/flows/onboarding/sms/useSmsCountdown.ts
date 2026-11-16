import { ref, watch } from 'vue';

export function useSmsCountdown() {
  const cooldown = ref<number>(0);

  // Timer cooldown (60 seconds)
  watch(
    cooldown,
    (value, _old, onCleanup) => {
      if (value > 0) {
        const timer = setTimeout(() => {
          cooldown.value = value - 1;
        }, 1000);
        onCleanup(() => clearTimeout(timer));
      }
    },
    { immediate: true },
  );

  const setCooldown = (value: number) => {
    cooldown.value = value;
  };

  return { cooldown, setCooldown };
}
