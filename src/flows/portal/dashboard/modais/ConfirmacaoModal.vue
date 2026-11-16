<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Calendar, Clock, Upload, X, Zap } from 'lucide-vue-next';
import ModalFrame from '@/components/ui/ModalFrame.vue';
import type { ConfirmacaoData } from '@/types/titulo';
import IconInputField from './comum/IconInputField.vue';

const props = defineProps<{
  isOpen: boolean;
  selectedCount: number;
  data: ConfirmacaoData;
}>();

const emit = defineEmits<{
  dataChange: [data: ConfirmacaoData];
  close: [];
  submit: [];
}>();
</script>

<template>
  <AnimatePresence>
    <ModalFrame
      v-if="isOpen"
      key="confirmacao-modal"
      overlay-class-name="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-gci/40 backdrop-blur-md"
      panel-class-name="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col"
    >
      <div class="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange">
            <Zap :size="24" fill="currentColor" />
          </div>
          <div>
            <h3 class="text-xl font-black text-gci">Registrar Confirmação</h3>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Registrando para {{ selectedCount }} títulos</p>
          </div>
        </div>
        <button
          @click="emit('close')"
          class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="p-10 space-y-8">
        <div class="grid grid-cols-2 gap-6">
          <IconInputField
            label="Data da Confirmação"
            type="date"
            :value="data.date"
            @change="(date) => emit('dataChange', { ...props.data, date })"
          >
            <template #icon>
              <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
            </template>
          </IconInputField>
          <IconInputField
            label="Hora da Confirmação"
            type="time"
            :value="data.time"
            @change="(time) => emit('dataChange', { ...props.data, time })"
          >
            <template #icon>
              <Clock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
            </template>
          </IconInputField>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Evidência (Anexo)</label>
          <div class="border-2 border-dashed border-slate-100 rounded-[32px] p-10 flex flex-col items-center gap-4 hover:border-agro-orange/30 hover:bg-orange-50/10 transition-all cursor-pointer group">
            <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-agro-orange group-hover:text-white transition-all">
              <Upload :size="24" />
            </div>
            <div class="text-center">
              <p class="text-sm font-bold text-gci">Clique para subir a evidência</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">PDF, PNG ou JPG até 10MB</p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações</label>
          <textarea
            :value="data.observacoes"
            @input="emit('dataChange', { ...props.data, observacoes: ($event.target as HTMLTextAreaElement).value })"
            placeholder="Adicione detalhes relevantes sobre esta confirmação..."
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-gci focus:outline-none focus:border-agro-orange transition-all min-h-[100px] resize-none"
          ></textarea>
        </div>

        <button
          @click="emit('submit')"
          class="w-full bg-agro-orange text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-agro-orange/20 hover:bg-agro-orange/90 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Registrar Confirmação
          <Zap :size="18" fill="currentColor" />
        </button>
      </div>
    </ModalFrame>
  </AnimatePresence>
</template>
