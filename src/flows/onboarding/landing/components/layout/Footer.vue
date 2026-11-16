<script setup lang="ts">
import { Instagram, Linkedin } from "lucide-vue-next";
import logoFooter from "../../assets/logos/logo-footer.png";
</script>

<template>
  <footer class="bg-white pt-24 pb-12 border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
        <div class="col-span-2 md:col-span-1">
          <img
            :src="logoFooter"
            alt="Grupo Ceres Investimentos"
            class="mb-8 h-28 w-auto object-contain"
          />
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs">
            Transformando a relação do agronegócio com o dinheiro através de
            tecnologia e atendimento especializado.
          </p>
        </div>

        <div>
          <h4
            class="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest"
          >
            GCI
          </h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" class="hover:text-gci transition-colors">Sobre nós</a>
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors">Carreiras</a>
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors">Imprensa</a>
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors">Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest"
          >
            Soluções
          </h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Funding Agro</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Investimentos</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Conta Digital</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Proteção Patrimonial</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest"
          >
            Ajuda
          </h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Central de Ajuda</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors"
                >Canais de Atendimento</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors">Ouvidoria</a>
            </li>
            <li>
              <a href="#" class="hover:text-gci transition-colors">Segurança</a>
            </li>
          </ul>
        </div>

        <div>
          <h4
            class="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest"
          >
            Siga-nos
          </h4>
          <div class="flex gap-4">
            <a
              href="https://www.linkedin.com/company/grupoceresinvestimentos/"
              target="_blank"
              class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gci hover:text-white transition-all duration-300"
            >
              <Linkedin :size="20" />
            </a>
            <a
              href="https://www.instagram.com/ceresinvestimentos/"
              target="_blank"
              class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gci hover:text-white transition-all duration-300"
            >
              <Instagram :size="20" />
            </a>
          </div>
        </div>
      </div>

      <div
        class="pt-12 border-t border-gray-100 text-[11px] text-gray-400 font-medium uppercase tracking-widest text-center"
      >
        <p>© 2026 Grupo Ceres Investimentos. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>
