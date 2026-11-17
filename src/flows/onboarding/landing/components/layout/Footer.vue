<script setup lang="ts">
import { Instagram, Linkedin } from "lucide-vue-next";
import logoFooter from "../../assets/logos/logo-footer.png";
import WhatsAppIcon from "../ui/WhatsAppIcon.vue";
import { WHATSAPP_URL } from "../../constants/urls";
import { smoothScrollTo } from "../../animations/useSmoothScroll";
import type { TermsDocumentType } from "@/types/terms";

const emit = defineEmits<{
  register: [];
  login: [];
  openLegal: [docType: TermsDocumentType];
}>();

const NAVBAR_OFFSET = 92;

const sections = [
  { label: "Soluções", sectionId: "solucoes" },
  { label: "Benefícios", sectionId: "beneficios" },
  { label: "Como funciona", sectionId: "como-funciona" },
];

const legalDocuments: { label: string; docType: TermsDocumentType }[] = [
  { label: "Termos de Uso", docType: "terms" },
  { label: "Política de Privacidade", docType: "privacy" },
];

// O href mantém o link funcional sem JavaScript; com JS, a rolagem passa pelo Lenis.
const goToSection = (event: Event, sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  event.preventDefault();
  smoothScrollTo(section, -NAVBAR_OFFSET);
};

const linkClass =
  "cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent p-0 text-left text-[color:var(--text-link)] underline decoration-transparent decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-[var(--duration-base)] hover:text-[color:var(--text-link-hover)] hover:decoration-current focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none";

const socialClass =
  "flex size-[var(--control-nav)] items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-soft)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-brand)] hover:text-[color:var(--text-on-brand)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none";

const headingClass =
  "m-0 mb-[var(--space-5)] text-[length:var(--text-sm)] font-[number:var(--weight-bold)] text-[color:var(--text-strong)]";
</script>

<template>
  <footer
    class="border-t border-[color:var(--border-subtle)] bg-[var(--surface-page)] px-[var(--section-pad-x)] py-[var(--space-12)] max-md:px-[var(--space-6)]"
  >
    <div class="grid grid-cols-2 gap-x-[var(--space-6)] gap-y-[var(--space-10)] md:grid-cols-4 md:gap-[var(--space-14)] lg:grid-cols-5">
      <div class="col-span-2 md:col-span-1">
        <img
          :src="logoFooter"
          alt="Grupo Ceres Investimentos"
          data-clip-logo
          class="mb-[var(--space-6)] h-28 w-auto object-contain"
        />
        <p
          class="m-0 max-w-xs text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
        >
          Transformando a relação do agronegócio com o dinheiro através de
          tecnologia e atendimento especializado.
        </p>
      </div>

      <nav aria-label="Portal">
        <h4 :class="headingClass">Portal</h4>
        <ul class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0 text-[length:var(--text-sm)]">
          <li v-for="item in sections" :key="item.sectionId">
            <a
              :href="`#${item.sectionId}`"
              :class="linkClass"
              @click="goToSection($event, item.sectionId)"
            >
              {{ item.label }}
            </a>
          </li>
          <li>
            <button type="button" :class="linkClass" @click="emit('register')">
              Abra sua conta
            </button>
          </li>
          <li>
            <button type="button" :class="linkClass" @click="emit('login')">
              Acesse sua conta
            </button>
          </li>
        </ul>
      </nav>

      <nav aria-label="Legal">
        <h4 :class="headingClass">Legal</h4>
        <ul class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0 text-[length:var(--text-sm)]">
          <li v-for="item in legalDocuments" :key="item.docType">
            <button type="button" :class="linkClass" @click="emit('openLegal', item.docType)">
              {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>

      <div>
        <h4 :class="headingClass">Contato</h4>
        <a
          :href="WHATSAPP_URL"
          target="_blank"
          rel="noopener noreferrer"
          :class="[linkClass, 'inline-flex items-center gap-[var(--space-2)] text-[length:var(--text-sm)]']"
        >
          <WhatsAppIcon :size="18" aria-hidden="true" />
          Fale pelo WhatsApp
        </a>
      </div>

      <div>
        <h4 :class="headingClass">Siga-nos</h4>
        <div class="flex gap-[var(--space-3)]">
          <a
            href="https://www.linkedin.com/company/grupoceresinvestimentos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn do Grupo Ceres Investimentos"
            :class="socialClass"
          >
            <Linkedin :size="20" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/ceresinvestimentos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Grupo Ceres Investimentos"
            :class="socialClass"
          >
            <Instagram :size="20" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>

    <div
      class="mt-[var(--space-12)] border-t border-[color:var(--border-subtle)] pt-[var(--space-8)] text-center text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
    >
      <p class="m-0 mb-[var(--space-3)]">
        O Grupo Ceres possui registro e autorizações regulatórias necessárias para
        operações de crédito e de mercado de capitais brasileiras.
      </p>
      <p class="m-0">© 2026 Grupo Ceres Investimentos. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>
