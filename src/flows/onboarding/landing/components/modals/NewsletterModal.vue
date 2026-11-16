<script setup lang="ts">
import { ref, watch } from "vue";
import { X, Loader2, CheckCircle2 } from "lucide-vue-next";
import {
  NEWSLETTER_CONSENT_TEXT,
  NEWSLETTER_STORAGE_DISMISSED,
  NEWSLETTER_STORAGE_SUBSCRIBED,
} from "../../constants/newsletter";
import { submitNewsletterLead } from "../../services/newsletterLead";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const props = defineProps<NewsletterModalProps>();

const name = ref("");
const phone = ref("");
const consent = ref(false);
const honeypot = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      errorMessage.value = "";
      successMessage.value = "";
    }
  }
);

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement;
  phone.value = formatPhoneInput(target.value);
}

function dismiss() {
  localStorage.setItem(NEWSLETTER_STORAGE_DISMISSED, "1");
  props.onClose();
}

async function onSubmit() {
  errorMessage.value = "";
  successMessage.value = "";

  if (!consent.value) {
    errorMessage.value = "Marque a autorização para continuar.";
    return;
  }

  isSubmitting.value = true;
  try {
    const result = await submitNewsletterLead({
      name: name.value.trim(),
      phone: phone.value,
      consent: true,
      website: honeypot.value,
    });

    if (!result.ok) {
      errorMessage.value = result.error ?? "Erro ao enviar. Tente novamente.";
      return;
    }

    localStorage.setItem(NEWSLETTER_STORAGE_SUBSCRIBED, "1");
    localStorage.removeItem(NEWSLETTER_STORAGE_DISMISSED);

    if (result.alreadyRegistered) {
      successMessage.value =
        result.message ??
        "Este telefone já está cadastrado para receber nossas novidades.";
    } else {
      successMessage.value =
        "Cadastro recebido! Em instantes você receberá nossas novidades no WhatsApp.";
    }

    setTimeout(() => props.onClose(), 2200);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Transition name="fade-modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[120] flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="dismiss"
      />

      <div
        class="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative z-10 overflow-hidden transform transition-all animate-scale-up"
        role="dialog"
        aria-labelledby="newsletter-modal-title"
        aria-modal="true"
      >
        <button
          type="button"
          @click="dismiss"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"
          aria-label="Fechar"
        >
          <X :size="18" />
        </button>

        <div v-if="successMessage" class="text-center py-6 space-y-3">
          <CheckCircle2 :size="40" class="mx-auto text-green-500" />
          <p class="text-sm text-gray-700 leading-relaxed">{{ successMessage }}</p>
        </div>

        <form v-else class="space-y-5" @submit.prevent="onSubmit">
          <div class="text-center pr-6">
            <h3
              id="newsletter-modal-title"
              class="text-2xl font-black text-gray-900 tracking-tight"
            >
              Fique por dentro
            </h3>
            <p class="text-xs text-gray-500 mt-2 leading-relaxed">
              Receba notícias do Grupo Ceres Investimentos e atualizações de
              mercado no seu WhatsApp.
            </p>
          </div>

          <div class="space-y-3">
            <div>
              <label for="newsletter-name" class="sr-only">Nome</label>
              <input
                id="newsletter-name"
                v-model="name"
                type="text"
                autocomplete="name"
                placeholder="Seu nome"
                required
                maxlength="255"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gci focus:ring-2 focus:ring-gci/20 outline-none text-sm"
              />
            </div>
            <div>
              <label for="newsletter-phone" class="sr-only">Telefone</label>
              <input
                id="newsletter-phone"
                :value="phone"
                type="tel"
                autocomplete="tel"
                placeholder="(00) 00000-0000"
                required
                inputmode="numeric"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gci focus:ring-2 focus:ring-gci/20 outline-none text-sm"
                @input="onPhoneInput"
              />
            </div>
          </div>

          <label
            class="flex gap-2.5 items-start text-left cursor-pointer group"
          >
            <input
              v-model="consent"
              type="checkbox"
              required
              class="mt-0.5 shrink-0 rounded border-gray-300 text-gci focus:ring-gci"
            />
            <span class="text-[10px] text-gray-500 leading-relaxed group-hover:text-gray-600">
              {{ NEWSLETTER_CONSENT_TEXT }}
            </span>
          </label>

          <!-- Honeypot anti-bot -->
          <input
            v-model="honeypot"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            class="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden="true"
          />

          <p v-if="errorMessage" class="text-xs text-red-600 text-center">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting || !consent"
            class="w-full bg-gci hover:bg-gci-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:active:scale-100"
          >
            <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
            {{ isSubmitting ? "Enviando..." : "Quero receber novidades" }}
          </button>

          <button
            type="button"
            class="w-full text-[11px] text-gray-400 hover:text-gray-600 font-semibold"
            @click="dismiss"
          >
            Agora não
          </button>
        </form>
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
