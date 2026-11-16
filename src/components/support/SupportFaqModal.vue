<script setup lang="ts">
import { motion } from 'motion-v';
import { X, HelpCircle, PhoneCall, BookOpen } from 'lucide-vue-next';
import type { SupportTab } from '@/types/faq';
import { useSupportFaqModal } from './useSupportFaqModal';
import FaqPanel from './FaqPanel.vue';
import CallbackRequestPanel from './CallbackRequestPanel.vue';

const props = defineProps<{
  isOpen: boolean;
  initialTab?: SupportTab;
}>();

const emit = defineEmits<{ close: [] }>();

const {
  activeTab,
  setActiveTab,
  search,
  setSearch,
  expandedId,
  setExpandedId,
  callbackRequested,
  setCallbackRequested,
  phone,
  setPhone,
  notes,
  setNotes,
  filteredFaqs,
} = useSupportFaqModal(props.initialTab);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
    <motion.div
      :initial="{ opacity: 0, scale: 0.96 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.96 }"
      class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[88vh] border border-slate-200"
    >
      <!-- Header -->
      <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gci/5 text-gci flex items-center justify-center">
            <HelpCircle :size="20" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-800">Ajuda e Suporte</h3>
            <p class="text-xs text-slate-500">Tire dúvidas sobre a documentação ou fale com um analista</p>
          </div>
        </div>
        <button
          class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          @click="emit('close')"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-slate-100 px-6 bg-slate-50/50">
        <button
          :class="`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'faq'
              ? 'border-gci text-gci'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`"
          @click="setActiveTab('faq')"
        >
          <BookOpen :size="14" />
          Perguntas Frequentes (FAQ)
        </button>
        <button
          :class="`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'ligacao'
              ? 'border-gci text-gci'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`"
          @click="setActiveTab('ligacao')"
        >
          <PhoneCall :size="14" />
          Solicitar Ligação
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <FaqPanel
          v-if="activeTab === 'faq'"
          :search="search"
          :faqs="filteredFaqs"
          :expanded-id="expandedId"
          @search-change="setSearch"
          @toggle="(id) => setExpandedId(expandedId === id ? null : id)"
        />
        <CallbackRequestPanel
          v-else
          :callback-requested="callbackRequested"
          :phone="phone"
          :notes="notes"
          @phone-change="setPhone"
          @notes-change="setNotes"
          @request="setCallbackRequested(true)"
          @reset="setCallbackRequested(false)"
        />
      </div>
    </motion.div>
  </div>
</template>
