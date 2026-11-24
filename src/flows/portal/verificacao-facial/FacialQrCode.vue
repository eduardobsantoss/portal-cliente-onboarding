<script setup lang="ts">
import { motion } from 'motion-v';
import { Camera } from 'lucide-vue-next';

/*
 * QR code de demonstração (vetor). Cores: azul da marca (`currentColor`), branco do tema e o quadrado central
 * em `--accent` (uso decorativo permitido). A linha de varredura é azul e não anima com `prefers-reduced-motion`.
 */
</script>

<template>
  <div class="flex flex-col items-center gap-[var(--space-3)] text-center">
    <div
      class="relative rounded-[var(--radius-lg)] bg-[var(--surface-soft)] p-[var(--space-5)]"
    >
      <svg
        viewBox="0 0 160 160"
        class="size-[200px] rounded-[var(--radius-md)] bg-[var(--surface-card)] text-[color:var(--gci-base)]"
        fill="currentColor"
        role="img"
        aria-label="QR Code de demonstração para a verificação facial"
      >
        <!-- Top-Left Finder -->
        <rect x="10" y="10" width="40" height="40" rx="6" />
        <rect x="18" y="18" width="24" height="24" rx="3" class="fill-[var(--white)]" />
        <rect x="24" y="24" width="12" height="12" rx="2" />

        <!-- Top-Right Finder -->
        <rect x="110" y="10" width="40" height="40" rx="6" />
        <rect x="118" y="18" width="24" height="24" rx="3" class="fill-[var(--white)]" />
        <rect x="124" y="24" width="12" height="12" rx="2" />

        <!-- Bottom-Left Finder -->
        <rect x="10" y="110" width="40" height="40" rx="6" />
        <rect x="18" y="118" width="24" height="24" rx="3" class="fill-[var(--white)]" />
        <rect x="24" y="124" width="12" height="12" rx="2" />

        <!-- Central brand dot -->
        <rect x="68" y="68" width="24" height="24" rx="4" class="fill-[var(--accent)]" />
        <rect x="74" y="74" width="12" height="12" rx="2" class="fill-[var(--white)]" />

        <!-- Data pattern squares -->
        <rect x="60" y="15" width="8" height="8" rx="1.5" />
        <rect x="80" y="15" width="8" height="8" rx="1.5" />
        <rect x="70" y="30" width="8" height="8" rx="1.5" />
        <rect x="90" y="30" width="8" height="8" rx="1.5" />
        <rect x="60" y="45" width="8" height="8" rx="1.5" />

        <rect x="15" y="60" width="8" height="8" rx="1.5" />
        <rect x="30" y="70" width="8" height="8" rx="1.5" />
        <rect x="45" y="60" width="8" height="8" rx="1.5" />
        <rect x="15" y="90" width="8" height="8" rx="1.5" />
        <rect x="35" y="90" width="8" height="8" rx="1.5" />

        <rect x="110" y="60" width="8" height="8" rx="1.5" />
        <rect x="130" y="60" width="8" height="8" rx="1.5" />
        <rect x="140" y="75" width="8" height="8" rx="1.5" />
        <rect x="105" y="85" width="8" height="8" rx="1.5" />
        <rect x="125" y="90" width="8" height="8" rx="1.5" />
        <rect x="140" y="100" width="8" height="8" rx="1.5" />

        <rect x="60" y="105" width="8" height="8" rx="1.5" />
        <rect x="80" y="105" width="8" height="8" rx="1.5" />
        <rect x="95" y="115" width="8" height="8" rx="1.5" />
        <rect x="65" y="130" width="8" height="8" rx="1.5" />
        <rect x="85" y="135" width="8" height="8" rx="1.5" />
        <rect x="105" y="130" width="8" height="8" rx="1.5" />
        <rect x="135" y="135" width="8" height="8" rx="1.5" />
      </svg>

      <!-- Scanning line animation -->
      <div
        class="pointer-events-none absolute inset-x-[var(--space-5)] inset-y-[var(--space-5)] overflow-hidden rounded-[var(--radius-md)] motion-reduce:hidden"
        aria-hidden="true"
      >
        <motion.div
          :animate="{ y: [0, 190, 0] }"
          :transition="{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }"
          class="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--gci-base)] to-transparent"
        />
      </div>
    </div>

    <div class="flex flex-col gap-[var(--space-1)]">
      <span
        class="inline-flex items-center justify-center gap-[var(--space-2)] text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)]"
      >
        <Camera class="size-[var(--space-4)] shrink-0" aria-hidden="true" /> Escaneie com seu celular
      </span>
      <p class="m-0 text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
        Sessão segura criptografada
      </p>
    </div>
  </div>
</template>
