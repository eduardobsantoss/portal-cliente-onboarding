<script setup lang="ts">
import { Building2 } from 'lucide-vue-next';
import {
  MOCK_ANALYSIS_PROTOCOL,
  MOCK_COMPANY_CNPJ,
  MOCK_COMPANY_NAME,
} from '@/mocks/onboardingCompany';
</script>

<template>
  <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
    <div class="flex items-center gap-3.5">
      <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shadow-sm">
        <Building2 :size="20" />
      </div>
      <div>
        <h4 class="text-xs sm:text-sm font-bold text-slate-900">
          {{ MOCK_COMPANY_NAME }}
        </h4>
        <p class="text-[11px] font-semibold text-slate-500">
          CNPJ: {{ MOCK_COMPANY_CNPJ }} • Protocolo: <span class="font-mono text-slate-700 font-bold">{{ MOCK_ANALYSIS_PROTOCOL }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
