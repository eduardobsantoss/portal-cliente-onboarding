<script setup lang="ts">
import { Instagram, Linkedin } from "lucide-vue-next";
import logoFooter from "../../assets/logos/logo-footer.png";

const columns = [
  { title: "GCI", links: ["Sobre nós", "Carreiras", "Imprensa", "Blog"] },
  {
    title: "Soluções",
    links: ["Funding Agro", "Investimentos", "Conta Digital", "Proteção Patrimonial"],
  },
  {
    title: "Ajuda",
    links: ["Central de Ajuda", "Canais de Atendimento", "Ouvidoria", "Segurança"],
  },
];

const linkClass =
  "rounded-[var(--radius-sm)] text-[color:var(--text-link)] transition-colors duration-[var(--duration-base)] hover:text-[color:var(--text-link-hover)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none";

const socialClass =
  "flex size-[var(--control-nav)] items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-soft)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--surface-brand)] hover:text-[color:var(--text-on-brand)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none";
</script>

<template>
  <footer
    class="border-t border-[color:var(--border-subtle)] bg-[var(--surface-page)] px-[var(--section-pad-x)] py-[var(--space-12)] max-md:px-[var(--space-6)]"
  >
    <div class="grid grid-cols-2 gap-[var(--space-14)] md:grid-cols-4 lg:grid-cols-5">
      <div class="col-span-2 md:col-span-1">
        <img
          :src="logoFooter"
          alt="Grupo Ceres Investimentos"
          class="mb-[var(--space-6)] h-28 w-auto object-contain"
        />
        <p
          class="m-0 max-w-xs text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
        >
          Transformando a relação do agronegócio com o dinheiro através de
          tecnologia e atendimento especializado.
        </p>
      </div>

      <div v-for="column in columns" :key="column.title">
        <h4
          class="m-0 mb-[var(--space-5)] text-[length:var(--text-sm)] font-[number:var(--weight-bold)] text-[color:var(--text-strong)]"
        >
          {{ column.title }}
        </h4>
        <ul class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0 text-[length:var(--text-sm)]">
          <li v-for="link in column.links" :key="link">
            <a href="#" :class="linkClass">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h4
          class="m-0 mb-[var(--space-5)] text-[length:var(--text-sm)] font-[number:var(--weight-bold)] text-[color:var(--text-strong)]"
        >
          Siga-nos
        </h4>
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
