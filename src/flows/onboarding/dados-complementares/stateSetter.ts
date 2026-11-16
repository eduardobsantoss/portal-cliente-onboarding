import type { Ref } from 'vue';

/** Equivalente ao `React.Dispatch<React.SetStateAction<T>>` para refs do Vue. */
export type SetState<T> = (value: T | ((prev: T) => T)) => void;

export function createSetter<T>(state: Ref<T>): SetState<T> {
  return (value) => {
    state.value =
      typeof value === 'function' ? (value as (prev: T) => T)(state.value) : value;
  };
}
