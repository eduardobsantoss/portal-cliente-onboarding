<script setup lang="ts">
import { ref, type Ref } from 'vue';

const props = defineProps<{
  id?: string;
  accept: string;
  /**
   * Opcional: ref (objeto `Ref`, passado via script) ou função que recebe o elemento <input>.
   * Em templates, prefira `ref="fileUpload"` no componente e chame `fileUpload.value?.click()`.
   */
  inputRef?: Ref<HTMLInputElement | null> | ((el: HTMLInputElement | null) => void) | null;
}>();

const emit = defineEmits<{ fileSelect: [file: File] }>();

const el = ref<HTMLInputElement | null>(null);

function setEl(node: unknown) {
  const input = (node as HTMLInputElement | null) ?? null;
  el.value = input;
  const target = props.inputRef;
  if (typeof target === 'function') target(input);
  else if (target && typeof target === 'object' && 'value' in target) target.value = input;
}

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) emit('fileSelect', file);
}

defineExpose({
  /** Abre o seletor de arquivos programaticamente. */
  click: () => el.value?.click(),
  input: el,
});

/**
 * Input de arquivo oculto. Pode ser acionado por um `FileUploadTrigger` (label com `for`)
 * ou programaticamente via `click()` exposto (ou `inputRef`). Não conhece regras de validação.
 */
</script>

<template>
  <input
    :ref="setEl"
    :id="id"
    type="file"
    :accept="accept"
    class="hidden"
    @change="onChange"
  />
</template>
