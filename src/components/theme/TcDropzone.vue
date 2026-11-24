<script setup lang="ts">
import { ref, useId } from 'vue';
import { Upload } from 'lucide-vue-next';

/**
 * Área de envio de arquivos (guidelines §7.3). O `<input type="file">` nativo fica escondido dentro do
 * `<label>`: Enter/Espaço abrem o seletor e arrastar arquivos para cima também funciona.
 */
const props = defineProps<{
  accept?: string;
  multiple?: boolean;
  title: string;
  hint?: string;
}>();

const emit = defineEmits<{
  files: [files: File[]];
}>();

const inputId = useId();
const hintId = `${inputId}-hint`;
const isDragging = ref(false);
const input = ref<HTMLInputElement | null>(null);

const deliver = (list: FileList | null | undefined) => {
  const files = Array.from(list ?? []);
  if (files.length === 0) return;
  emit('files', props.multiple ? files : files.slice(0, 1));
};

const onChange = (event: Event) => {
  deliver((event.target as HTMLInputElement).files);
  // Permite escolher o mesmo arquivo de novo depois de removê-lo.
  if (input.value) input.value.value = '';
};

const onDrop = (event: DragEvent) => {
  isDragging.value = false;
  deliver(event.dataTransfer?.files);
};
</script>

<template>
  <label
    :for="inputId"
    class="flex cursor-pointer flex-col items-center gap-[var(--space-3)] rounded-[var(--radius-xl)] border-[1.5px] border-dashed p-[var(--space-10)] text-center transition-colors duration-[var(--duration-base)] focus-within:shadow-[var(--focus-ring)] motion-reduce:transition-none max-sm:p-[var(--space-6)]"
    :class="
      isDragging
        ? 'border-[color:var(--border-strong)] bg-[var(--surface-soft)]'
        : 'border-[color:var(--border-dashed)] bg-[var(--surface-card)] hover:bg-[var(--surface-soft)]'
    "
    @dragenter.prevent="isDragging = true"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <input
      :id="inputId"
      ref="input"
      type="file"
      class="sr-only"
      :accept="props.accept"
      :multiple="props.multiple"
      :aria-describedby="props.hint ? hintId : undefined"
      @change="onChange"
    />

    <span
      class="inline-flex size-[var(--space-14)] items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-soft)] text-[color:var(--text-strong)]"
      aria-hidden="true"
    >
      <Upload class="size-[var(--space-7)]" />
    </span>
    <span class="text-[length:var(--text-md)] font-[number:var(--weight-bold)] text-[color:var(--text-strong)]">
      {{ props.title }}
    </span>
    <span
      v-if="props.hint"
      :id="hintId"
      class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]"
    >
      {{ props.hint }}
    </span>
  </label>
</template>
