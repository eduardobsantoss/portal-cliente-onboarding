<script setup lang="ts">
import {
  MonitorSmartphone,
  ListChecks,
  CircleCheck,
  Gauge,
  ShieldCheck,
  Headset,
} from 'lucide-vue-next';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import BenefitCard from '../ui/BenefitCard.vue';

const benefits = [
  {
    title: 'Tudo online',
    description: 'Do cadastro à assinatura, sem sair do portal.',
    icon: MonitorSmartphone,
    tone: 'brand' as const,
  },
  {
    title: 'Etapas visíveis',
    description: 'Envio, análise, assinatura e liberação: você vê em que ponto está cada operação.',
    icon: ListChecks,
    tone: 'light' as const,
  },
  {
    title: 'Pendências resolvidas no portal',
    description: 'Canhoto e reconhecimento do sacado são tratados ali mesmo.',
    icon: CircleCheck,
    tone: 'soft' as const,
  },
  {
    title: 'Limite à vista',
    description: 'Seu limite e o quanto já foi usado, sempre na tela inicial.',
    icon: Gauge,
    tone: 'brand' as const,
  },
  {
    title: 'Dados protegidos',
    description: 'Tratados de acordo com as normas da LGPD.',
    icon: ShieldCheck,
    tone: 'light' as const,
  },
  {
    title: 'Atendimento',
    description: 'Dúvidas frequentes e pedido de ligação direto no portal.',
    icon: Headset,
    tone: 'soft' as const,
  },
];

const pad = (value: number) => String(value).padStart(2, '0');
</script>

<template>
  <!--
    Bloco azul arredondado com cards que se empilham. Com animação (o JS ativa
    `data-stack-active`), o bloco fica fixo (sticky) na área visível, com uma folga entre o header
    e o fim da tela, e os cards sobem de baixo para dentro dele, cada um um pouco abaixo do
    anterior. Quando o último chega, o bloco solta e a página segue. Sem animação (movimento
    reduzido) é só um bloco com a lista de cards. Nenhum ancestral do bloco pode ter overflow.
  -->
  <section
    id="beneficios"
    data-stack-root
    class="benefits"
    :style="{ '--cards': benefits.length }"
  >
    <div
      data-stack-stage
      class="benefits-stage grid grid-cols-[minmax(0,1fr)] gap-[var(--space-10)] rounded-[var(--radius-xl)] bg-[var(--surface-brand)] px-[var(--space-6)] py-[var(--space-12)] text-[color:var(--text-on-brand)] md:px-[var(--section-pad-x)] md:py-[var(--section-pad-y)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--space-14)]"
    >
      <div class="benefits-title">
        <TcEyebrow tone="onDark" data-reveal>POR QUE A GCI?</TcEyebrow>
        <TcDisplayHeading
          as="h2"
          size="3xl"
          tone="onDark"
          class="mt-[var(--space-6)]"
          data-reveal
        >
          Do campo ao caixa
          <template #second>com tudo à vista</template>
        </TcDisplayHeading>

        <!-- Contador e progresso da pilha (decorativos; só no desktop) -->
        <div class="benefits-counter mt-[var(--space-10)] max-w-[320px]" aria-hidden="true">
          <p
            class="m-0 flex items-baseline gap-[var(--space-2)] text-[length:var(--text-lg)] font-[number:var(--weight-bold)] tabular-nums"
          >
            <span data-stack-counter>01</span>
            <span class="text-[length:var(--text-sm)] font-[number:var(--weight-light)] text-[color:var(--text-on-brand-muted)]">
              / {{ pad(benefits.length) }}
            </span>
          </p>
          <div class="mt-[var(--space-3)] h-[2px] bg-[var(--glass-border)]">
            <div data-stack-progress class="h-full origin-left bg-[var(--surface-card)]" />
          </div>
        </div>
      </div>

      <ol data-stack class="benefits-stack m-0 flex list-none flex-col gap-[var(--space-4)] p-0">
        <li
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          data-stack-card
          class="benefits-card"
          :style="{ '--i': index }"
        >
          <BenefitCard
            data-stack-card-inner
            :number="pad(index + 1)"
            :title="benefit.title"
            :description="benefit.description"
            :icon="benefit.icon"
            :tone="benefit.tone"
            class="h-full origin-top"
          />
        </li>
      </ol>
    </div>

    <!-- Espaço de rolagem durante o qual o bloco fica fixo (só no modo animado) -->
    <div class="benefits-spacer" aria-hidden="true" />
  </section>
</template>

<style scoped>
/*
  --stage-h é a altura do bloco azul enquanto fixo. No desktop ele é compacto (pilha + o
  padding das outras seções + um respiro extra) e fica centralizado entre o fim do header e o fim da tela, com
  uma folga (--stack-gap) dos dois lados. Abaixo de lg o título entra no bloco, então ele ocupa
  a área visível inteira. Cada card tem altura fixa (--card-h) para a centralização ser exata.
*/
.benefits {
  --header-h: calc(var(--control-hero) + var(--space-6));
  --stack-gap: var(--space-6);
  --step: var(--space-4);
  --card-h: 264px;
  --stack-h: calc(var(--card-h) + (var(--cards) - 1) * var(--step));
  --region-h: calc(100svh - var(--header-h) - 2 * var(--stack-gap));
  --stage-h: var(--region-h);
  --stage-top: calc(var(--header-h) + var(--stack-gap));
  /* Rolagem gasta por card que entra. */
  --scroll-per-card: 45svh;
}

@media (min-width: 768px) {
  .benefits {
    --card-h: 240px;
  }
}

@media (min-width: 1024px) {
  .benefits {
    --stage-h: min(
      var(--region-h),
      calc(var(--stack-h) + 2 * (var(--section-pad-y) + var(--space-10)))
    );
    --stage-top: calc(var(--header-h) + var(--stack-gap) + (var(--region-h) - var(--stage-h)) / 2);
  }
}

.benefits-counter,
.benefits-spacer {
  display: none;
}

/* ---- Modo animado (a classe é aplicada pelo JS em stackCards.ts) ---- */

.benefits[data-stack-active] .benefits-spacer {
  display: block;
  height: calc((var(--cards) - 1) * var(--scroll-per-card));
}

.benefits[data-stack-active] .benefits-stage {
  position: sticky;
  top: var(--stage-top);
  min-height: var(--stage-h);
  overflow: hidden;
  grid-template-rows: auto minmax(var(--stack-h), 1fr);
}

.benefits[data-stack-active] .benefits-stack {
  position: relative;
}

.benefits[data-stack-active] .benefits-card {
  position: absolute;
  inset-inline: 0;
  height: var(--card-h);
  top: calc(50% - var(--stack-h) / 2 + var(--i) * var(--step));
}

@media (min-width: 1024px) {
  .benefits[data-stack-active] .benefits-stage {
    grid-template-rows: minmax(var(--stack-h), 1fr);
  }

  .benefits[data-stack-active] .benefits-title {
    align-self: center;
  }

  .benefits[data-stack-active] .benefits-counter {
    display: block;
  }
}
</style>
