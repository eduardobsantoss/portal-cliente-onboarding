<script setup lang="ts">
import { ChevronRight, Lock, Mail, Eye, EyeOff } from 'lucide-vue-next';

defineProps<{
  email: string;
  password: string;
  showPassword: boolean;
}>();

const emit = defineEmits<{
  emailChange: [value: string];
  passwordChange: [value: string];
  toggleShowPassword: [];
  submit: [e: Event];
}>();
</script>

<template>
  <form @submit="emit('submit', $event)" class="space-y-5">
    <div class="space-y-1.5">
      <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">E-mail Corporativo</label>
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-gci transition-colors">
          <Mail :size="18" />
        </div>
        <input
          type="text"
          placeholder="exemplo@empresa.com.br"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all placeholder:text-slate-400"
          :value="email"
          @input="emit('emailChange', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <div class="space-y-1.5">
      <div class="flex items-center justify-between ml-1">
        <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Senha</label>
        <a href="#" class="text-[11px] font-bold text-gci hover:underline transition-colors uppercase tracking-wider">Esqueci a Senha</a>
      </div>
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-gci transition-colors">
          <Lock :size="18" />
        </div>
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all placeholder:text-slate-400"
          :value="password"
          @input="emit('passwordChange', ($event.target as HTMLInputElement).value)"
        />
        <button
          type="button"
          @click="emit('toggleShowPassword')"
          class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-gci transition-colors"
        >
          <EyeOff v-if="showPassword" :size="18" />
          <Eye v-else :size="18" />
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 ml-1 py-1">
      <input
        type="checkbox"
        id="remember"
        class="w-4 h-4 rounded border-slate-300 text-gci focus:ring-gci cursor-pointer"
      />
      <label for="remember" class="text-xs font-medium text-slate-600 cursor-pointer select-none">Lembrar neste dispositivo</label>
    </div>

    <button
      type="submit"
      class="w-full bg-gci hover:bg-gci-hover text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all shadow-lg shadow-gci/10 mt-2 active:scale-[0.99]"
    >
      Acessar Portal
      <ChevronRight :size="18" class="group-hover:translate-x-0.5 transition-transform" />
    </button>
  </form>
</template>
