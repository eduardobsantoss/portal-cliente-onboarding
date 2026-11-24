<script setup lang="ts">
// "ao lado" no passo 1 vira "acima" quando o QR code está empilhado; o texto continua o mesmo do original.
const STEPS = [
  { strong: 'Abra a câmera do smartphone', rest: ' e aponte para o QR Code ao lado.' },
  { strong: 'Posicione seu rosto', rest: ' na moldura circular em ambiente bem iluminado.' },
  { strong: 'Faça a prova de vida', rest: ' (piscar os olhos ou sorrir) em poucos segundos.' },
];
</script>

<template>
  <div class="flex flex-col gap-[var(--space-3)]">
    <h4
      class="m-0 text-[length:var(--text-base)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)] text-[color:var(--text-strong)]"
    >
      Como funciona a verificação facial:
    </h4>

    <ol class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0">
      <li
        v-for="(step, index) in STEPS"
        :key="step.strong"
        class="flex items-start gap-[var(--space-3)] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-strong)]"
      >
        <span
          class="inline-flex size-[var(--space-7)] shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-soft)] text-[length:var(--text-xs)] font-[number:var(--weight-bold)]"
          aria-hidden="true"
        >
          {{ index + 1 }}
        </span>
        <span>
          <span class="font-[number:var(--weight-bold)]">{{ step.strong }}</span>{{ step.rest }}
        </span>
      </li>
    </ol>
  </div>
</template>
