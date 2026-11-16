<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { motion } from 'motion-v';
import { DELINQUENCY_CHART_DATA } from '@/mocks/dashboardChart';

/** Gráfico "Evolução da Inadimplência" (barras em SVG, sem biblioteca de gráficos). */

// Equivalentes ao <BarChart> original (recharts)
const MARGIN = { top: 10, right: 10, left: -20, bottom: 0 };
const Y_AXIS_WIDTH = 60;
const X_AXIS_HEIGHT = 30;
const BAR_SIZE = 32;
const BAR_RADIUS = 8;
const BAR_COLOR = '#083c4a';
const TICK_COUNT = 5;
const TICK_OFFSET = 8; // tickSize (6) + tickMargin (2)
const TICK_STYLE = { fontSize: 10, fontWeight: 700, fill: '#9ca3af' };

const PERIODS = ['1M', '3M', '6M', '1Y'];

// Medidas do contêiner (equivalente ao ResponsiveContainer 100% x 100%)
const wrapper = ref<HTMLElement | null>(null);
const width = ref(0);
const height = ref(320);
let observer: ResizeObserver | null = null;

const measure = () => {
  if (!wrapper.value) return;
  width.value = wrapper.value.clientWidth;
  height.value = wrapper.value.clientHeight;
};

onMounted(() => {
  measure();
  if (wrapper.value && typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure);
    observer.observe(wrapper.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});

const plot = computed(() => {
  const left = MARGIN.left + Y_AXIS_WIDTH;
  const right = Math.max(left, width.value - MARGIN.right);
  const top = MARGIN.top;
  const bottom = Math.max(top, height.value - MARGIN.bottom - X_AXIS_HEIGHT);
  return { left, right, top, bottom, width: right - left, height: bottom - top };
});

// Valores "bonitos" para o eixo Y (domínio começa em 0)
const yTicks = computed<number[]>(() => {
  const max = Math.max(0, ...DELINQUENCY_CHART_DATA.map((d) => d.value));
  if (max === 0) return Array.from({ length: TICK_COUNT }, (_, i) => i);
  const rawStep = max / (TICK_COUNT - 1);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep) ?? rawStep;
  const count = Math.ceil(max / step);
  return Array.from({ length: count + 1 }, (_, i) => i * step);
});

const yMax = computed(() => yTicks.value[yTicks.value.length - 1] || 1);
const yFor = (value: number) => plot.value.bottom - (value / yMax.value) * plot.value.height;

const bandWidth = computed(() => plot.value.width / Math.max(1, DELINQUENCY_CHART_DATA.length));

const bars = computed(() =>
  DELINQUENCY_CHART_DATA.map((d, index) => {
    const bandX = plot.value.left + index * bandWidth.value;
    const barWidth = Math.min(BAR_SIZE, bandWidth.value);
    const x = bandX + (bandWidth.value - barWidth) / 2;
    const y = yFor(d.value);
    const barHeight = plot.value.bottom - y;
    const r = Math.min(BAR_RADIUS, barWidth / 2, barHeight);
    const path =
      barHeight > 0
        ? `M ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} L ${x + barWidth - r} ${y} A ${r} ${r} 0 0 1 ${x + barWidth} ${y + r} L ${x + barWidth} ${plot.value.bottom} L ${x} ${plot.value.bottom} Z`
        : '';
    return { name: d.name, value: d.value, bandX, centerX: bandX + bandWidth.value / 2, path };
  }),
);

const formatTick = (value: number) => `R$ ${value / 1000}k`;

// Tooltip
const activeIndex = ref<number | null>(null);
const tooltipPos = ref({ x: 0, y: 0 });

const onMove = (index: number, event: MouseEvent) => {
  const rect = wrapper.value?.getBoundingClientRect();
  if (!rect) return;
  activeIndex.value = index;
  tooltipPos.value = { x: event.clientX - rect.left + 10, y: event.clientY - rect.top + 10 };
};
const onLeave = () => {
  activeIndex.value = null;
};
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ delay: 0.3 }"
    class="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
  >
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-lg font-black text-gci">Evolução da Inadimplência</h3>
        <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Valores a pagar / Pendentes</p>
      </div>
      <div class="flex gap-2">
        <button
          v-for="period in PERIODS"
          :key="period"
          :class="`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${period === '6M' ? 'bg-gci text-white' : 'text-gray-400 hover:bg-gray-50'}`"
        >
          {{ period }}
        </button>
      </div>
    </div>
    <div ref="wrapper" class="h-[320px] w-full relative">
      <svg :width="width" :height="height" role="img" aria-label="Evolução da Inadimplência" class="block">
        <!-- Grade horizontal -->
        <line
          v-for="tick in yTicks"
          :key="`grid-${tick}`"
          :x1="plot.left"
          :x2="plot.right"
          :y1="yFor(tick)"
          :y2="yFor(tick)"
          stroke="#f3f4f6"
          stroke-dasharray="3 3"
        />

        <!-- Eixo Y -->
        <text
          v-for="tick in yTicks"
          :key="`y-${tick}`"
          :x="plot.left - TICK_OFFSET"
          :y="yFor(tick)"
          dy="0.355em"
          text-anchor="end"
          :font-size="TICK_STYLE.fontSize"
          :font-weight="TICK_STYLE.fontWeight"
          :fill="TICK_STYLE.fill"
        >{{ formatTick(tick) }}</text>

        <!-- Cursor de destaque no hover -->
        <rect
          v-if="activeIndex !== null"
          :x="bars[activeIndex].bandX"
          :y="plot.top"
          :width="bandWidth"
          :height="plot.height"
          fill="#ccc"
          fill-opacity="0.5"
          pointer-events="none"
        />

        <!-- Barras -->
        <path v-for="bar in bars" :key="`bar-${bar.name}`" :d="bar.path" :fill="BAR_COLOR" pointer-events="none" />

        <!-- Eixo X -->
        <text
          v-for="bar in bars"
          :key="`x-${bar.name}`"
          :x="bar.centerX"
          :y="plot.bottom + TICK_OFFSET + 10"
          dy="0.71em"
          text-anchor="middle"
          :font-size="TICK_STYLE.fontSize"
          :font-weight="TICK_STYLE.fontWeight"
          :fill="TICK_STYLE.fill"
        >{{ bar.name }}</text>

        <!-- Áreas de hover por categoria -->
        <rect
          v-for="(bar, index) in bars"
          :key="`hit-${bar.name}`"
          :x="bar.bandX"
          :y="plot.top"
          :width="bandWidth"
          :height="plot.height"
          fill="transparent"
          @mousemove="onMove(index, $event)"
          @mouseleave="onLeave"
        />
      </svg>
      <div
        v-if="activeIndex !== null"
        class="absolute pointer-events-none z-10 bg-white whitespace-nowrap"
        :style="{
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y}px`,
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
          padding: '12px',
        }"
      >
        <p
          style="margin: 0 0 4px; font-size: 10px; font-weight: 800; color: #9ca3af; text-transform: uppercase"
        >{{ bars[activeIndex].name }}</p>
        <p
          style="margin: 0; font-size: 12px; font-weight: 800; color: #083c4a"
        >Valor : R$ {{ bars[activeIndex].value.toLocaleString('pt-BR') }}</p>
      </div>
    </div>
  </motion.div>
</template>
