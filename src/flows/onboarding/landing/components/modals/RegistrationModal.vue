<script setup lang="ts">
import { X, Shield, Clock } from "lucide-vue-next";
import WhatsAppIcon from "../ui/WhatsAppIcon.vue";
import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from "../../constants/urls";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const props = defineProps<RegistrationModalProps>();
</script>

<template>
  <Transition name="fade-modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="props.onClose"
      ></div>

      <!-- Modal Card -->
      <div
        class="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative z-10 overflow-hidden transform transition-all animate-scale-up"
      >
        <!-- Close Button -->
        <button
          @click="props.onClose"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"
          aria-label="Fechar"
        >
          <X :size="18" />
        </button>

        <div class="text-center space-y-4">
          <!-- Header -->
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">
              Abra sua Conta Ceres
            </h3>
            <p class="text-xs text-gray-500 mt-1">
              Seu atendimento personalizado começa em instantes
            </p>
          </div>

          <!-- Explanatory Text -->
          <div
            class="bg-gray-50 rounded-2xl p-4 text-left space-y-3.5 border border-gray-100"
          >
            <p class="text-xs text-gray-600 leading-relaxed">
              No
              <strong class="text-gci font-extrabold"
                >Grupo Ceres Investimentos</strong
              >, prezamos pelo atendimento de excelência e soluções sob medida
              para o seu agronegócio.
            </p>
            <p class="text-xs text-gray-600 leading-relaxed">
              Por isso, todo o nosso processo de abertura de conta, envio de
              documentos e suporte é realizado de forma direta, ágil e segura
              através de nossa mesa de operações no WhatsApp.
            </p>

            <div class="pt-2 border-t border-gray-200/60 space-y-2">
              <div
                class="flex items-center gap-2.5 text-[10px] text-gray-500 font-bold"
              >
                <Clock :size="14" class="text-[#F27D26]" />
                Tempo estimado: menos de 5 minutos
              </div>
              <div
                class="flex items-center gap-2.5 text-[10px] text-gray-500 font-bold"
              >
                <Shield :size="14" class="text-[#F27D26]" />
                Dados protegidos sob as diretrizes da LGPD
              </div>
            </div>
          </div>

          <!-- Phone display -->
          <div class="py-1">
            <span
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1"
              >Mesa de Operações</span
            >
            <span class="text-base font-extrabold text-gci">{{
              WHATSAPP_NUMBER_DISPLAY
            }}</span>
          </div>

          <!-- Action Button -->
          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-[#25D366]/20 active:scale-95"
          >
            <WhatsAppIcon :size="18" />
            Iniciar no WhatsApp
          </a>

          <p class="text-[9px] text-gray-400 leading-normal">
            Ao clicar, você será redirecionado para o WhatsApp oficial do Grupo
            GCI.
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
