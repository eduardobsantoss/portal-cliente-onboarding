<script setup lang="ts">
import { computed, ref } from 'vue';
import { motion } from 'motion-v';
import { PORTFOLIO_DISTRIBUTION } from '@/mocks/dashboardChart';

/** Gráfico de pizza "Distribuição da Carteira" com legenda (donut em SVG, sem biblioteca de gráficos). */

// Parâmetros equivalentes ao <Pie> original (recharts)
const INNER_RADIUS = 60;
const OUTER_RADIUS = 80;
const PADDING_ANGLE = 5;
const CHART_HEIGHT = 180;

interface Sector {
  name: string;
  value: number;
  color: string;
  path: string;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
// Mesma convenção do recharts: ângulos crescem no sentido anti-horário a partir das 3h
const polar = (radius: number, angleDeg: number) => ({
  x: radius * Math.cos(toRad(angleDeg)),
  y: -radius * Math.sin(toRad(angleDeg)),
});

const sectorPath = (startAngle: number, endAngle: number) => {
  const outerStart = polar(OUTER_RADIUS, startAngle);
  const outerEnd = polar(OUTER_RADIUS, endAngle);
  const innerEnd = polar(INNER_RADIUS, endAngle);
  const innerStart = polar(INNER_RADIUS, startAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
};

const sectors = computed<Sector[]>(() => {
  const total = PORTFOLIO_DISTRIBUTION.reduce((sum, item) => sum + item.value, 0);
  const available = 360 - PORTFOLIO_DISTRIBUTION.length * PADDING_ANGLE;
  let accumulated = 0;
  return PORTFOLIO_DISTRIBUTION.map((item, index) => {
    const sweep = total > 0 ? (item.value / total) * available : 0;
    const start = index * PADDING_ANGLE + accumulated;
    const end = start + sweep;
    accumulated += sweep;
    return { name: item.name, value: item.value, color: item.color, path: sectorPath(start, end) };
  });
});

// Tooltip
const container = ref<HTMLElement | null>(null);
const activeIndex = ref<number | null>(null);
const tooltipPos = ref({ x: 0, y: 0 });

const onMove = (index: number, event: MouseEvent) => {
  const rect = container.value?.getBoundingClientRect();
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
    :initial="{ opacity: 0, x: 10 }"
    :animate="{ opacity: 1, x: 0 }"
    class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col"
  >
    <h4 class="text-xs font-bold text-gci uppercase tracking-wider mb-6">Distribuição da Carteira</h4>
    <div class="flex-1 flex items-center justify-center min-h-[180px]">
      <div ref="container" class="relative w-full" :style="{ height: `${CHART_HEIGHT}px` }">
        <svg width="100%" :height="CHART_HEIGHT" role="img" aria-label="Distribuição da Carteira">
          <svg x="50%" y="50%" overflow="visible">
            <path
              v-for="(sector, index) in sectors"
              :key="`cell-${index}`"
              :d="sector.path"
              :fill="sector.color"
              stroke="#fff"
              @mousemove="onMove(index, $event)"
              @mouseleave="onLeave"
            />
          </svg>
        </svg>
        <div
          v-if="activeIndex !== null"
          class="absolute pointer-events-none z-10 bg-white whitespace-nowrap"
          :style="{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            padding: '10px',
          }"
        >
          <p style="margin: 0; padding: 4px 0; color: #000">{{ sectors[activeIndex].name }} : {{ sectors[activeIndex].value }}</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-4">
      <div v-for="item in PORTFOLIO_DISTRIBUTION" :key="item.name" class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: item.color }"></div>
        <span class="text-[10px] font-bold text-slate-500 truncate">{{ item.name }}</span>
      </div>
    </div>
  </motion.div>
</template>
